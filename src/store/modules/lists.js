export default {
  state: {
    popularList: [],
    topList: [],
    trendingList: [],
    upcomingList: [],
  },
  actions: {
    async sendRequest(context, payload) {
      let response = await fetch(payload.url);
      const responseData = await response.json();
      if (!response.ok) {
        context.dispatch('displayMessage', {
          value: responseData.status_message || 'Failed to fetch data!',
          type: 'error'
        })
      }
      context.state[payload.savePath].push(responseData)
    },
    async getMoviesList(context, payload) {
      await context.dispatch('getGenresList')
      const fullURL = payload.part1 + context.rootState.API + payload.part2 + payload.page
      
      //dont call api request if already data stored locally
      if (context.state[payload.savePath].find(obj => obj.page === payload.page) !== undefined) return
      context.dispatch('sendRequest', {url: fullURL, savePath: payload.savePath})
    },
  },
  mutations: {},
  getters: {
    getPopularList(state) {
      return state.popularList
    },
    getTopList(state) {
      return state.topList
    },
    getTrendingList(state) {
      return state.trendingList
    },
    getUpcomingList(state) {
      return state.upcomingList
    },
  },
}
