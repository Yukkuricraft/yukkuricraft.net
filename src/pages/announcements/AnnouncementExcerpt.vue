<template>
  <div class="card">
    <div class="card-content">
      <div class="media">
        <div class="media-left">
          <staff-avatar
            class="m-2"
            :size="96"
            :staff-member="post.poster"
            :avatar-loc="posters[post.poster].avatar"
          ></staff-avatar>
        </div>

        <div class="media-content">
          <ConfigurableHeading
            :id="'post' + (post.slug || removeExtension(post.file, '.md'))"
            :level="headingLevel"
            class="is-size-3"
          >
            <router-link :to="{ path: `/announcements/${post.slug || removeExtension(post.file, '.md')}/` }">
              {{ post.title }}
            </router-link>
          </ConfigurableHeading>

          <div class="byline">
            <p>By: {{ post.poster }}</p>
            <p>Posted: {{ localizedPostedTime }}</p>
          </div>

          <p class="block">
            {{ post.excerpt }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import posters from '@cont/announcements/posters.yaml'
import StaffAvatar from '@/components/StaffAvatar.vue'

import { removeExtension } from '@/files'
import ConfigurableHeading from '@/components/ConfigurableHeading.vue'

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
