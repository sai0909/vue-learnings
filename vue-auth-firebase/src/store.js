import Vue from 'vue'
import Vuex from 'vuex'
import axios from './axios-auth'
import globalAxios from 'axios'
import router from './router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: null,
    userId: null,
    user: null,
    userEmail: null
  },
  getters: {
    user(state) {
      return state.user
    },
    isAuthenticated(state) {
      return state.token !== null;
    }
  },
  mutations: {
    authUser(state, userData) {
      state.token = userData.token,
        state.userId = userData.userId,
        state.userEmail = userData.email
    },
    storeUser(state, user) {
      state.user = user
    },
    clearAuthData(state) {
      state.token = null,
        state.userId = null
    }
  },
  actions: {
    signup({ commit, dispatch }, authData) {
      axios.post('accounts:signUp?key=AIzaSyDw1OTCWBgHTo_UJgkW7BiTGkRmf_QX3a4', {
        email: authData.email,
        password: authData.password,
        returnSecureToken: true
      })
        .then(res => {
          console.log(res)
          commit('authUser', {
            token: res.data.idToken,
            userId: res.data.localId,
            email: res.data.email

          },

            console.log('signup commit action triggered'))
        
          localStorage.setItem('token', res.data.idToken)
          localStorage.setItem('userId', res.data.localId)
        
          dispatch('storeUser', authData)
          router.push('/')
        })
        .catch(error => console.log(error))

    },
    login({ commit }, authData) {
      axios.post('accounts:signInWithPassword?key=AIzaSyDw1OTCWBgHTo_UJgkW7BiTGkRmf_QX3a4', {
        email: authData.email,
        password: authData.password,
        returnSecureToken: true
      })
        .then(res => {
          console.log(res)
          commit('authUser', {
            token: res.data.idToken,
            userId: res.data.localId,
            email: res.data.email
          })


          localStorage.setItem('token', res.data.idToken)
          localStorage.setItem('userId', res.data.localId)

          router.push('/')
        })
        .catch(error => console.log(error))
    },
    logout({ commit }) {
      commit('clearAuthData');
      localStorage.removeItem('token')
      localStorage.removeItem('userId')
      router.replace('/login')
    },
    refreshLogin({ commit }) {
      const token = localStorage.getItem('token')
      const userId = localStorage.getItem('userId')
      if (!token) {
        console.log('token null')
        return
      }
      commit('authUser', {
        token: token,
        userId: userId
      })
    },
    storeUser({ state }, userData) {

      globalAxios.post('/users.json' + '?auth=' + state.token, userData)
        .then(res => { console.log('storeuser response', res) })
        .catch(error => console.log(error))
    },
    fetchUser({ commit, state }) {
      if (!state.token) {
        return
      }
      globalAxios.get('/users.json' + '?auth=' + state.token)
        .then(res => {
          const data = res.data
          const users = []
          console.log('fetching data from axios', data)
          for (let key in data) {
            console.log(data[key]);
            const user = data[key]
            user.id = key
            users.push(user);
          }
          console.log('Displaying users from fetchUser action', users)
          console.log('users of 0 ', users[0])
          commit('storeUser', users)
        })
        .catch(error => console.log(error))
    }
  },
})
