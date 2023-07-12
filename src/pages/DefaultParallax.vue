<template>
  <h1>{{ defaultTitle }}</h1>
  <p v-if="route.meta.parallaxParagraph">{{ route.meta.parallaxParagraph }}</p>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const defaultTitle = computed(() => {
  if (route.meta.parallaxTitle) {
    return route.meta.parallaxTitle
  } else {
    return ''
  }
})
</script>
