export default {
  state: {
    userWatchList: [],
    userWatchedList: [],
  },
  actions: {
    async addToWatchList(context, payload) {
      context.dispatch('checkAuthentication')
      if (!context.getters.isAuthenticated) return
      if (context.getters.isOnWatchList(payload.data.id)) {
        context.dispatch('displayMessage', {
          value: 'Already on your Watch List!',
          type: 'error'
        })
        return
      }
      if (context.getters.isOnWatchedList(payload.data.id)) {
        context.dispatch('displayMessage', {
          value: 'You have already watched this movie!',
          type: 'error'
        })
        return
      }
      context.state.userWatchList.push(payload.data)
      await context.dispatch('saveWatchList')
      context.dispatch('displayMessage', {
        value: `"${payload.data.title}" has been added to your watch list!`,
        type: 'success'
      })
    },
    async removeFromWatchList(context, payload) {
      context.dispatch('checkAuthentication')
      if (!context.getters.isAuthenticated) return
      const index = context.state.userWatchList.indexOf(context.state.userWatchList.find(obj => obj.id === payload.id))
      context.state.userWatchList.splice(index, 1)
      context.dispatch('saveWatchList')
      context.dispatch('displayMessage', {
        value: `"${payload.title}" has been removed from your watch list!`,
        type: 'success'
      })
    },
    async removeFromWatchedList(context, payload) {
      context.dispatch('checkAuthentication')
      if (!context.getters.isAuthenticated) return
      const index = context.state.userWatchedList.indexOf(context.state.userWatchedList.find(obj => obj.id === payload.id))
      context.state.userWatchedList.splice(index, 1)
      context.dispatch('saveWatchList')
      context.dispatch('displayMessage', {
        value: `"${payload.title}" has been removed from your watched list!`,
        type: 'success'
      })
    },
    async moveToWatched(context, payload) {
      context.dispatch('checkAuthentication')
      if (!context.getters.isAuthenticated) return
      const index = context.state.userWatchList.indexOf(context.state.userWatchList.find(obj => obj.id === payload.id))
      const movie = context.state.userWatchList.find(obj => obj.id === +payload.id)
      context.state.userWatchList.splice(index, 1)
      context.state.userWatchedList.push(movie)
      context.dispatch('saveWatchList')
      context.dispatch('displayMessage', {
        value: `"${payload.title}" marked as watched!`,
        type: 'success'
      })
    },
    async moveBackToWatchList(context, payload) {
      context.dispatch('checkAuthentication')
      if (!context.getters.isAuthenticated) return
      const index = context.state.userWatchedList.indexOf(context.state.userWatchedList.find(obj => obj.id === payload.id))
      const movie = context.state.userWatchedList.find(obj => obj.id === payload.id)
      context.state.userWatchedList.splice(index, 1)
      context.state.userWatchList.push(movie)
      context.dispatch('saveWatchList')
      context.dispatch('displayMessage', {
        value: `"${payload.title}" moved back to watch list!`,
        type: 'success'
      })
    },
    async displayMessage(context, payload) {
      context.rootState.messages.unshift({
        id: Date.now(),
        value: payload.value,
        type: payload.type,
      })
      setTimeout(() => {
        context.rootState.messages.pop()
      }, 3000);
    }
  },
  mutations: {
    setWatchList(state, payload) {
      if (payload.watchList) state.userWatchList = payload.watchList
      if (payload.watchedList) state.userWatchedList = payload.watchedList
    },
  },
  getters: {
    isOnWatchList: (state) => (id) => {
      return !!state.userWatchList.find(obj => obj.id === id)
    },
    isOnWatchedList: (state) => (id) => {
      return !!state.userWatchedList.find(obj => obj.id === id)
    },
    watchList: (state) => {
      return state.userWatchList
    },
    watchedList: (state) => {
      return state.userWatchedList
    },
  },
}