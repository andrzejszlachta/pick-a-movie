import router from '../../router'

let timer

export default {

  state: {
    userId: null,
    token: null,
    email: null,
    didAutoLogout: false,
    error: null,
  },
  actions: {
    async login(context, payload) {
      await context.dispatch('auth', {
        ...payload,
        mode: 'login'
      })
    },
    async register(context, payload) {
      await context.dispatch('auth', {
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
          const error = new Error(responseData.status_message || 'Failed to authenticate. Check your login data.');
          context.state.error = error
          context.dispatch('displayMessage', {
            value: responseData.status_message || 'Failed to authenticate. Check your login data.',
            type: 'error'
          })
          throw error
      }
      context.state.error = null

      const expiresIn = +responseData.expiresIn * 1000;
      const expirationDate = new Date().getTime() + expiresIn;

      localStorage.setItem('token', responseData.idToken);
      localStorage.setItem('userId', responseData.localId);
      localStorage.setItem('email', responseData.email);
      localStorage.setItem('tokenExpiration', expirationDate);

      timer = setTimeout(function() {
          context.dispatch('autoLogout')
      }, expiresIn)

      context.commit('setUser', {
          token: responseData.idToken,
          userId: responseData.localId,
          email: responseData.email,
      });
      context.dispatch('loadData')
    },
    tryLogin(context) {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');
      const tokenExpiration = localStorage.getItem('tokenExpiration');
      const email = localStorage.getItem('email');
      context.dispatch('tryLoadData')

      const expiresIn = +tokenExpiration - new Date().getTime();
      if (expiresIn < 0) return;

      timer = setTimeout(function() {
          context.dispatch('autoLogout')
      }, expiresIn)

      if (token && userId) {
          context.commit('setUser', {
              token: token,
              userId: userId,
              email: email,
          })
      }
    },
    logout(context) {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('tokenExpiration');
        localStorage.removeItem('email')
        context.commit('removeData')

        clearTimeout(timer)

        context.commit('setUser', {
            token: null,
            userId: null,
            email: null,
        })
    },
    autoLogout(context) {
        context.dispatch('logout');
        context.commit('setAutoLogout');
    },
    checkAuthentication(context) {
      if (!context.getters.isAuthenticated) {
        context.dispatch('displayMessage', {
          value: "You're not logged in!",
          type: 'error'
        })
        router.push('/login')
        return
      }
    },
  },
  mutations: {
    setUser(state, payload) {
      state.token = payload.token;
      state.userId = payload.userId;
      state.email = payload.email
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
    email(state) {
      return state.email
    },
    isAuthenticated(state) {
      return !!state.token
    },
    didAutoLogout(state) {
      return state.didAutoLogout;
    },
  },
}