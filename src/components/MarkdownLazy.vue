<template>
  <markdown :content="content" :no-paragraph="noParagraph"></markdown>
</template>

<script>
import TextLoadingComponent from './TextLoadingComponent'
import TextErrorComponent from './TextErrorComponent'

export default {
  components: {
    markdown: () => ({
      component: import(/* webpackChunkName: "markdown" */ './Markdown'),
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
