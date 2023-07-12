<template>
  <main>
    <slot></slot>

    <location-item
      v-for="(location, locationId) in locations"
      :key="locationId"
      :depth="0"
      :location-id="locationId"
      :location="location"
    />
  </main>
</template>

<script setup lang='ts'>
import LocationItem from './LocationItem.vue'

defineProps({
  locations: {
    type: Object,
    required: true,
  },
})
</script>
