export default {
  state: {},
  actions: {
    async saveWatchList(context, payload) {
      const userId = context.getters.userId
      const watchList = {
        watchList: [...payload]
      }
      const response = await fetch(`https://pick-a-movie-as-default-rtdb.europe-west1.firebasedatabase.app/watchLists/${userId}.json`, {
        method: 'PUT',
        body: JSON.stringify(watchList)
      })
      const responseData = await response.json()
      if (!response.ok) {
        const error = new Error(responseData.message || 'Failed to send');
        context.dispatch('displayMessage', {
          value: 'Failed to add to watch list',
          type: 'error'
        })
        throw error;
      }
      context.dispatch('displayMessage', {
        value: 'Added to your watch list!',
        type: 'success'
      })
      localStorage.setItem('watchList', JSON.stringify(payload));
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
      await context.commit('setWatchList', responseData)
      localStorage.setItem('watchList', JSON.stringify(responseData.watchList));
    },
    async tryLoadData(context) {
      const watchList = JSON.parse(localStorage.getItem('watchList'));
      if (watchList) context.commit('setWatchList', {watchList: watchList})
      const genres = JSON.parse(localStorage.getItem('genres'));
      if (genres) context.rootState.genres = genres
    },
  },
  mutations: {
    removeData() {
      localStorage.removeItem('watchList')
    },
  },
  getters: {},
}
