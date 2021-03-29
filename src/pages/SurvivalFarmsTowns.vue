<template>
  <locations-with-images-page :parallax-images="images" sidebar-header="Locations" :locations="locations">
    <vue-headful
      title="YukkuriCraft - Farms and Towns"
      description="Explore our towns and farms in Survival."
      :image="require('../favicon_upscaled.png')"
      url="https://yukkuricraft.net/server-activities/survival/farms-towns/"
    />

    <template #parallax>
      <h1>Farms and Towns</h1>
      <p>Explore our towns and farms in Survival.</p>
    </template>
  </locations-with-images-page>
</template>

<script>
import locations from '../../content/locations/farms_towns.yaml'
import { autoImage } from '../images'
import LocationsWithImagesPage from './imageLocations/LocationsWithImagesPage'

export default {
  components: { LocationsWithImagesPage },
  computed: {
    images() {
      return autoImage('kagome_airships') // TODO
    },
    locations() {
      return locations
    },
  },
}
</script>
