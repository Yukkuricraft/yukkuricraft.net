<template>
  <h1>Announcements</h1>
  <ul class="list-unstyled">
    <li v-for="post in announcementPosts" :key="post.file" class="mb-3">
      <announcement-excerpt :heading-level="2" :post="post" />
    </li>
  </ul>
</template>

<script setup lang="ts">
import { useMeta } from 'vue-meta'
import announcementPosts from '../../../generated/announcementList.json'
import AnnouncementExcerpt from './AnnouncementExcerpt.vue'
import { makeMeta } from '@/pageHelpers'

useMeta(
  makeMeta({
    title: 'YukkuriCraft - Announcements',
    description: "See what's happening in the community.",
    url: 'announcements/',
  }),
)
</script>
