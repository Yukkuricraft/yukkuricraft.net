import 'regenerator-runtime/runtime.js'

import Vue from 'vue'
import VueRouter from 'vue-router'
import vueHeadful from 'vue-headful'
import { sync } from 'vuex-router-sync'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import './fontAwesomeLibrary'

import './scss/app.scss'

import 'css.escape'

import App from './App.vue'

import { createRouter } from './router'
import { createStore } from './stores'

Vue.use(VueRouter)

Vue.component('VueHeadful', vueHeadful)
Vue.component('FontAwesomeIcon', FontAwesomeIcon)
Vue.config.productionTip = false

export function createApp(extraSettings) {
  const router = createRouter()
  const store = createStore()

  sync(store, router)

  const app = new Vue({
    ...extraSettings,
    render: (createElement) => createElement(App),
    router,
    store,
  })

  return { app, router, store }
}
