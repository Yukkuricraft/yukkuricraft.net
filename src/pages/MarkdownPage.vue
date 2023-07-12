<template>
  <main class="markdown-formatting">
    <slot></slot>
    <component :is="usedComponent.VueComponent" v-if="usedComponent"></component>
    <font-awesome-icon v-else :icon="['fas', 'spinner']" spin size="6x"></font-awesome-icon>
  </main>
</template>

<script setup lang="ts">
import { computed, ref, type ComponentOptions, watch, onServerPrefetch } from 'vue'
import { useHead } from '@unhead/vue'

import { makeMeta } from '@/pageHelpers'

const props = defineProps({
  content: {
    type: Function,
    required: true,
  },
  canonicalUrl: {
    type: String,
    required: true,
  },
  parallaxImagesName: String,
})

const usedComponent = ref<{ attributes: Record<string, unknown>; VueComponent: ComponentOptions }>()

const title = computed(() => (usedComponent.value?.attributes?.title as string | undefined) || '')
const description = computed(() => (usedComponent.value?.attributes?.description as string | undefined) || '')

useHead(
  makeMeta({
    title: computed(() => 'YukkuriCraft - ' + title.value),
    description: description,
    url: computed(() => props.canonicalUrl),
  }),
)

watch(
  () => props.content,
  () => {
    reloadUsedComponent()
  },
  { immediate: true },
)

onServerPrefetch(() => reloadUsedComponent())

async function reloadUsedComponent() {
  usedComponent.value = await props.content()
}
</script>
