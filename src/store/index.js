import { createStore } from 'vuex'

export default createStore({
  state: {
    popularList: {},
    topList: {},
    genres: {},
    recipesDetails: [],
  },
  getters: {
  },
  mutations: {
  },
  actions: {
    async getDetails(context, payload) {
      const API = 'dcafa276c4fbb7347b91d1e1c1c50ae3'
      const fullURL = `https://api.themoviedb.org/3/movie/${payload}?api_key=${API}&language=en-US`

      //dont call api request if already data stored locally
      if (context.state.recipesDetails.find(obj => obj.id === payload) !== undefined) {
        // do nothing
      } else {

        let response = await fetch(fullURL);
        const responseData = await response.json();
        if (!response.ok) {
          const error = new Error(responseData.message || 'Failed to fetch data!');
          throw error
        }
        context.state.recipesDetails.push(responseData)
      }
    },
    async getGenresList(context) {
      const API = 'dcafa276c4fbb7347b91d1e1c1c50ae3'
      const fullURL = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API}&language=en-US`

      //dont call api request if already data stored locally
      if (context.state.genres.length !== undefined) return

      let response = await fetch(fullURL);
      const responseData = await response.json();
      if (!response.ok) {
        const error = new Error(responseData.message || 'Failed to fetch data!');
        throw error
      }
      context.state.genres = responseData.genres
    },
    async getMoviesList(context, payload) {
      context.dispatch('getGenresList')
      const API = 'dcafa276c4fbb7347b91d1e1c1c50ae3';
      const fullURL = payload.part1 + API + payload.part2 + payload.page

      //dont call api request if already data stored locally
      if (context.state[payload.savePath].page) return

      let response = await fetch(fullURL);
      const responseData = await response.json();
      if (!response.ok) {
        const error = new Error(responseData.message || 'Failed to fetch data!');
        throw error
      }
      context.state[payload.savePath] = responseData
    },
  },
  modules: {
  }
})
