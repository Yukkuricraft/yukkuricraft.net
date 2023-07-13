<template>
  <main>
    <slot></slot>

    <location-item
      v-for="(location, locationId) in refineType<Location>(locations)"
      :key="locationId"
      :depth="0"
      :location-id="locationId"
      :location="location"
    />
  </main>
</template>

<script setup lang="ts">
import { type PropType } from 'vue'
import { type Locations, type Location } from '@cont/locations/locationList'
import LocationItem from './LocationItem.vue'

function refineType<V>(sources: { [k: string]: V }): Record<string, V> {
  return sources
}

defineProps({
  locations: {
    type: Object as PropType<Locations>,
    required: true,
  },
})
</script>
