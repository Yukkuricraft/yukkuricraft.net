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
    content: {
      type: Function,
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
            /* webpackMode: "eager" */ `../../generated/backgrounds/md_pages/${this.parallaxImages}_data.jpeg?inline`
          ),
          import(
            /* webpackMode: "eager" */ `../../generated/backgrounds/md_pages/${this.parallaxImages}_data.webp?inline`
          )
        )
      )
    },
  },
  watch: {
    content: {
      immediate: true,
      handler() {
        this.reloadUsedComponent()
      },
    },
  },
  serverPrefetch() {
    return this.reloadUsedComponent()
  },
  methods: {
    async reloadUsedComponent() {
      this.usedComponent = await this.content()
    },
  },
}
</script>
