<template>
  <h5 class="title is-size-5">Images</h5>
  <div class="columns is-multiline">
    <div v-for="(image, i) in imageThumbnails" :key="locationId + '_' + i" class="column is-6-tablet is-4-desktop">
      <div class="mb-4 is-display-block is-clickable" style="height: 100%" @click="gotoSlide(i)">
        <picture-with-webp :image="image.lowRes" :title="image.title" @load="image.lowRes.loaded = true" />
      </div>
    </div>
  </div>

  <div :id="'locationCarousel-' + locationId" ref="carousel" class="glide">
    <div class="glide__track" data-glide-el="track">
      <ul class="glide__slides">
        <li v-for="image in imageThumbnails" :key="image.name" class="glide__slide">
          <picture-with-webp :image="image.highRes" :title="image.title" @load="imageLoaded(image.highRes)" />
        </li>
      </ul>

      <div class="glide__arrows" data-glide-el="controls">
        <button class="glide__arrow glide__arrow--left" data-glide-dir="<">prev</button>
        <button class="glide__arrow glide__arrow--right" data-glide-dir=">">next</button>

        <div class="glide-caption">{{ imageThumbnails && imageThumbnails[slide].title }}</div>
        <div class="has-text-centered">{{ imageThumbnails && imageThumbnails[slide].description }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onUnmounted, type PropType, reactive, ref, watch, watchEffect } from 'vue'
import { type LocationImage } from '@gen/locations/locationList'
import buildImages from '@gen/builds/data'
import Glide, { Images, Controls, Keyboard, Swipe } from '@glidejs/glide/dist/glide.modular.esm'
import PictureWithWebp from '@/pages/imageLocations/PictureWithWebp.vue'
import {
  type ImageWithThumbnails,
  makeImageWithThumbnails,
  type NestedImageData,
  type SingleNestedImageData,
  type PictureWithWebp as PictureWithWebpTpe,
} from '@/images'

const props = defineProps({
  images: {
    type: Array as PropType<LocationImage[]>,
    required: true,
  },
  locationId: {
    type: String,
    required: true,
  },
})

const carousel = ref<HTMLElement | null>(null)
const glideObj = ref<Glide | null>(null)

watch(carousel, (v) => {
  if (!v) {
    return
  }

  if (glideObj.value) {
    glideObj.value.destroy()
  }

  const g = new Glide(v, { perView: 1, autoplay: false })

  g.on('run', () => {
    slide.value = g.index
  })
  g.mount({ Images, Controls, Keyboard, Swipe })

  glideObj.value = g
})

const slide = ref(0)

onUnmounted(() => {
  glideObj.value?.destroy()
  glideObj.value = null
})

watch(slide, (v) => {
  glideObj.value?.go(`=${v}`)
})

const imageThumbnails = ref<(LocationImage & ImageWithThumbnails)[] | null>()

watchEffect(() => {
  imageThumbnails.value = reactive(getImagesWithThumbnails(props.images))
})

function gotoSlide(i: number) {
  slide.value = i
}

function imageLoaded(image: PictureWithWebpTpe) {
  image.loaded = true
}

function buildImagesForPath(path: string) {
  const pathParts = path.split('/')

  let obj = buildImages as unknown as NestedImageData
  let key
  while ((key = pathParts.shift())) {
    obj = obj[key] as NestedImageData
  }

  return obj as SingleNestedImageData
}

function getImagesWithThumbnails(images: LocationImage[]): (LocationImage & ImageWithThumbnails)[] {
  const copy = []

  for (let i = 0; i < images.length; i++) {
    copy[i] = { ...images[i], ...makeImageWithThumbnails(buildImagesForPath(images[i].name)) }
  }

  return copy
}
</script>
