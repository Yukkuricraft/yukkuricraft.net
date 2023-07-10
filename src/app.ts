import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createMetaManager, defaultConfig } from 'vue-meta'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import App from '@/App.vue'
import { createYcRouter } from '@/router'

import './scss/app.scss'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'

import 'css.escape'

import './fontAwesomeLibrary'

const app = createApp(App)

app.component('FontAwesomeIcon', FontAwesomeIcon)

app.use(createPinia())
app.use(createYcRouter())
app.use(
  createMetaManager(undefined, {
    ...defaultConfig,
    canonicalLink: {
      tag: 'link',
      valueAttribute: 'href'
    },
  }),
)

app.mount('#app')
