import { createYcApp } from '@/app'

const { app, router } = createYcApp()

router.isReady().then(() => app.mount('#app'))
