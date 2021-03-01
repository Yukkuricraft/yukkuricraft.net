<template>
  <normal-page :parallax-images="realParallaxImages">
    <template #parallax>
      <h1>{{ title }}</h1>
    </template>

    <vue-headful
      :title="'YukkuriCraft - ' + title"
      :description="description"
      :image="require('../favicon_upscaled.png')"
      :url="canonicalUrl"
    />

    <main>
      <slot></slot>
      <component :is="usedComponent.vue.component"></component>
    </main>
  </normal-page>
</template>

<script>
import NormalPage from '../layout/NormalPage'

export default {
  components: {
    NormalPage,
  },
  props: {
    component: {
      type: Object,
      required: true,
    },
    localizedComponents: [Object, Promise],
    parallaxImages: Function,
  },
  data() {
    return {
      nowLocalizedComponents: {},
      realParallaxImages: null,
    }
  },
  computed: {
    usedComponent() {
      return this.nowLocalizedComponents[this.$i18n.locale] || this.component
    },
    parallaxHeight() {
      return this.component.attributes.parallaxHeight
    },
    title() {
      return this.component.attributes.title
    },
    description() {
      return this.component.attributes.description
    },
    canonicalUrl() {
      return this.component.attributes.canonicalUrl
    },
  },
  watch: {
    parallaxImages: {
      immediate: true,
      handler(val) {
        if (val) {
          this.realParallaxImages = val()
        }
      },
    },
    localizedComponents: {
      immediate: true,
      async handler(val) {
        this.nowLocalizedComponents = await Promise.resolve(val ?? {})
      },
    },
  },
}
</script>
