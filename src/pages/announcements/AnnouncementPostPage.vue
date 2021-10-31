<template>
  <normal-page>
    <headful-wrap
      :title="'YukkuriCraft - ' + (postAttributes ? postAttributes.title : postName)"
      :description="postAttributes ? postAttributes.excerpt || null : null"
      :image="require('../../favicon_upscaled.png')"
      :url="`https://yukkuricraft.net/announcements/${postSlug}/`"
    />

    <article>
      <header v-if="postAttributes">
        <h1>{{ postAttributes.title }}</h1>
        <div class="byline">
          <p>
            By: {{ postAttributes.poster }}
            <staff-avatar
              :size="32"
              :staff-member="postAttributes.poster"
              :avatar-loc="posters[postAttributes.poster].avatar"
              quality="icon"
            ></staff-avatar>
          </p>
          <p>Posted: {{ localizedPostedTime }}</p>
        </div>
      </header>

      <announcement-post-content :post-name="postName"></announcement-post-content>
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
import { mapActions } from 'vuex'

import NormalPage from '../../layout/NormalPage'
import HeadfulWrap from '../../components/HeadfulWrap'
import posters from '../../../content/announcements/posters.yaml'
import StaffAvatar from '../../components/StaffAvatar'
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
    postName: {
      type: String,
      required: true,
    },
    postSlug: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      postComponent: null,
    }
  },
  computed: {
    postAttributes() {
      return this.$store.state.announcements.postsByName[this.postName]?.attributes
    },
    posters() {
      return posters
    },
    localizedPostedTime() {
      return new Date(this.postAttributes.time).toLocaleString(this.$i18n.locale, {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    },
    discourseSrc() {
      const embedUrl = `https://yukkuricraft.net/announcements/${this.postSlug}/`
      const posterName = this.postAttributes.poster
      const poster = posters[posterName]?.discourseUser ?? defaultPoster
      return `${discourseUrl}/embed/comments?embed_url=${embedUrl}&discourse_username=${poster}`
    },
  },
  async serverPrefetch() {
    await this.loadPostAttributes()
  },
  async created() {
    if (!this.postAttributes) {
      await this.loadPostAttributes()
    }
  },
  mounted() {
    window.addEventListener('message', this.postMessageReceived, false)
  },
  destroyed() {
    window.removeEventListener('message', this.postMessageReceived, false)
  },
  methods: {
    ...mapActions('announcements', ['loadPost']),
    async loadPostAttributes() {
      await this.loadPost({ name: this.postName })
    },
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
