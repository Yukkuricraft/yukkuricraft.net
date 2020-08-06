<template>
  <markdown :content="content" :no-paragraph="noParagraph"></markdown>
</template>

<script>
import TextShowComponent from './TextShowComponent'

export default {
  components: {
    markdown: () => ({
      component: import(/* webpackChunkName: "markdown" */ './Markdown'),
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
