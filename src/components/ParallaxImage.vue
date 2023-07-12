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

    <picture>
      <source
        v-for="(typeImages, type) in refineType(loadedImages.sources)"
        :key="type"
        :type="type"
        :srcset="typeImages.srcset"
        :sizes="typeImages.sizes"
      />

      <img v-show="false" :src="loadedImages.src" alt="Background" @load="switchImage" />
    </picture>
  </div>
</template>

<script setup lang="ts">
import { computed, type PropType, ref } from 'vue'
import { BContainer, BRow, BCol } from 'bootstrap-vue-next'
import { isPrerender } from '@/prerender'
import { type BackgroundKeys, backgroundImage } from '@/images'

const props = defineProps({
  images: {
    type: [String, Array] as PropType<BackgroundKeys | string[]>,
    required: true,
  },
  height: {
    type: Number,
    default: 600,
  },
})

function refineType<V>(sources: {[k: string]: V}): Record<string, V> {
  return sources
}

const loadedImages = computed(() => backgroundImage(props.images))
const placeholderImage = computed(() => loadedImages.value.dataPlaceholder)

const imageToUse = ref<string>()
const switched = ref(false)

function switchImage(event: Event) {
  if (!isPrerender) {
    const target = event.target as HTMLImageElement
    imageToUse.value = target.currentSrc ?? target.src
    switched.value = true
  }
}
</script>
