export default {
  state: {},
  actions: {
    async saveWatchList(context) {
      const userId = context.getters.userId
      const watchList = {
        watchList: [...context.getters.watchList],
        watchedList: [...context.getters.watchedList],
      }
      const response = await fetch(`https://pick-a-movie-as-default-rtdb.europe-west1.firebasedatabase.app/watchLists/${userId}.json`, {
        method: 'PUT',
        body: JSON.stringify(watchList)
      })
      const responseData = await response.json()
      if (!response.ok) {
        const error = new Error(responseData.message || 'Failed to send');
        throw error;
      }
      localStorage.setItem('watchList', JSON.stringify(context.getters.watchList));
      localStorage.setItem('watchedList', JSON.stringify(context.getters.watchedList));
    },
    async loadData(context) {
      await context.dispatch('loadWatchList')
    },
    async loadWatchList(context) {
      const userId = context.getters.userId
      const token = context.getters.token

      const response = await fetch(`https://pick-a-movie-as-default-rtdb.europe-west1.firebasedatabase.app/watchLists/${userId}.json?auth=${token}`)
      const responseData = await response.json()

      if (!response.ok) {
        const error = new Error(responseData.message || 'Failed to send request');
        throw error;
      }
      if (!responseData) return
      await context.commit('setWatchList', responseData)
      localStorage.setItem('watchList', JSON.stringify(responseData.watchList ? responseData.watchList : []));
      localStorage.setItem('watchedList', JSON.stringify(responseData.watchedList ? responseData.watchedList : []));
    },
    async tryLoadData(context) {
      const watchList = JSON.parse(localStorage.getItem('watchList'));
      const watchedList = JSON.parse(localStorage.getItem('watchedList'));
      if (watchList || watchedList) context.commit('setWatchList', {
        watchList: watchList,
        watchedList: watchedList,
      })
      const genres = JSON.parse(localStorage.getItem('genres'));
      if (genres) context.rootState.genres = genres
    },
  },
  mutations: {
    removeData() {
      localStorage.removeItem('watchList')
      localStorage.removeItem('watchedList')
    },
  },
  getters: {},
}
