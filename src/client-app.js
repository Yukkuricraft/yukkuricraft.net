import { createApp } from './app'

document.addEventListener('DOMContentLoaded', () => {
  // eslint-disable-next-line no-new

  const { app, router, store } = createApp({
    mounted() {
      // You'll need this for renderAfterDocumentEvent.
      document.dispatchEvent(new Event('render-event'))
    },
  })

  if (window.__INITIAL_STATE__) {
    store.replaceState(window.__INITIAL_STATE__)
  }

  router.onReady(() => app.$mount('#app'))
})
