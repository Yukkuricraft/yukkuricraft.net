<template>
  <markdown-now :content="content" :no-paragraph="noParagraph"></markdown-now>
</template>

<script>
import TextLoadingComponent from './TextLoadingComponent'
import TextErrorComponent from './TextErrorComponent'

export default {
  components: {
    markdownNow: () => ({
      component: import(/* webpackChunkName: "markdown" */ './MarkdownNow'),
      loading: TextLoadingComponent,
      error: TextErrorComponent,
    }),
  },
  props: {
    content: {
      type: String,
      required: true,
    },
    noParagraph: Boolean,
  },
}
</script>
