<template>
  <normal-page>
    <vue-headful
      title="YukkuriCraft - Announcements"
      description="See what's happening in the community."
      :image="require('../../favicon_upscaled.png')"
      url="https://yukkuricraft.net/announcements/"
    />

    <h1>Announcements</h1>
    <ul class="list-unstyled">
      <template v-for="post in posts">
        <li v-if="post" :key="post.slug || post.attributes.title" class="mb-3">
          <announcement-excerpt :heading-level="2" :post="post.post" :post-slug="post.slug"></announcement-excerpt>
        </li>
      </template>
    </ul>
  </normal-page>
</template>

<script>
import debounce from 'lodash/debounce'
import NormalPage from '../../layout/NormalPage'
import announcementList from '../../../content/announcements/announcementList.yaml'
import { removeExtension } from '../../files'
import AnnouncementExcerpt from './AnnouncementExcerpt'

export default {
  components: {
    AnnouncementExcerpt,
    NormalPage,
  },
  data() {
    return {
      posts: [],
      postsLoaded: 0,
    }
  },
  created() {
    this.loadPosts()
    window.addEventListener('scroll', this.scrollLoadPosts)
  },
  destroyed() {
    window.removeEventListener('scroll', this.scrollLoadPosts)
  },
  methods: {
    async loadPosts() {
      const maxPosts = announcementList.posts.length
      if (this.posts.length === maxPosts) {
        return
      }

      const newPostCount = Math.min(this.postsLoaded + 5, maxPosts)
      while (this.posts.length < newPostCount) {
        this.posts.push(null)
      }

      const currentPostsLoaded = this.postsLoaded
      for (const [idx, postObj] of announcementList.posts.slice(this.postsLoaded, newPostCount).entries()) {
        const name = removeExtension(postObj.file, '.md')
        const post = (await import(/* webpackChunkName: "announcement" */ `../../../content/announcements/${name}.md`))
          .default
        this.$set(this.posts, currentPostsLoaded + idx, { post, slug: post.slug ?? name })
      }

      this.postsLoaded = newPostCount
    },
    scrollLoadPosts() {
      const debouncedLoadPosts = debounce(this.loadPosts, 200)
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
        debouncedLoadPosts()
      }
    },
  },
}
</script>
