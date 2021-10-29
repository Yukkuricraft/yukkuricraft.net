<template>
  <locations-with-images-page :parallax-images="images" sidebar-header="Locations" :locations="locations">
    <vue-headful
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

import { autoImage } from '../../images'
import { removeExtension } from '../../files'

import locationList from '../../../content/locations/locationList.yaml'
import LocationsWithImagesPage from '../imageLocations/LocationsWithImagesPage'

export default {
  components: {
    LocationsWithImagesPage,
  },
  data() {
    return {
      allLocations: [],
    }
  },
  computed: {
    images() {
      return autoImage(
        'greenhouse',
        import(/* webpackMode: "eager" */ `!url-loader!../../../generated/backgrounds/greenhouse_data.jpeg`),
        import(/* webpackMode: "eager" */ `!url-loader!../../../generated/backgrounds/greenhouse_data.webp`)
      )
    },
    locations() {
      // We throw out all the getters and such
      return JSON.parse(JSON.stringify(merge({}, ...this.allLocations)))
    },
  },
  created() {
    const allLocations = locationList.locations.map((entry, idx) => {
      const name = removeExtension(entry, '.yaml')
      return import(/* webpackMode: "eager" */ `../../../content/locations/${name}.yaml`).then((commands) => ({
        commands,
        idx,
      }))
    })

    // We get them all together to hopefully only update the DOM once
    Promise.all(allLocations).then((all) => {
      all.forEach(({ commands, idx }) => {
        this.$set(this.allLocations, idx, commands.default)
      })
    })
  },
}
</script>
