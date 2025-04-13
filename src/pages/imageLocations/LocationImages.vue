<template>
  <h5 class="title is-size-5">Images</h5>
  <div class="columns is-multiline">
    <div v-for="(image, i) in imageThumbnails" :key="locationId + '_' + i" class="column is-6-tablet is-4-desktop">
      <div class="mb-4 is-display-block is-clickable" style="height: 100%" @click="gotoSlide(i)">
        <picture-with-webp :image="image.lowRes" :title="image.title" @load="image.lowRes.loaded = true" />
      </div>
    </div>
  </div>

  <div :id="'locationCarousel-' + locationId" ref="carousel" class="splide">
    <div class="splide__track">
      <ul class="splide__list">
        <li v-for="image in imageThumbnails" :key="image.name" class="splide__slide">
          <picture-with-webp :image="image.highRes" :title="image.title" @load="imageLoaded(image.highRes)" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  onBeforeUnmount,
  type PropType,
  reactive,
  ref,
  useTemplateRef,
  watch,
  watchEffect,
} from 'vue'
import { type LocationImage } from '@gen/locations/locationList'
import buildImages from '@gen/builds/data'
import PictureWithWebp from '@/pages/imageLocations/PictureWithWebp.vue'
import {
  type ImageWithThumbnails,
  makeImageWithThumbnails,
  type NestedImageData,
  type SingleNestedImageData,
  type PictureWithWebp as PictureWithWebpTpe,
} from '@/images'
import Splide from '@splidejs/splide'

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

const carousel = useTemplateRef<HTMLDivElement>('carousel')
const splideObj = ref<Splide | null>(null)

const slide = ref(0)

watch(carousel, (v) => {
  if (!v) {
    return
  }

  if (splideObj.value) {
    splideObj.value.destroy(true)
  }

  const s = new Splide(v, { rewind: true })
  s.on('moved', (newIndex: number) => {
    slide.value = newIndex
  })
  s.mount()
  console.log('Splide mounted', s)

  splideObj.value = s
})

onBeforeUnmount(() => {
  if (splideObj.value) {
    splideObj.value.destroy(true)
    splideObj.value = null
  }
})

watch(slide, (v) => {
  splideObj.value?.go(v)
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
