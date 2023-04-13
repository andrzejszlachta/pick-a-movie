export default {
  state: {
    userWatchList: [],
  },
  actions: {
    async addToWatchList(context, payload) {
      if (!context.getters.isAuthenticated) {
        console.log('user not logged in, redirect');
        context.dispatch('displayMessage', {
          value: "You're not logged in!",
          type: 'error'
        })
        payload.router.push('/login')
        return
      }
      if (context.getters.isOnWatchList(payload.data.id)) {
        console.log('already on watch List');
        context.dispatch('displayMessage', {
          value: 'Already on your Watch List!',
          type: 'error'
        })
        return
      }
      context.state.userWatchList.push(payload.data)
      await context.dispatch('saveWatchList', context.state.userWatchList)
    },
    async removeFromWatchList(context, payload) {
      console.log('33', context.state.userWatchList)
      const index = context.state.userWatchList.indexOf(context.state.userWatchList.find(obj => obj.id === payload.id))
      context.state.userWatchList.splice(index, 1)
      context.dispatch('saveWatchList', context.state.userWatchList)
      context.dispatch('displayMessage', {
        value: `${payload.title} has been removed from your watch list!`,
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
      state.userWatchList = payload.watchList
    },
  },
  getters: {
    isOnWatchList: (state) => (id) => {
      return !!state.userWatchList.find(obj => obj.id === id)
    },
    watchList: (state) => {
      return state.userWatchList
    }
  },
}