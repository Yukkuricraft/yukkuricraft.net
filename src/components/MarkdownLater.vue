<template>
  <markdown-now :content="content" :no-paragraph="noParagraph"></markdown-now>
</template>

<script>
import TextShowComponent from './TextShowComponent'

export default {
  components: {
    markdownNow: () => ({
      component: import(/* webpackChunkName: "markdown" */ './MarkdownNow'),
      loading: TextShowComponent,
      error: TextShowComponent,
      delay: 0,
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
