<template>
  <normal-page :parallax-images="images">
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
      <component :is="usedComponent.vue.component" v-if="usedComponent" class="markdown-formatting"></component>
      <font-awesome-icon v-else :icon="['fas', 'spinner']" spin size="6x"></font-awesome-icon>
    </main>
  </normal-page>
</template>

<script>
import NormalPage from '../layout/NormalPage'
import { autoImage } from '../images'
import LoadingPage from './LoadingPage'

export default {
  components: {
    LoadingPage,
    NormalPage,
  },
  props: {
    localizedComponents: {
      type: Object,
      required: true,
    },
    canonicalUrl: {
      type: String,
      required: true,
    },
    parallaxImages: String,
  },
  data() {
    return {
      usedComponent: null,
    }
  },
  computed: {
    parallaxHeight() {
      return this.usedComponent?.attributes?.parallaxHeight || 600
    },
    title() {
      return this.usedComponent?.attributes?.title || ''
    },
    description() {
      return this.usedComponent?.attributes?.description || ''
    },
    images() {
      return (
        this.parallaxImages &&
        autoImage(
          'md_pages/' + this.parallaxImages,
          import(
            /* webpackMode: "eager" */ `!url-loader!../../generated/backgrounds/md_pages/${this.parallaxImages}_data.jpeg`
          ),
          import(
            /* webpackMode: "eager" */ `!url-loader!../../generated/backgrounds/md_pages/${this.parallaxImages}_data.webp`
          )
        )
      )
    },
  },
  watch: {
    localizedComponents: {
      immediate: true,
      handler() {
        this.reloadUsedComponent()
      },
    },
    async $i18n() {
      await this.reloadUsedComponent()
    },
  },
  methods: {
    async reloadUsedComponent() {
      const file = this.localizedComponents[this.$i18n.locale]
      this.usedComponent = await import(/* webpackChunkName: "mdPage" */ `../../content/pages/${file}`)
    },
  },
}
</script>
