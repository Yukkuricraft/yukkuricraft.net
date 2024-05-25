<template>
  <locations-content :locations="locations" />
</template>

<script setup lang="ts">
import { useHead } from '@unhead/vue'
import { yukkurikart as locations } from '@gen/locations/locationList'
import LocationsContent from './imageLocations/LocationsContent.vue'
import { makeMeta } from '@/pageHelpers'

useHead(makeMeta({
  title: 'YukkuriCraft - YukkuriKart',
  description: 'Experience fast-paced ice boat racing fun in this new minigame.',
  url: 'server-activities/yukkurikart/',
}))
</script>