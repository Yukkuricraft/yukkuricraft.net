<template>
  <div class="sidebar-header">
    <p>Announcements</p>
  </div>

  <ul>
    <li v-for="post in announcementPosts" :key="post.file">
      <router-link class="text-no-underline" :to="{ path: postPath(post) }">{{
        post.title
      }}</router-link>
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
