<template>
  <locations-with-images-page :locations="locations">
  </locations-with-images-page>
</template>

<script setup lang="ts">
import merge from 'lodash/merge'
import { useHead } from '@unhead/vue'
import { computed, onMounted, onServerPrefetch } from 'vue'

import LocationsWithImagesPage from '../imageLocations/LocationsWithImagesPage.vue'
import { useLocationsStore } from '@/stores/locations'
import { makeMeta } from '@/pageHelpers'

const locationsStore = useLocationsStore()

// We throw out all the getters and such
const locations = computed(() => JSON.parse(JSON.stringify(merge({}, ...locationsStore.allLocations))))

onServerPrefetch(() => locationsStore.loadLocations())

onMounted(async () => {
  if (locationsStore.allLocations.length === 0) {
    await locationsStore.loadLocations()
  }
})

useHead(
  makeMeta({
    title: 'YukkuriCraft - Gensokyo',
    description: 'Look at all the different places in our Gensokyo.',
    url: 'gensokyo/',
  }),
)
</script>
