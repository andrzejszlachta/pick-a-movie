import { createStore } from 'vuex'

import authModule from './modules/auth.js'
import watchListModule from './modules/watchList.js'
import storageModule from './modules/storage.js'
import listsModule from './modules/lists.js'

export default createStore({
  modules: {
    auth: authModule,
    watchList: watchListModule,
    store: storageModule,
    lists: listsModule,
  },
  state: {
    API: 'dcafa276c4fbb7347b91d1e1c1c50ae3',
    genres: [],
    details: [],
    searchResults: [],
    userId: null,
    token: null,
    didAutoLogout: false,
    messages: [],
    isLoading: false,
    viewDetailsLoaded: false,
  },
  getters: {
    getDetails: (state) => (id) => {
      return state.details.find(obj => obj.id === +id)
    },
    getBadgeName: (state) => (badge) => {
      return state.genres[0].genres.find(obj => obj.id === badge).name
    },
    getResults: (state) => {
      return state.searchResults
    },
    getGenres: (state) => {
      return state.genres
    },
    isLoading: (state) => {
      return state.isLoading
    },
  },
  mutations: {
    clearSearchResults(state) {
      state.searchResults = []
    },
    startLoading(state) {
      state.isLoading = true
    },
    stopLoading(state) {
      state.isLoading = false
    },
  },
  actions: {
    async sendApiRequest(context, payload) {
      let response = await fetch(payload.url);
      const responseData = await response.json();
      if (!response.ok) {
        context.dispatch('displayMessage', {
          value: responseData.status_message || 'Failed to fetch data!',
          type: 'error'
        })
      }
      if (payload.savePath === 'details' && responseData.success === false) return
      context.state[payload.savePath].push(responseData)
    },
    async getDetails(context, payload) {
      await context.dispatch('getGenresList')
      context.state.viewDetailsLoaded = false
      const fullURL = `https://api.themoviedb.org/3/movie/${payload}?api_key=${context.state.API}&language=en-US`

      //dont call api request if already data stored locally
      if (context.state.details.find(obj => obj.id === payload) !== undefined) return
       
      await context.dispatch('sendApiRequest', {url: fullURL, savePath: 'details'})
      context.state.viewDetailsLoaded = true
    },
    async getGenresList(context) {
      const fullURL = `https://api.themoviedb.org/3/genre/movie/list?api_key=${context.state.API}&language=en-US`
      
      //dont call api request if already data stored locally
      if (context.state.genres.length > 0) return
      await context.dispatch('sendApiRequest', {url: fullURL, savePath: 'genres'})
      localStorage.setItem('genres', JSON.stringify(context.state.genres));
    },
    async getSearchResults(context, payload) {
      await context.dispatch('getGenresList')

      const fullURL = payload.part1 + context.state.API + payload.part2

      //dont call api request if already data stored locally
      if (context.state[payload.savePath].find(obj => obj.page === payload.page + 1) !== undefined) return

      await context.dispatch('sendApiRequest', {url: fullURL, savePath: payload.savePath})
    },
  },
})
