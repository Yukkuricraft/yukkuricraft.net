<template>
  <section>
    <configurable-heading :id="'location-' + locationId" :level="3 + depth">{{
      location.displayName
    }}</configurable-heading>
    <markdown-lazy v-if="location.description" :content="location.description"></markdown-lazy>

    <location-item
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
  </section>
</template>

<script>
import { BRow, BCol, BModal, VBModal, BCarousel, BCarouselSlide } from 'bootstrap-vue'
import { mapState, mapActions } from 'vuex'

import ConfigurableHeading from '../../components/ConfigurableHeading'
import MarkdownLazy from '../../components/MarkdownLazy'

export default {
  name: 'LocationItem',
  components: {
    MarkdownLazy,
    ConfigurableHeading,
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
  computed: {
    ...mapState('locations', ['imageLocations']),
  },
  watch: {
    location: {
      immediate: true,
      handler() {
        this.loadImages()
      },
    },
  },
  serverPrefetch() {
    return this.loadImages()
  },
  methods: {
    ...mapActions('locations', ['loadLocationImages']),
    loadImages() {
      const res = []

      if (this.location.images) {
        for (const [i, image] of this.location.images.entries()) {
          if (this.loadedImages[i] && this.loadedImages[i].loaded) {
            continue
          }

          let waitForImage
          if (!this.imageLocations[image.name] || this.imageLocations[image.name].length === 0) {
            this.$set(this.loadedImages, i, { loaded: false })
            waitForImage = this.loadLocationImages({ imageName: image.name })
          } else {
            waitForImage = Promise.resolve()
          }

          res.push(
            waitForImage.then(() => {
              this.$set(this.loadedImages, i, {
                ...image,
                ...this.imageLocations[image.name],
                loaded: true,
              })
            })
          )
        }
      }

      return Promise.all(res)
    },
  },
}
</script>
