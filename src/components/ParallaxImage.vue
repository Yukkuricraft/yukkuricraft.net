<template>
  <div class="parallax-wrapper" :style="{ height: height + 'vh' }">
    <div
      class="parallax"
      :class="{ 'parallax-blur': !switched }"
      :style="{ height: height + 'vh', 'background-image': `url(${imageToUse || placeholderImage})` }"
    ></div>

    <div :style="{ height: height + 'vh' }" class="parallax-foreground">
      <div class="container" style="height: 100%">
        <div class="columns has-text-centered is-align-items-center" style="height: 100%">
          <div class="column is-2"></div>
          <div class="column parallax-text">
            <slot></slot>
          </div>
          <div class="column is-2"></div>
        </div>
      </div>
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
import { isPrerender } from '@/prerender'
import { type BackgroundKeys, backgroundImage } from '@/images'

const props = defineProps({
  images: {
    type: [String, Array] as PropType<BackgroundKeys | string[]>,
    required: true,
  },
  height: {
    type: Number,
    default: 64,
  },
})

function refineType<V>(sources: { [k: string]: V }): Record<string, V> {
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
