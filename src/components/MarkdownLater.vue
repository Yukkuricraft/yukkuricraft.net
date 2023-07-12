<template>
  <markdown-now :content="content" :no-paragraph="noParagraph"></markdown-now>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import TextShowComponent from './TextShowComponent.vue'

const markdownNow = defineAsyncComponent({
  loader: () => import('./MarkdownNow.vue'),
  loadingComponent: TextShowComponent,
  errorComponent: TextShowComponent,
  delay: 0,
})

defineProps({
  content: {
    type: String,
    required: true,
  },
  noParagraph: Boolean,
})
</script>
