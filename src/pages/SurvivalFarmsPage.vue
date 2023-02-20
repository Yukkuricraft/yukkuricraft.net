<template>
  <div>
    <!-- Div here helps with an SSR bug -->
    <locations-with-images-page :parallax-images="images" sidebar-header="Locations" :locations="locations">
      <headful-wrap
        title="YukkuriCraft - Public Farms"
        description="Discover and enjoy our public farms in Survival."
        :image="require('../favicon_upscaled.png')"
        url="https://yukkuricraft.net/server-activities/survival/farms/"
      />

      <template #parallax>
        <h1>Public Farms</h1>
        <p>Discover and enjoy our public farms in Survival.</p>
      </template>
    </locations-with-images-page>
  </div>
</template>

<script>
import locations from '../../content/locations/farms.yaml'
import { autoImage } from '../images'
import HeadfulWrap from '../components/HeadfulWrap'
import LocationsWithImagesPage from './imageLocations/LocationsWithImagesPage'

export default {
  components: { LocationsWithImagesPage, HeadfulWrap },
  computed: {
    images() {
      return autoImage(
        'spawner',
        import(/* webpackMode: "eager" */ `../../generated/backgrounds/spawner_data.jpeg?inline`),
        import(/* webpackMode: "eager" */ `../../generated/backgrounds/spawner_data.webp?inline`)
      )
    },
    locations() {
      return locations
    },
  },
}
</script>
