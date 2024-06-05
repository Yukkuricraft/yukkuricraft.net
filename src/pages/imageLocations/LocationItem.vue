<template>
  <section class="block">
    <configurable-heading
      :id="'location-' + locationId"
      :level="3 + depth"
      class="title"
      :class="'is-size-' + (3 + depth)"
      >{{ location.displayName }}</configurable-heading
    >
    <location-builders v-if="location.builders" :builders="location.builders" :type="location.type" />
    <!-- eslint-disable vue/no-v-html -->
    <div v-if="location.description" class="content markdown-formatting" v-html="location.description"></div>
    <location-images v-if="location.images" :images="location.images" :location-id="locationId" />

    <location-item
      v-for="(subLocation, subLocationId) in refineType<LocationTpe>(location.sublocations ?? {})"
      :key="subLocationId"
      :depth="depth + 1"
      :location-id="subLocationId"
      :location="subLocation"
    />
  </section>
</template>

<script setup lang="ts">
import { type PropType } from 'vue'

import { type Location as LocationTpe } from '@gen/locations/locationList'
import ConfigurableHeading from '@/components/ConfigurableHeading.vue'

import LocationImages from '@/pages/imageLocations/LocationImages.vue'
import LocationBuilders from '@/pages/imageLocations/LocationBuilders.vue'

function refineType<V>(sources: { [k: string]: V }): Record<string, V> {
  return sources
}

defineProps({
  locationId: {
    type: String,
    required: true,
  },
  location: {
    type: Object as PropType<LocationTpe>,
    required: true,
  },
  depth: {
    type: Number,
    required: true,
  },
})
</script>
