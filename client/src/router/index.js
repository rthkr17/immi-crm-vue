import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import Register from '@/components/Register'
import Login from '@/components/Login'
import Welcome from '@/components/Welcome'
import Applications from '@/components/Applications'
import PageHeader from '@/components/PageHeader'
import NavDrawer from '@/components/NavDrawer'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/welcome',
      component: Welcome
    },
    {
      path: '/applications',
      component: Applications
    },
    {
      path: '/page-header',
      component: PageHeader
    },
    {
      path: '/nav-drawer',
      component: NavDrawer
    }
  ]
})
