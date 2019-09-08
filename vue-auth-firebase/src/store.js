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
    users: null,
    userEmail: null,
   
  },
  getters: {
    users(state) {
      return state.users
    },
    isAuthenticated(state) {
      return state.token !== null;
    },
  
  },
  mutations: {
    authUser(state, userData) {
      state.token = userData.token,
        state.userId = userData.userId,
        state.userEmail = userData.email
    },
    storeUser(state, users) {
      state.users = users
    },
    clearAuthData(state) {
      state.token = null,
        state.userId = null
    },
  
    
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
          localStorage.setItem('userEmail', res.data.email)
        
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
          localStorage.setItem('email',res.data.email)

          router.push('/')
        })
        .catch(error => console.log(error))
    },
    logout({ commit }) {
      commit('clearAuthData');
      localStorage.removeItem('token')
      localStorage.removeItem('userId')
      localStorage.removeItem('email')
      router.replace('/login')
    },
    refreshLogin({ commit }) {
      const token = localStorage.getItem('token')
      const userId = localStorage.getItem('userId')
      const email = localStorage.getItem('email')
      if (!token) {
        console.log('token null')
        return
      }
      commit('authUser', {
        token: token,
        userId: userId,
        email:email
      })
    },
    storeUser({ state }, authData) {
      
      globalAxios.post(`users/${state.userId}.json?auth=${state.token}`, authData)
        .then(res => { console.log('storeuser response', res) })
        .catch(error => console.log(error))

       
    },
    updateUser({state},userData){
      
        globalAxios.patch(`users/${state.userId}/${state.users.id}.json?auth=${state.token}`, userData)
        .then(res => { console.log('update user response', res) })
        .catch(error => console.log(error))
    
    },
    fetchUser({ commit, state }) {
      if (!state.token) {
        return
      }
      globalAxios.get(`users/${state.userId}.json?auth=${state.token}`)
        .then(res => {
          const data = res.data
          const users = []
          let loggedInUser = {}
          console.log('fetching data from axios', data)
          for (let key in data) {
            
            const user = data[key]
            console.log('user object from fetch',user.email);
            user.id = key
            users.push(user);
           if(state.userEmail === user.email){
             loggedInUser = {...user};
             console.log('logged in User',loggedInUser)
           }
          }
          console.log('Displaying users from fetchUser action', users)
          commit('storeUser', loggedInUser)
        
          
        })
      // globalAxios
      //   .get(`users/${state.userId}.json?auth=${state.token}`)
      //   .then(( {data} ) => {

      //     const users = 
      //     for (let key in data) {
            
      //    const user = data[key]
      //           console.log('user object from fetch',user)
      //            this.users = user;
      //     }
      //     commit("storeUser", users)
      //     console.log("fetch data",data);
      //   })
      //   .catch(error => console.log(error))
    }
  },
})
