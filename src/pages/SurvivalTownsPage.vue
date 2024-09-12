<template>
  <locations-content :locations="locations"></locations-content>
</template>

<script setup lang="ts">
import { useHead } from '@unhead/vue'
import { towns as locations } from '@gen/locations/locationList'
import LocationsContent from './imageLocations/LocationsContent.vue'
import { makeMeta } from '@/pageHelpers'

useHead(
  makeMeta({
    title: 'Yukkuricraft - Towns',
    description: 'Explore the various public towns and cities in Survival.',
    url: 'server-activities/survival/towns/',
  }),
)
</script>
