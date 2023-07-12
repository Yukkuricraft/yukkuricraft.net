<template>
  <article>
    <header>
      <h1>{{ post.title }}</h1>
      <div class="byline">
        <p>
          By: {{ post.poster }}
          <staff-avatar :size="32" :staff-member="post.poster" :avatar-loc="posters[post.poster].avatar"></staff-avatar>
        </p>
        <p>Posted: {{ localizedPostedTime }}</p>
      </div>
    </header>

    <announcement-post-content :post="post"></announcement-post-content>
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useHead } from '@unhead/vue'
import posters from '../../../content/announcements/posters.yaml'
import StaffAvatar from '../../components/StaffAvatar.vue'
import AnnouncementPostContent from './AnnouncementPostContent.vue'
import { removeExtension } from '@/files'
import { makeMeta } from '@/pageHelpers'

const props = defineProps({
  post: {
    type: Object,
    required: true,
  },
})

const postSlug = computed(() => props.post.slug || removeExtension(props.post.file, '.md'))

const localizedPostedTime = computed(() =>
  new Date(props.post.time).toLocaleString(undefined, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }),
)

useHead(
  makeMeta({
    title: computed(() => 'YukkuriCraft - ' + props.post.title),
    description: computed(() => props.post.excerpt),
    url: computed(() => `announcements/${postSlug.value}/`),
  }),
)
</script>
