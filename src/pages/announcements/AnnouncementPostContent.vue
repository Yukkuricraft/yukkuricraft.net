<template>
  <component :is="postComponent" v-if="postComponent"></component>
  <font-awesome-icon v-else :icon="['fas', 'spinner']" spin size="4x" />
</template>

<script>
// Seperate component for the content to work around a bug with SSR
export default {
  props: {
    postName: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      postComponent: null,
    }
  },
  watch: {
    postName: {
      immediate: true,
      async handler() {
        await this.loadPostComponent()
      },
    },
  },
  async serverPrefetch() {
    await this.loadPostComponent()
  },
  async created() {
    if (!this.postComponent) {
      await this.loadPostComponent()
    }
  },
  methods: {
    async loadPostComponent() {
      const rawPost = await import(
        /* webpackChunkName: "announcement" */ `../../../content/announcements/${this.postName}.md`
      )

      this.postComponent = rawPost.default.vue.component
    },
  },
}
</script>
