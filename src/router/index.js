import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/views/Login'
import Register from '@/views/Register'
import select from '@/components/select'
import Home from '@/views/home'
import Updata from '@/views/updata'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/hw',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/select',
      name: 'select',
      component: select
    },
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/rg',
      name: 'Register',
      component: Register
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/updata',
      name: 'Updata',
      component: Updata
    }

  ]
})
