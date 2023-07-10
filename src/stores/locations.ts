import { defineStore } from 'pinia'

import { type Locations } from '../../content/locations/locationList'

interface State {
  allLocations: Locations[]
  loadingLocations: boolean
  waiters: (() => void)[]
}

export const useLocationsStore = defineStore('locations', {
  state: (): State => ({
    allLocations: [],
    loadingLocations: false,
    waiters: [],
  }),
  actions: {
    startLoading() {
      this.loadingLocations = true
    },
    registerWaiter(resolve: () => void) {
      this.waiters.push(resolve)
    },
    setAllLocations(locations: { locations: Locations; idx: number }[]) {
      locations.forEach(({ locations, idx }) => {
        this.allLocations[idx] = locations
      })
    },
    endLoading() {
      this.loadingLocations = false
      for (const waiter of this.waiters) {
        waiter()
      }
      this.waiters = []
    },
    async loadLocations() {
      if (this.loadingLocations) {
        await new Promise((resolve) => this.registerWaiter(resolve as () => void))
        return
      }

      this.startLoading()

      const allLocations = await import('../../content/locations/locationList').then((l) =>
        l.neoGenso.map((locations, idx) => ({ locations, idx })),
      )

      this.setAllLocations(allLocations)

      this.endLoading()
    },
  },
})
