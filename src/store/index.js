import { createStore } from 'vuex'

export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
    async getTrendingMoviesList(context, payload) {
      const API = 'dcafa276c4fbb7347b91d1e1c1c50ae3';
      const URL = 'https://api.themoviedb.org/3/'
      // const type1 = 'genre/movie/list'; //movie genre list
      // const type2 = 'trending/all/day'; //trending
      const type3 = '/movie/upcoming'; //upcoming
      const fullURL = URL + type3 + '?api_key=' + API
      let response = await fetch(fullURL);
      const responseData = await response.json();
      if (!response.ok) {
        const error = new Error(responseData.message || 'Failed to fetch data!');
        throw error
      }
      console.log(responseData)
      console.log(context, payload);
    },
  },
  modules: {
  }
})
