import 'regenerator-runtime/runtime.js'

import Vue from 'vue'
import VueRouter from 'vue-router'
import VueI18n from 'vue-i18n'
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
Vue.use(VueI18n)

Vue.component('VueHeadful', vueHeadful)
Vue.component('FontAwesomeIcon', FontAwesomeIcon)
Vue.config.productionTip = false

const supportedLocales = ['en']

const preferredLanguage = typeof window !== 'undefined' ? window.navigator.language.slice(0, 2) : 'en'
const usedLocale = supportedLocales.includes(preferredLanguage) ? preferredLanguage : 'en'

export function createApp(extraSettings) {
  const i18n = new VueI18n({
    locale: usedLocale,
  })

  const router = createRouter()
  const store = createStore()

  sync(store, router)

  const app = new Vue({
    ...extraSettings,
    render: (createElement) => createElement(App),
    router,
    store,
    i18n,
  })

  return { app, router, store }
}
