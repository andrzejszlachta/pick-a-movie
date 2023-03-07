import { createStore } from 'vuex'

export default createStore({
  state: {
    popularList: {},
    topList: {},
  },
  getters: {
  },
  mutations: {
  },
  actions: {
    async getTrendingMoviesList(context, payload) {
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
      console.log('hh', context.state[payload.savePath])
      // console.log(context, payload);
      // console.log(payload.part1, payload.part2);
    },
  },
  modules: {
  }
})
