<template>
  <locations-with-images-page :parallax-images="images" sidebar-header="Locations" :locations="locations">
    <headful-wrap
      title="YukkuriCraft - Gensokyo"
      description="Look at all the different places in our Gensokyo."
      :image="require('../../favicon_upscaled.png')"
      url="https://yukkuricraft.net/gensokyo/"
    />

    <template #parallax>
      <h1>Locations in Gensokyo</h1>
      <p>Explore our builds in Gensokyo.</p>
    </template>
  </locations-with-images-page>
</template>

<script>
import merge from 'lodash/merge'
import { mapState, mapActions } from 'vuex'

import { autoImage } from '../../images'

import LocationsWithImagesPage from '../imageLocations/LocationsWithImagesPage'
import HeadfulWrap from '../../components/HeadfulWrap'

export default {
  components: {
    LocationsWithImagesPage,
    HeadfulWrap,
  },
  computed: {
    ...mapState('locations', ['allLocations']),
    images() {
      return autoImage(
        'greenhouse',
        import(/* webpackMode: "eager" */ `../../../generated/backgrounds/greenhouse_data.jpeg?inline`),
        import(/* webpackMode: "eager" */ `../../../generated/backgrounds/greenhouse_data.webp?inline`)
      )
    },
    locations() {
      // We throw out all the getters and such
      return JSON.parse(JSON.stringify(merge({}, ...this.allLocations)))
    },
  },
  serverPrefetch() {
    return this.loadLocations()
  },
  async created() {
    if (this.allLocations.length === 0) {
      await this.loadLocations()
    }
  },
  methods: {
    ...mapActions('locations', ['loadLocations']),
  },
}
</script>
