<template>
  <h1 class="title is-size-1">Announcements</h1>
  <ul>
    <li v-for="post in announcementPosts" :key="post.file" class="mb-3">
      <announcement-excerpt :heading-level="2" :post="post" />
    </li>
  </ul>
</template>

<script setup lang="ts">
import { useHead } from '@unhead/vue'
import announcementPosts from '@gen/announcementList.json'
import AnnouncementExcerpt from './AnnouncementExcerpt.vue'
import { makeMeta } from '@/pageHelpers'

useHead(
  makeMeta({
    title: 'YukkuriCraft - Announcements',
    description: "See what's happening in the community.",
    url: 'announcements/',
  }),
)
</script>
