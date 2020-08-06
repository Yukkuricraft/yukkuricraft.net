<template>
  <div>
    <heading :id="'location-' + locationId" :level="3 + depth">{{ location.displayName }}</heading>
    <markdown-lazy :content="location.description"></markdown-lazy>

    <location
      v-for="(subLocation, subLocationId) in location.sublocations"
      :key="subLocationId"
      :depth="depth + 1"
      :location-id="subLocationId"
      :location="subLocation"
    />
    <div v-if="location.images">
      <h5>Images</h5>
      <!-- https://startbootstrap.com/snippets/thumbnail-gallery/ -->
      <!-- https://css-tricks.com/creating-a-modal-image-gallery-with-bootstrap-components/ -->
      <b-row v-b-modal="'locationModal-' + locationId">
        <b-col v-for="(image, i) in loadedImages" :key="i" md="4" sm="6" cols="12">
          <div v-if="image.loaded" class="d-block mb-4 h-100" @click="slide = i">
            <picture>
              <source :srcset="image.lowResWebp" type="image/webp" />
              <source :srcset="image.lowRes" type="image/jpeg" />

              <img class="img-fluid img-thumbnail" loading="lazy" :src="image.lowRes" :alt="image.name" />
            </picture>
          </div>
          <div v-else class="d-block mb-4 h-100">
            <font-awesome-icon :icon="['fas', 'spinner']" spin size="2x" />
          </div>
        </b-col>
      </b-row>

      <b-modal
        :id="'locationModal-' + locationId"
        ok-only
        ok-variant="secondary"
        ok-title="Close"
        title="Images"
        size="xl"
        centered
      >
        <b-carousel :id="'locationCarousel-' + locationId" v-model="slide" controls class="mt-5" :interval="0">
          <b-carousel-slide
            v-for="image in loadedImages"
            :key="image.name"
            :caption="image.title"
            :text="image.description"
          >
            <template #img>
              <picture>
                <source :srcset="image.highResWebp" type="image/webp" />
                <source :srcset="image.highRes" type="image/jpeg" />

                <img class="d-block img-fluid w-100" loading="lazy" :src="image.highRes" :alt="image.name" />
              </picture>
            </template>
          </b-carousel-slide>
        </b-carousel>
      </b-modal>
    </div>
  </div>
</template>

<script>
import { BRow, BCol, BModal, VBModal, BCarousel, BCarouselSlide } from 'bootstrap-vue'

import Heading from '../../components/Heading'
import MarkdownLazy from '../../components/MarkdownLazy'

import { makeImage } from '../../images'

export default {
  name: 'Location',
  components: {
    MarkdownLazy,
    Heading,
    BRow,
    BCol,
    BModal,
    BCarousel,
    BCarouselSlide,
  },
  directives: {
    'b-modal': VBModal,
  },
  props: {
    locationId: {
      type: String,
      required: true,
    },
    location: {
      type: Object,
      required: true,
    },
    depth: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      loadedImages: [],
      slide: 0,
    }
  },
  watch: {
    location: {
      immediate: true,
      handler() {
        this.loadImages()
      },
    },
  },
  methods: {
    autoBuildImage(name) {
      return Promise.all([
        import(/* webpackMode: "eager" */ `../../../generated/builds/${name}.jpeg`),
        import(/* webpackMode: "eager" */ `../../../generated/builds/${name}_thumbnail.jpeg`),
        import(/* webpackMode: "eager" */ `../../../generated/builds/${name}.webp`),
        import(/* webpackMode: "eager" */ `../../../generated/builds/${name}_thumbnail.webp`),
      ]).then(([big, small, bigWebp, smallWebp]) => {
        return makeImage(big.default, bigWebp.default, small.default, smallWebp.default)
      })
    },
    loadImages() {
      if (this.location.images) {
        for (const [i, image] of this.location.images.entries()) {
          this.$set(this.loadedImages, i, { loaded: false })

          this.autoBuildImage(image.name).then((obj) => {
            this.$set(this.loadedImages, i, {
              ...image,
              ...obj,
              loaded: true,
            })
          })
        }
      }
    },
  },
}
</script>
