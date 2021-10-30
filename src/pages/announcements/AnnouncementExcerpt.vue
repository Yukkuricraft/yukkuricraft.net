<template>
  <b-card>
    <b-media>
      <template v-if="post && postSlug" #aside>
        <b-avatar variant="primary" size="64" :text="attributes.poster.substring(0, 1)" :src="posterAvatar"></b-avatar>
      </template>

      <template v-if="post && postSlug">
        <configurable-heading :level="headingLevel" class="h3">
          <router-link :to="{ path: `/announcements/${postSlug}/` }">{{ attributes.title }}</router-link>
        </configurable-heading>
        <div class="byline">
          <p>By: {{ attributes.poster }}</p>
          <p>Posted: {{ localizedPostedTime }}</p>
        </div>
        <p>
          {{ attributes.excerpt }}
        </p>
      </template>
      <template v-else>
        <font-awesome-icon class="d-block m-auto" :icon="['fas', 'spinner']" spin size="4x" />
      </template>
    </b-media>
  </b-card>
</template>

<script>
import { BCard, BMedia, BAvatar } from 'bootstrap-vue'
import posters from '../../../content/announcements/posters.yaml'
import ConfigurableHeading from '../../components/ConfigurableHeading'
import { staffAvatar } from '../../images'

export default {
  components: {
    BCard,
    BMedia,
    BAvatar,
    ConfigurableHeading,
  },
  props: {
    headingLevel: {
      type: Number,
      required: true,
    },
    post: {
      type: Object,
      required: false,
    },
    postSlug: {
      type: String,
      required: false,
    },
  },
  data() {
    return {
      posterAvatar: null,
    }
  },
  computed: {
    attributes() {
      return this.post.attributes
    },
    localizedPostedTime() {
      return new Date(this.post.attributes.time).toLocaleString(this.$i18n.locale, {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    },
  },
  watch: {
    post: {
      immediate: true,
      handler(val) {
        if (val) {
          this.loadPosterAvatar()
        }
      },
    },
  },
  methods: {
    async loadPosterAvatar() {
      const posterName = this.post.attributes.poster
      if (posters[posterName] && posters[posterName].avatar) {
        this.posterAvatar = await staffAvatar(posters[posterName].avatar, 'author')
      }
    },
  },
}
</script>
