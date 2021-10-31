<template>
  <div>
    <!-- Div here helps with an SSR bug -->
    <locations-with-images-page :parallax-images="images" sidebar-header="Locations" :locations="locations">
      <headful-wrap
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
  </div>
</template>

<script>
import locations from '../../content/locations/farms_towns.yaml'
import { autoImage } from '../images'
import HeadfulWrap from '../components/HeadfulWrap'
import LocationsWithImagesPage from './imageLocations/LocationsWithImagesPage'

export default {
  components: { LocationsWithImagesPage, HeadfulWrap },
  computed: {
    images() {
      return autoImage(
        'kagome_airships',
        import(/* webpackMode: "eager" */ `!url-loader!../../generated/backgrounds/kagome_airships_data.jpeg`),
        import(/* webpackMode: "eager" */ `!url-loader!../../generated/backgrounds/kagome_airships_data.webp`)
      )
    },
    locations() {
      return locations
    },
  },
}
</script>
