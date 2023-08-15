<template>
  <h5>Images</h5>
  <!-- https://startbootstrap.com/snippets/thumbnail-gallery/ -->
  <!-- https://css-tricks.com/creating-a-modal-image-gallery-with-bootstrap-components/ -->
  <b-row @click="modalShown = !modalShown">
    <b-col v-for="(image, i) in imageThumbnails" :key="locationId + '_' + i" md="4" sm="6" cols="12">
      <div class="d-block mb-4 h-100" @click="slide = i">
        <picture-with-webp :image="image.lowRes" :title="image.title" @load="image.lowRes.loaded = true" />
      </div>
    </b-col>
  </b-row>

  <b-modal v-model="modalShown" ok-only ok-variant="secondary" ok-title="Close" title="Images" size="xl" centered>
    <template #header>
      <h5 data-ignore-sidebar="true">Images</h5>
    </template>

    <b-carousel :id="'locationCarousel-' + locationId" v-model="slide" controls class="mt-5" :interval="0">
      <b-carousel-slide
        v-for="image in imageThumbnails"
        :key="image.name"
        :caption="image.title"
        :text="image.description"
      >
        <template #img>
          <picture-with-webp :image="image.highRes" :title="image.title" @load="image.highRes.loaded = true" />
        </template>
      </b-carousel-slide>
    </b-carousel>
  </b-modal>
</template>

<script setup lang="ts">
import { BCarousel, BCarouselSlide, BCol, BModal, BRow } from 'bootstrap-vue-next'
import {type PropType, reactive, ref, watchEffect} from 'vue'
import { type LocationImage } from '@cont/locations/locationList'
import buildImages from '@gen/builds/data'
import PictureWithWebp from '@/pages/imageLocations/PictureWithWebp.vue'
import {
  type ImageWithThumbnails,
  makeImageWithThumbnails,
  type NestedImageData,
  type SingleNestedImageData,
} from '@/images'

const props = defineProps({
  images: {
    type: Array as PropType<LocationImage[]>,
    required: true,
  },
  locationId: {
    type: String,
    required: true
  }
})

const modalShown = ref(false)
const slide = ref(0)

const imageThumbnails = ref<(LocationImage & ImageWithThumbnails)[] | null>()

watchEffect(() => {
  imageThumbnails.value = reactive(getImagesWithThumbnails(props.images))
})

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
