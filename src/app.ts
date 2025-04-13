import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import App from '@/App.vue'
import { createYcRouter } from '@/router'

import '@/scss/app.scss'
import '@splidejs/splide/dist/css/themes/splide-default.min.css'

import 'css.escape'

import '@/fontAwesomeLibrary'

export function createYcApp() {
    const app = createApp(App)
    const router = createYcRouter()

    app.component('FontAwesomeIcon', FontAwesomeIcon)

    app.use(createPinia())
    app.use(router)

    return {app, router}
}