<template>
  <div class="parallax-wrapper" :style="{ height: height + 'px' }">
    <div
      class="parallax"
      :class="{ 'parallax-blur': !switched }"
      :style="{ height: height + 'px', 'background-image': `url(${imageToUse || placeholderImage})` }"
    ></div>

    <div :style="{ height: height + 'px' }" class="parallax-foreground">
      <b-container class="h-100">
        <b-row class="text-center align-items-center h-100">
          <b-col md="2"></b-col>
          <b-col class="parallax-text">
            <slot></slot>
          </b-col>
          <b-col md="2"></b-col>
        </b-row>
      </b-container>
    </div>

    <picture v-if="loadedImages">
      <source
        v-for="(typeImages, type) in loadedImages.sources"
        :type="type"
        :srcset="typeImages.srcset"
        :sizes="typeImages.sizes"
      />

      <img v-show="false" :src="loadedImages.src" alt="Background" @load="switchImage" />
    </picture>
  </div>
</template>

<script>
import { BContainer, BRow, BCol } from 'bootstrap-vue'
import { isPrerender } from '../prerender'

export default {
  components: {
    BContainer,
    BRow,
    BCol,
  },
  props: {
    images: {
      type: [Object, Promise],
      required: true,
    },
    height: {
      type: Number,
      default: 600,
    },
  },
  data() {
    return {
      loadedImages: null,
      placeholderImage: null,
      imageToUse: null,
      switched: false,
    }
  },
  watch: {
    images: {
      immediate: true,
      handler(val) {
        if (this.loadedImages) {
          this.switched = false
        }

        Promise.resolve(val).then((images) => {
          this.loadedImages = images
          this.placeholderImage = images.dataPlaceholder
        })
      },
    },
  },
  methods: {
    switchImage(event) {
      if (!isPrerender) {
        this.imageToUse = event.target.currentSrc ?? event.target.src
        this.switched = true
      }
    },
  },
}
</script>
