<template>
  <section>
    <configurable-heading :id="'location-' + locationId" :level="3 + depth">{{
      location.displayName
    }}</configurable-heading>
    <markdown-lazy v-if="location.description" :content="location.description"></markdown-lazy>

    <location-item
      v-for="(subLocation, subLocationId) in refineType<LocationTpe>(location.sublocations)"
      :key="subLocationId"
      :depth="depth + 1"
      :location-id="subLocationId"
      :location="subLocation"
    />
    <div v-if="location.images">
      <h5>Images</h5>
      <!-- https://startbootstrap.com/snippets/thumbnail-gallery/ -->
      <!-- https://css-tricks.com/creating-a-modal-image-gallery-with-bootstrap-components/ -->
      <b-row @click="modalShown = !modalShown">
        <b-col v-for="(image, i) in getImagesWithThumbnails(location.images)" :key="i" md="4" sm="6" cols="12">
          <div class="d-block mb-4 h-100" @click="slide = i">
            <picture>
              <source :srcset="image.lowResWebp" type="image/webp" />
              <source :srcset="image.lowRes" type="image/jpeg" />

              <img class="img-fluid img-thumbnail" loading="lazy" :src="image.lowRes" :alt="image.name" />
            </picture>
          </div>
        </b-col>
      </b-row>

      <b-modal v-model="modalShown" ok-only ok-variant="secondary" ok-title="Close" title="Images" size="xl" centered>
        <template #header>
          <h5 data-ignore-sidebar="true">Images</h5>
        </template>

        <b-carousel :id="'locationCarousel-' + locationId" v-model="slide" controls class="mt-5" :interval="0">
          <b-carousel-slide
            v-for="image in getImagesWithThumbnails(location.images)"
            :key="image.name"
            :caption="image.title"
            :text="image.description"
          >
            <template #img>
              <picture>
                <source :srcset="image.highResWebp" type="image/webp" />
                <source :srcset="image.highRes" type="image/jpeg" />

                <img
                  class="d-block img-fluid w-100"
                  loading="lazy"
                  :src="image.highRes"
                  :alt="image.name"
                  @load="image.loaded = true"
                />
              </picture>
            </template>
          </b-carousel-slide>
        </b-carousel>
      </b-modal>
    </div>
  </section>
</template>

<script setup lang="ts">
import { BRow, BCol, BModal, BCarousel, BCarouselSlide } from 'bootstrap-vue-next'
import { type PropType, ref } from 'vue'

import buildImages from '../../../generated/builds/data'
import { type LocationImage, type Location as LocationTpe } from '../../../content/locations/locationList'
import ConfigurableHeading from '@/components/ConfigurableHeading.vue'

import MarkdownLazy from '@/components/MarkdownLazy.vue'
import {
  makeImageWithThumbnails,
  type ImageWithThumbnails,
  type NestedImageData,
  type SingleNestedImageData,
} from '@/images'

const modalShown = ref(false)

function refineType<V>(sources: { [k: string]: V }): Record<string, V> {
  return sources
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

defineProps({
  locationId: {
    type: String,
    required: true,
  },
  location: {
    type: Object as PropType<LocationTpe>,
    required: true,
  },
  depth: {
    type: Number,
    required: true,
  },
})

const slide = ref(0)
</script>
