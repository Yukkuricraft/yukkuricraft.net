<template>
  <div>
    <!-- Div here helps with an SSR bug -->
    <locations-with-images-page :parallax-images="images" sidebar-header="Locations" :locations="locations">
      <headful-wrap
        title="YukkuriCraft - Help us build!"
        description="Take a look at our ongoing projects in Gensokyo."
        :image="require('../../favicon_upscaled.png')"
        url="https://yukkuricraft.net/gensokyo/help/"
      />

      <template #parallax>
        <h1>Help us build Gensokyo</h1>
        <p>We always need more hands to help us build Gensokyo. Here is a list of our ongoing projects.</p>
      </template>

      <h2>Meetings</h2>
      <p>
        Builders on YukkuriCraft meet twice a month to plan, give feedback, and build together. The days these meetings
        happens on is the first and third Saturday of every month at 4PM EST(EDT if Daylight saving applies). At those
        times you can find us on our Discord in the Building Room. No matter your skill, Gensokyo is a community project
        so please come and build with us! You can also always contact a Lead Builder at any time if you want to work on
        something.
      </p>

      <h2>Active locations</h2>
      <p>
        Here's a list of builds we are currently working on. If you see anything interesting, contact a Lead Builder to
        get a rundown of the build and a way to contact the person leading it in order to help. Note: If a location
        isn't on this list that doesn't mean you can't help with it. We most likely haven't started on it yet.
      </p>
    </locations-with-images-page>
  </div>
</template>

<script>
import locations from '../../../content/locations/help_locations.yaml'
import { autoImage } from '../../images'
import LocationsWithImagesPage from '../imageLocations/LocationsWithImagesPage'
import HeadfulWrap from '../../components/HeadfulWrap'

export default {
  components: {
    HeadfulWrap,
    LocationsWithImagesPage,
  },
  computed: {
    images() {
      return autoImage(
        'pond',
        import(/* webpackMode: "eager" */ `../../../generated/backgrounds/pond_data.jpeg?inline`),
        import(/* webpackMode: "eager" */ `../../../generated/backgrounds/pond_data.webp?inline`)
      )
    },
    locations() {
      return locations
    },
  },
}
</script>
