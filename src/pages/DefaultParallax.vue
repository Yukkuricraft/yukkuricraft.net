<template>
  <h1>{{ defaultTitle }}</h1>
  <p v-if="route.meta.parallaxParagraph">{{ route.meta.parallaxParagraph }}</p>
</template>

<script setup lang="ts">
import { useActiveMeta } from 'vue-meta'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const metadata = useActiveMeta()

const route = useRoute()

const defaultTitle = computed(() => {
  if (route.meta.parallaxTitle) {
    return route.meta.parallaxTitle
  }

  const title = metadata.title
  if (title) {
    return title.startsWith('YukkuriCraft - ') ? title.substring('Yukkuricraft - '.length) : title
  } else {
    return ''
  }
})
</script>
