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
      console.log('added to watch list');
      context.dispatch('displayMessage', {
        value: 'Added to your watch list!',
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
  mutations: {},
  getters: {
    isOnWatchList: (state) => (id) => {
      return !!state.userWatchList.find(obj => obj.id === id)
    }
  },
}