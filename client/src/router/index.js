import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import Register from '@/components/Register'
import Login from '@/components/Login'
import Welcome from '@/components/Welcome'
import Applications from '@/components/Applications'
import CreateApplication from '@/components/CreateApplication'
import PageHeader from '@/components/PageHeader'
import NavDrawer from '@/components/NavDrawer'
import Calender from '@/components/Calender'
import Staff from '@/components/Staff'
import Messages from '@/components/Messages'
import Messagesss from '@/components/Messagesss'

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
      name: 'welcome',
      component: Welcome
    },
    {
      path: '/applications',
      component: Applications
    },
    {
      path: '/staff',
      component: Staff
    },
    {
      path: '/applications/create',
      component: CreateApplication
    },
    {
      path: '/page-header',
      component: PageHeader
    },
    {
      path: '/nav-drawer',
      component: NavDrawer
    },
    {
      path: '/schedules',
      name: 'schedules',
      component: Calender
    },
    {
      path: '/messages',
      name: 'messages',
      component: Messages
    },
    {
      path: '/messagesss',
      name: 'messagesss',
      component: Messagesss
    }
  ]
})
