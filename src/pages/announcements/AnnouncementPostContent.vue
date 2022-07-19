<template>
  <component :is="postComponent" v-if="postComponent"></component>
  <font-awesome-icon v-else :icon="['fas', 'spinner']" spin size="4x" />
</template>

<script>
import { removeExtension } from '../../files'

// Seperate component for the content to work around a bug with SSR
export default {
  props: {
    postFile: {
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
    postFile: {
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
      const postFileWithoutExt = removeExtension(this.postFile, '.md')
      const rawPost = await import(
        /* webpackChunkName: "announcement" */ `../../../content/announcements/${postFileWithoutExt}.md`
      )

      this.postComponent = rawPost.default.vue.component
    },
  },
}
</script>
