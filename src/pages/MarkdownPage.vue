<template>
  <div>
    <!-- Div here helps with an SSR bug -->
    <normal-page :parallax-images="images" :parallax-height="parallaxHeight">
      <template #parallax>
        <h1>{{ title }}</h1>
      </template>

      <headful-wrap
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
  </div>
</template>

<script>
import NormalPage from '../layout/NormalPage'
import { autoImage } from '../images'
import HeadfulWrap from '../components/HeadfulWrap'
import LoadingPage from './LoadingPage'

export default {
  components: {
    HeadfulWrap,
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
  serverPrefetch() {
    return this.reloadUsedComponent()
  },
  methods: {
    async reloadUsedComponent() {
      const file = this.localizedComponents[this.$i18n.locale]
      this.usedComponent = await import(/* webpackChunkName: "mdPage" */ `../../content/pages/${file}`)
    },
  },
}
</script>
