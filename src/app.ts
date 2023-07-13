import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createHead } from '@unhead/vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import App from '@/App.vue'
import { createYcRouter } from '@/router'

import '@/scss/app.scss'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'

import 'css.escape'

import '@/fontAwesomeLibrary'

export function createYcApp() {
    const app = createApp(App)
    const router = createYcRouter()
    const head = createHead()

    app.component('FontAwesomeIcon', FontAwesomeIcon)

    app.use(createPinia())
    app.use(router)
    app.use(head)

    return {app, router, head}
}