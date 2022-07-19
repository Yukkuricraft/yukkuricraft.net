<template>
  <vue-headful v-if="shouldRender" :title="title" :description="description" :image="image" :url="url" />
  <span v-else></span>
</template>

<script>
export default {
  props: {
    title: String,
    description: String,
    image: String,
    url: String,
  },
  computed: {
    shouldRender() {
      return typeof window !== 'undefined'
    },
  },
  created() {
    if (!this.shouldRender) {
      this.$ssrContext.title = this.title
      this.$ssrContext.description = this.description
      this.$ssrContext.url = this.url
      this.$ssrContext.image = this.image
    }
  },
}
</script>
