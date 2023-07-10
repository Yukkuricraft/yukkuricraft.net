<template>
  <article v-if="postComponent" class='frontmatter-markdown'>
    <component :is="postComponent"></component>
  </article>
  <font-awesome-icon v-else :icon="['fas', 'spinner']" spin size="4x" />
</template>

<script setup lang="ts">
import { onMounted, onServerPrefetch, shallowRef, watch } from 'vue'
import { removeExtension } from '@/files'

const props = defineProps({
  post: {
    type: Object,
    required: true,
  },
})

const postComponent = shallowRef()

async function loadPostComponent() {
  const { postFilename, postYear, postMonth } = props.post

  const postFileWithoutExt = removeExtension(postFilename, '.md')
  const rawPost = await import(
    /* webpackChunkName: "announcement" */ `../../../content/announcements/${postYear}/${postMonth}/${postFileWithoutExt}.md`
    )

  postComponent.value = rawPost.VueComponent
}

watch(
  () => props.post,
  async () => {
    await loadPostComponent()
  },
  { immediate: true },
)

onMounted(async () => {
  if (!postComponent.value) {
    await loadPostComponent()
  }
})

onServerPrefetch(async () => {
  await loadPostComponent()
})

// Seperate component for the content to work around a bug with SSR
</script>
