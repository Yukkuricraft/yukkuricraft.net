<template>
  <locations-with-images-page :locations="locations">
  </locations-with-images-page>
</template>

<script setup lang="ts">
import { useHead } from '@unhead/vue'
import locations from '../../content/locations/towns.yaml'
import LocationsWithImagesPage from './imageLocations/LocationsWithImagesPage.vue'
import { makeMeta } from '@/pageHelpers'

useHead(
  makeMeta({
    title: 'YukkuriCraft - Towns',
    description: 'Explore the various public towns and cities in Survival.',
    url: 'server-activities/survival/towns/',
  }),
)
</script>
