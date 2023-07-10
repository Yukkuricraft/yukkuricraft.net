<template>
  <h1>{{ defaultTitle }}</h1>
</template>

<script setup lang='ts'>
import { useActiveMeta } from 'vue-meta'
import { computed } from 'vue'

const metadata = useActiveMeta()

const defaultTitle = computed(() => {
  const title = metadata.title
  if (title) {
    return title.startsWith('YukkuriCraft - ') ? title.substring('Yukkuricraft - '.length) : title
  } else {
    return ''
  }
})
</script>