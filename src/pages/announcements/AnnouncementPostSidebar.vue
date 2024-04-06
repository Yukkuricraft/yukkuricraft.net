<template>
  <p class="menu-label m-3">Announcements</p>

  <ul class="menu-list">
    <li v-for="post in announcementPosts" :key="post.file">
      <router-link :to="{ path: postPath(post) }">{{ post.title }}</router-link>
    </li>
  </ul>
</template>

<script setup lang="ts">
import announcementPosts from '@gen/announcementList.json'
import { removeExtension } from '@/files'

interface ListedPostTpe {
  file: string
  title: string
  time: string
  poster: string
  excerpt?: string
  slug?: string
}

function postPath(post: ListedPostTpe) {
  const file = removeExtension(post.file, '.md')
  const slug = post.slug || file
  return `/announcements/${slug}/`
}
</script>
