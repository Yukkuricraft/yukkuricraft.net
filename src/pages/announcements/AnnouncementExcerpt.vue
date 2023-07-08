<template>
  <b-card>
    <b-media>
      <template #aside>
        <staff-avatar :size="64" :staff-member="post.poster" :avatar-loc="posters[post.poster].avatar"></staff-avatar>
      </template>

      <configurable-heading :level="headingLevel" class="h3">
        <router-link :to="{ path: `/announcements/${post.slug || removeExtension(post.file, '.md')}/` }">
          {{ post.title }}
        </router-link>
      </configurable-heading>
      <div class="byline">
        <p>By: {{ post.poster }}</p>
        <p>Posted: {{ localizedPostedTime }}</p>
      </div>
      <p>
        {{ post.excerpt }}
      </p>
    </b-media>
  </b-card>
</template>

<script>
import { BCard, BMedia } from 'bootstrap-vue'
import posters from '../../../content/announcements/posters.yaml'
import ConfigurableHeading from '../../components/ConfigurableHeading'
import StaffAvatar from '../../components/StaffAvatar'

import { removeExtension } from '../../files'

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
      required: true,
    },
  },
  computed: {
    posters() {
      return posters
    },
    localizedPostedTime() {
      return new Date(this.post.time).toLocaleString(undefined, {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    },
  },
  methods: {
    removeExtension,
  },
}
</script>
