import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Register from './views/Register.vue'
import store from './store'
import Layout from './components/Layout/Layout.vue'
import UpdateProfile from './views/UpdateProfile.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '',
      name: 'Layout',
      component: Layout,
      children:[
        {
          path:'',
          name:'Dashboard',
          component:Home
        },
        {
          path:'/userprofile',
          name: 'User-Profile',
          component: UpdateProfile
        }
      ],
      beforeEnter(to,from,next){
       
        console.log('from routes',store.state.token);
        if(localStorage.getItem('token')){
          next()

        }else{
          next('/login')
        }
      }

    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    }
  ]
})
