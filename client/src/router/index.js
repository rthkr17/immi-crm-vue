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
import Schedules from '@/components/Schedules'
import Staff from '@/components/Staff'
import Messages from '@/components/Messages'
import Retainers from '@/components/Retainers'
import Calender from '@/components/Calender'
import Tasks from '@/components/Tasks'
import UserProfile from '@/components/UserProfile'
import Application from '@/components/Application'
import Message from '@/components/Message'

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
      path: '/applications/:applicationId',
      name: 'application',
      component: Application
    },
    {
      path: '/staff',
      component: Staff
    },
    {
      path: '/new-application',
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
      component: Schedules
    },
    {
      path: '/messages',
      name: 'messages',
      component: Messages
    },
    {
      path: '/messages/:messageId',
      name: 'message',
      component: Message
    },
    {
      path: '/retainers',
      name: 'retainers',
      component: Retainers
    },
    {
      path: '/tasks',
      name: 'tasks',
      component: Tasks
    },
    {
      path: '/profile',
      name: 'profile',
      component: UserProfile
    },
    {
      path: '/calender',
      name: 'calender',
      component: Calender
    }
  ]
})
