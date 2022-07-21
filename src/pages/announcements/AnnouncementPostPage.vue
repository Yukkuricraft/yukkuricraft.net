<template>
  <normal-page>
    <headful-wrap
      :title="'YukkuriCraft - ' + post.title"
      :description="post.excerpt"
      :image="require('../../favicon_upscaled.png')"
      :url="`https://yukkuricraft.net/announcements/${postSlug}/`"
    />

    <article>
      <header>
        <h1>{{ post.title }}</h1>
        <div class="byline">
          <p>
            By: {{ post.poster }}
            <staff-avatar
              :size="32"
              :staff-member="post.poster"
              :avatar-loc="posters[post.poster].avatar"
            ></staff-avatar>
          </p>
          <p>Posted: {{ localizedPostedTime }}</p>
        </div>
      </header>

      <announcement-post-content :post-file="post.file"></announcement-post-content>
    </article>

    <div v-if="/*post && postAttributes.comments &&*/ false">
      <h2>Comments</h2>
      <div>
        <iframe
          ref="comments"
          :src="discourseSrc"
          width="100%"
          frameborder="0"
          scrolling="no"
          :height="comments.height"
        ></iframe>
      </div>
    </div>
  </normal-page>
</template>

<script>
import NormalPage from '../../layout/NormalPage'
import HeadfulWrap from '../../components/HeadfulWrap'
import posters from '../../../content/announcements/posters.yaml'
import StaffAvatar from '../../components/StaffAvatar'
import { removeExtension } from '../../files'
import AnnouncementPostContent from './AnnouncementPostContent'

// Discourse information
const discourseUrl = 'https://forums.yukkuricraft.net'
const defaultPoster = 'YukkuriBot'

export default {
  components: {
    StaffAvatar,
    NormalPage,
    HeadfulWrap,
    AnnouncementPostContent,
  },
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  computed: {
    posters() {
      return posters
    },
    postSlug() {
      return this.post.slug || removeExtension(this.post.file, '.md')
    },
    localizedPostedTime() {
      return new Date(this.post.time).toLocaleString(this.$i18n.locale, {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    },
    discourseSrc() {
      const embedUrl = `https://yukkuricraft.net/announcements/${this.postSlug}/`
      const posterName = this.poster
      const poster = posters[posterName]?.discourseUser ?? defaultPoster
      return `${discourseUrl}/embed/comments?embed_url=${embedUrl}&discourse_username=${poster}`
    },
  },
  mounted() {
    window.addEventListener('message', this.postMessageReceived, false)
  },
  destroyed() {
    window.removeEventListener('message', this.postMessageReceived, false)
  },
  methods: {
    // Taken from https://meta.discourse.org/javascripts/embed.js
    findPosY(obj) {
      let top = 0
      if (obj.offsetParent) {
        while (1) {
          top += obj.offsetTop
          if (!obj.offsetParent) {
            break
          }
          obj = obj.offsetParent
        }
      } else if (obj.y) {
        top += obj.y
      }
      return top
    },
    normalizeUrl(url) {
      return url.replace(/^https?(:\/\/)?/, '')
    },
    postMessageReceived(e) {
      if (!e) {
        return
      }
      if (!e.origin || this.normalizeUrl(discourseUrl).indexOf(this.normalizeUrl(e.origin)) === -1) {
        return
      }

      if (e.data) {
        if (e.data.type === 'discourse-resize' && e.data.height) {
          this.$refs.comments = e.data.height + 'px'
        }

        if (e.data.type === 'discourse-scroll' && e.data.top) {
          // find iframe offset
          const destY = this.findPosY(this.$refs.comments) + e.data.top
          window.scrollTo(0, destY)
        }
      }
    },
  },
}
</script>
