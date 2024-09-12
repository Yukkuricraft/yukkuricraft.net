<template>
  <locations-content :locations="locations">
    <div class="content">
      <h2>Meetings</h2>
      <p>
        Builders on Yukkuricraft meet twice a month to plan, give feedback, and build together. The days these meetings
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
    </div>
  </locations-content>
</template>

<script setup lang="ts">
import { useHead } from '@unhead/vue'
import { help_locations as locations } from '@gen/locations/locationList'
import LocationsContent from '@/pages/imageLocations/LocationsContent.vue'
import { makeMeta } from '@/pageHelpers'

useHead(
  makeMeta({
    title: 'Yukkuricraft - Help us build!',
    description: 'Take a look at our ongoing projects in Gensokyo.',
    url: 'gensokyo/help/',
  }),
)
</script>
