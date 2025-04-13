import { createHead } from '@unhead/vue/client'
import { createYcApp } from '@/app'

const { app, router } = createYcApp()
const head = createHead()
app.use(head)

router.isReady().then(() => app.mount('#app'))
