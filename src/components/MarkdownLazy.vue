<template>
  <markdown-now :content="content" :no-paragraph="noParagraph"></markdown-now>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import TextLoadingComponent from './TextLoadingComponent.vue'
import TextErrorComponent from './TextErrorComponent.vue'

const markdownNow = defineAsyncComponent({
  loader: () => import(/* webpackChunkName: "markdown" */ './MarkdownNow.vue'),
  loadingComponent: TextLoadingComponent,
  errorComponent: TextErrorComponent,
})

defineProps({
  content: {
    type: String,
    required: true,
  },
  noParagraph: Boolean,
})
</script>
