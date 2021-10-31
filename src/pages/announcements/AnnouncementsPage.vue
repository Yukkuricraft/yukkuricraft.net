<template>
  <normal-page>
    <headful-wrap
      title="YukkuriCraft - Announcements"
      description="See what's happening in the community."
      :image="require('../../favicon_upscaled.png')"
      url="https://yukkuricraft.net/announcements/"
    />

    <h1>Announcements</h1>
    <ul class="list-unstyled">
      <li v-for="(post, idx) in posts" :key="(post && (post.slug || post.attributes.title)) || idx" class="mb-3">
        <announcement-excerpt :heading-level="2" :post="post && post.post" :post-slug="post && post.slug" />
      </li>
    </ul>
  </normal-page>
</template>

<script>
import debounce from 'lodash/debounce'
import { mapState, mapActions } from 'vuex'
import NormalPage from '../../layout/NormalPage'
import HeadfulWrap from '../../components/HeadfulWrap'
import AnnouncementExcerpt from './AnnouncementExcerpt'

export default {
  components: {
    HeadfulWrap,
    AnnouncementExcerpt,
    NormalPage,
  },
  computed: {
    ...mapState('announcements', ['posts']),
  },
  serverPrefetch() {
    return this.loadPosts()
  },
  async created() {
    if (this.posts.length === 0) {
      await this.loadPosts()
    }
  },
  mounted() {
    window.addEventListener('scroll', this.scrollLoadPosts)
  },
  destroyed() {
    window.removeEventListener('scroll', this.scrollLoadPosts)
  },
  methods: {
    ...mapActions('announcements', ['loadPosts']),
    scrollLoadPosts() {
      const debouncedLoadPosts = debounce(this.loadPosts, 200)
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
        debouncedLoadPosts()
      }
    },
  },
}
</script>
