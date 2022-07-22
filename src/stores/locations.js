import Vue from 'vue'
import locationList from '../../content/locations/locationList.yaml'
import { removeExtension } from '../files'
import { makeImage } from '../images'

export default {
  namespaced: true,
  state: () => ({
    allLocations: [],
    loadingLocations: false,
    waiters: [],
    imageLocations: {},
    loadingImages: {},
    imageWaiters: {},
  }),
  mutations: {
    startLoading(state) {
      state.loadingLocations = true
    },
    registerWaiter(state, { resolve }) {
      state.waiters.push(resolve)
    },
    setAllLocations(state, { locations }) {
      locations.forEach(({ locations, idx }) => {
        Vue.set(state.allLocations, idx, locations.default)
      })
    },
    endLoading(state) {
      state.loadingLocations = false
      for (const waiter of state.waiters) {
        waiter()
      }
      state.waiters = []
    },

    startLoadingImage(state, { imageName }) {
      state.loadingImages[imageName] = true
      state.imageWaiters[imageName] = []
    },
    registerImageWaiter(state, { imageName, resolve }) {
      state.imageWaiters[imageName].push(resolve)
    },
    setLoadedImage(state, { imageName, image }) {
      state.imageLocations[imageName] = image
    },
    endLoadingImage(state, { imageName }) {
      state.loadingImages[imageName] = false
      for (const waiter of state.imageWaiters[imageName]) {
        waiter()
      }
    },
  },
  actions: {
    async loadLocations({ state, commit }) {
      if (state.loadingLocations) {
        await new Promise((resolve) => commit({ type: 'registerWaiter', resolve }))
        return
      }

      commit('startLoading')

      const allLocations = await Promise.all(
        locationList.locations.map((entry, idx) => {
          const name = removeExtension(entry, '.yaml')
          return import(/* webpackChunkName: "locationsData" */ `../../content/locations/${name}.yaml`).then(
            (locations) => ({
              locations,
              idx,
            })
          )
        })
      )

      commit({ type: 'setAllLocations', locations: allLocations })

      commit('endLoading')
    },
    async loadLocationImages({ state, commit }, { imageName }) {
      if (state.loadingImages[imageName]) {
        await new Promise((resolve) => commit({ type: 'registerImageWaiter', imageName, resolve }))
        return
      }

      commit({ type: 'startLoadingImage', imageName })

      const [big, small, bigWebp, smallWebp] = await Promise.all([
        import(`../../generated/builds/${imageName}.jpeg`),
        import(`../../generated/builds/${imageName}_thumbnail.jpeg`),
        import(`../../generated/builds/${imageName}.webp`),
        import(`../../generated/builds/${imageName}_thumbnail.webp`),
      ])

      const image = makeImage(big.default, bigWebp.default, small.default, smallWebp.default)
      commit({ type: 'setLoadedImage', imageName, image })

      commit({ type: 'endLoadingImage', imageName })
    },
  },
}
