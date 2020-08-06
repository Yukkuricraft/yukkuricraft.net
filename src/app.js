import 'regenerator-runtime/runtime.js'

import Vue from 'vue'
import VueRouter from 'vue-router'
import VueI18n from 'vue-i18n'
import vueHeadful from 'vue-headful'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import './fontAwesomeLibrary'

import './scss/app.scss'

import 'css.escape'

import App from './App.vue'

import { router } from './router'

Vue.use(VueRouter)
Vue.use(VueI18n)

Vue.component('VueHeadful', vueHeadful)
Vue.component('FontAwesomeIcon', FontAwesomeIcon)
Vue.config.productionTip = false

const supportedLocales = ['en']

const preferredLanguage = window.navigator.language.slice(0, 2)
const usedLocale = supportedLocales.includes(preferredLanguage) ? preferredLanguage : 'en'

const i18n = new VueI18n({
  locale: usedLocale,
})

document.addEventListener('DOMContentLoaded', () => {
  // eslint-disable-next-line no-new
  new Vue({
    el: '#app',
    mounted() {
      // You'll need this for renderAfterDocumentEvent.
      document.dispatchEvent(new Event('render-event'))
    },
    render: (createElement) => createElement(App),
    router,
    i18n,
  })
})
