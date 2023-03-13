import { createStore } from 'vuex'

export default createStore({
  state: {
    API: 'dcafa276c4fbb7347b91d1e1c1c50ae3',
    popularList: [],
    topList: [],
    genres: [],
    recipesDetails: [],
    searchResults: [],
  },
  getters: {
  },
  mutations: {
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
      const fullURL = `https://api.themoviedb.org/3/movie/${payload}?api_key=${context.state.API}&language=en-US`

      //dont call api request if already data stored locally
      if (context.state.recipesDetails.find(obj => obj.id === payload) !== undefined) return
       
      await context.dispatch('sendApiRequest', {url: fullURL, savePath: 'recipesDetails'})
    },
    async getGenresList(context) {
      const fullURL = `https://api.themoviedb.org/3/genre/movie/list?api_key=${context.state.API}&language=en-US`
      
      //dont call api request if already data stored locally
      if (context.state.genres.length > 0) return
      await context.dispatch('sendApiRequest', {url: fullURL, savePath: 'genres'})
    },
    async getMoviesList(context, payload) {
      await context.dispatch('getGenresList')

      const fullURL = payload.part1 + context.state.API + payload.part2 + payload.page

      //dont call api request if already data stored locally
      if (context.state[payload.savePath].find(obj => obj.page === payload.page) !== undefined) return

      context.dispatch('sendApiRequest', {url: fullURL, savePath: payload.savePath})
    },
  },
  modules: {
  }
})
