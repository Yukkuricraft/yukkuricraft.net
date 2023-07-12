<template>
  <b-card no-body class="bg-secondary-subtle">
    <fake-media>
      <template #aside>
        <staff-avatar
          class="m-2"
          :size="96"
          :staff-member="post.poster"
          :avatar-loc="posters[post.poster].avatar"
        ></staff-avatar>
      </template>

      <b-card-body>
        <b-card-title :id="'post' + (post.slug || removeExtension(post.file, '.md'))" :tag="'h' + headingLevel" class="card-title h4">
          <router-link :to="{ path: `/announcements/${post.slug || removeExtension(post.file, '.md')}/` }">
            {{ post.title }}
          </router-link>
        </b-card-title>

        <b-card-subtitle tag="span" class="byline">
          <p>By: {{ post.poster }}</p>
          <p>Posted: {{ localizedPostedTime }}</p>
        </b-card-subtitle>

        <p>
          {{ post.excerpt }}
        </p>
      </b-card-body>
    </fake-media>
  </b-card>
</template>

<script setup lang="ts">
import { BCard, BCardTitle, BCardSubtitle, BCardBody } from 'bootstrap-vue-next'
import { computed } from 'vue'
import posters from '../../../content/announcements/posters.yaml'
import StaffAvatar from '@/components/StaffAvatar.vue'
import FakeMedia from '@/components/FakeMedia.vue'

import { removeExtension } from '@/files'

const props = defineProps({
  headingLevel: {
    type: Number,
    required: true,
  },
  post: {
    type: Object,
    required: true,
  },
})

const localizedPostedTime = computed(() =>
  new Date(props.post.time).toLocaleString(undefined, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }),
)
</script>
