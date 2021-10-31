<template>
  <b-card>
    <b-media>
      <template v-if="post && postSlug" #aside>
        <staff-avatar
          :size="64"
          :staff-member="attributes.poster"
          :avatar-loc="posters[attributes.poster].avatar"
          quality="author"
        ></staff-avatar>
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
import { BCard, BMedia } from 'bootstrap-vue'
import posters from '../../../content/announcements/posters.yaml'
import ConfigurableHeading from '../../components/ConfigurableHeading'
import StaffAvatar from '../../components/StaffAvatar'

export default {
  components: {
    StaffAvatar,
    BCard,
    BMedia,
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
  computed: {
    attributes() {
      return this.post.attributes
    },
    posters() {
      return posters
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
}
</script>
