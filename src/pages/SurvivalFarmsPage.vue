<template>
  <locations-content :locations="locations"></locations-content>
</template>

<script setup lang='ts'>
import { useHead } from '@unhead/vue'
import locations from '@cont/locations/farms.yaml'
import LocationsContent from './imageLocations/LocationsContent.vue'
import { makeMeta } from '@/pageHelpers'

useHead(makeMeta({
  title: 'YukkuriCraft - Public Farms',
  description: 'Discover and enjoy our public farms in Survival.',
  url: 'server-activities/survival/farms/'
}))
</script>
