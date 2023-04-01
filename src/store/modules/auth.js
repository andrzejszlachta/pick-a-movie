let timer

export default {
  state: {
    userId: null,
    token: null,
    didAutoLogout: false,
    error: null,
  },
  actions: {
    async login(context, payload) {
      context.dispatch('auth', {
        ...payload,
        mode: 'login'
      })
    },
    async register(context, payload) {
      context.dispatch('auth', {
        ...payload,
        mode: 'register'
      })
    },
    async auth(context, payload) {
      const mode = payload.mode
      let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDm54j5hIZtp6NoS115xt97B3jwsTATxQo';
      if (mode === 'register') {
        url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDm54j5hIZtp6NoS115xt97B3jwsTATxQo';
      }

      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
            email: payload.email,
            password: payload.password,
            returnSecureToken: true,
        })
      });

      const responseData = await response.json()

      if (!response.ok) {
          const error = new Error(responseData.message || 'Failed to authenticate. Check your login data.');
          context.state.error = error
          throw error
      }
      context.state.error = null

      const expiresIn = +responseData.expiresIn * 1000;
      const expirationDate = new Date().getTime() + expiresIn;

      localStorage.setItem('token', responseData.idToken);
      localStorage.setItem('userId', responseData.localId);
      localStorage.setItem('tokenExpiration', expirationDate);

      timer = setTimeout(function() {
          context.dispatch('autoLogout')
      }, expiresIn)

      context.commit('setUser', {
          token: responseData.idToken,
          userId: responseData.localId,
      });
    },
    tryLogin(context) {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');
      const tokenExpiration = localStorage.getItem('tokenExpiration');

      const expiresIn = +tokenExpiration - new Date().getTime();
      if (expiresIn < 0) return;

      timer = setTimeout(function() {
          context.dispatch('autoLogout')
      }, expiresIn)

      if (token && userId) {
          context.commit('setUser', {
              token: token,
              userId: userId,
          })
      }
    },
    logout(context) {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('tokenExpiration');

        clearTimeout(timer)

        context.commit('setUser', {
            token: null,
            userId: null,
        })
    },
    autoLogout(context) {
        context.dispatch('logout');
        context.commit('setAutoLogout');
    },
  },
  mutations: {
    setUser(state, payload) {
      state.token = payload.token;
      state.userId = payload.userId;
      state.didAutoLogout = false;
    },
    setAutoLogout(state) {
        state.didAutoLogout = true;
    },
  },
  getters: {
    userId(state) {
      return state.userId
    },
    token(state) {
      return state.token;
    },
    isAuthenticated(state) {
      return !!state.token
    },
    didAutoLogout(state) {
      return state.didAutoLogout;
    },
  },
}