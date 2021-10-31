/* eslint-disable no-console */
import { createApp } from './app'

export default (context) => {
  // eslint-disable-next-line vue/no-shared-component-data
  const { app, router, store } = createApp()
  router.push(context.url)

  return new Promise((resolve, reject) => {
    router.onReady(() => {
      context.rendered = () => {
        context.state = store.state
      }

      resolve(app)
    }, reject)
  })
}
