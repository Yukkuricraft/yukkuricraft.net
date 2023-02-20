<template>
  <div>
    <!-- Div here helps with an SSR bug -->
    <locations-with-images-page :parallax-images="images" sidebar-header="Locations" :locations="locations">
      <headful-wrap
        title="YukkuriCraft - Towns"
        description="Explore the various public towns and cities in Survival."
        :image="require('../favicon_upscaled.png')"
        url="https://yukkuricraft.net/server-activities/survival/towns/"
      />

      <template #parallax>
        <h1>Towns</h1>
        <p>Explore the various public towns and cities in Survival.</p>
      </template>
    </locations-with-images-page>
  </div>
</template>

<script>
import locations from '../../content/locations/towns.yaml'
import { autoImage } from '../images'
import HeadfulWrap from '../components/HeadfulWrap'
import LocationsWithImagesPage from './imageLocations/LocationsWithImagesPage'

export default {
  components: { LocationsWithImagesPage, HeadfulWrap },
  computed: {
    images() {
      return autoImage(
        'kagome_airships',
        import(/* webpackMode: "eager" */ `../../generated/backgrounds/kagome_airships_data.jpeg?inline`),
        import(/* webpackMode: "eager" */ `../../generated/backgrounds/kagome_airships_data.webp?inline`)
      )
    },
    locations() {
      return locations
    },
  },
}
</script>
