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
      <li v-for="post in announcementPosts" :key="post.file" class="mb-3">
        <announcement-excerpt :heading-level="2" :post="post" />
      </li>
    </ul>
  </normal-page>
</template>

<script>
import NormalPage from '../../layout/NormalPage'
import HeadfulWrap from '../../components/HeadfulWrap'
import announcementList from '../../../generated/announcementList.json'
import AnnouncementExcerpt from './AnnouncementExcerpt'

export default {
  components: {
    HeadfulWrap,
    AnnouncementExcerpt,
    NormalPage,
  },
  computed: {
    announcementPosts() {
      return announcementList
    },
  },
}
</script>
