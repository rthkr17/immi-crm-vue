// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { sync } from 'vuex-router-sync'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import colors from 'vuetify/es5/util/colors'
import store from '@/store/store'

Vue.config.productionTip = false

Vue.use(Vuetify, {
  iconfont: 'md',
  theme: {
    primary: colors.cyan, // #E53935
    secondary: colors.cyan.darken1, // #FFCDD2
    accent: colors.deepOrange
  }
})

sync(store, router)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
