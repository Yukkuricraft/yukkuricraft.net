<template>
  <locations-content :locations="locations"></locations-content>
</template>

<script setup lang="ts">
import { useHead } from '@unhead/vue'
import { farms as locations } from '@gen/locations/locationList'
import LocationsContent from './imageLocations/LocationsContent.vue'
import { makeMeta } from '@/pageHelpers'

useHead(
  makeMeta({
    title: 'YukkuriCraft - Public Farms',
    description: 'Discover and enjoy our public farms in Survival.',
    url: 'server-activities/survival/farms/',
  }),
)
</script>
