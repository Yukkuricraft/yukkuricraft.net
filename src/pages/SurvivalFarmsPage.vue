<template>
  <locations-with-images-page :locations="locations"></locations-with-images-page>
</template>

<script setup lang='ts'>
import { useHead } from '@unhead/vue'
import locations from '../../content/locations/farms.yaml'
import LocationsWithImagesPage from './imageLocations/LocationsWithImagesPage.vue'
import { makeMeta } from '@/pageHelpers'

useHead(makeMeta({
  title: 'YukkuriCraft - Public Farms',
  description: 'Discover and enjoy our public farms in Survival.',
  url: 'server-activities/survival/farms/'
}))
</script>
