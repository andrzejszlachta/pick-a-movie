import { createStore } from 'vuex'

import authModule from './modules/auth.js'
import watchListModule from './modules/watchList.js'
import storageModule from './modules/storage.js'

export default createStore({
  modules: {
    auth: authModule,
    watchList: watchListModule,
    store: storageModule
  },
  state: {
    API: 'dcafa276c4fbb7347b91d1e1c1c50ae3',
    popularList: [],
    topList: [],
    genres: [],
    details: [],
    searchResults: [],
    userId: null,
    token: null,
    didAutoLogout: false,
    messages: [],
    isLoading: false,
  },
  getters: {
    getTopList(state) {
      return state.topList
    },
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
        const error = new Error(responseData.message || 'Failed to fetch data!');
        throw error
      }
      context.state[payload.savePath].push(responseData)
    },
    async getDetails(context, payload) {
      await context.dispatch('getGenresList')

      const fullURL = `https://api.themoviedb.org/3/movie/${payload}?api_key=${context.state.API}&language=en-US`

      //dont call api request if already data stored locally
      if (context.state.details.find(obj => obj.id === payload) !== undefined) return
       
      await context.dispatch('sendApiRequest', {url: fullURL, savePath: 'details'})
    },
    async getGenresList(context) {
      const fullURL = `https://api.themoviedb.org/3/genre/movie/list?api_key=${context.state.API}&language=en-US`
      
      //dont call api request if already data stored locally
      if (context.state.genres.length > 0) return
      await context.dispatch('sendApiRequest', {url: fullURL, savePath: 'genres'})
      localStorage.setItem('genres', JSON.stringify(context.state.genres));
    },
    async getMoviesList(context, payload) {
      await context.dispatch('getGenresList')

      const fullURL = payload.part1 + context.state.API + payload.part2 + payload.page

      //dont call api request if already data stored locally
      if (context.state[payload.savePath].find(obj => obj.page === payload.page) !== undefined) return

      context.dispatch('sendApiRequest', {url: fullURL, savePath: payload.savePath})
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
