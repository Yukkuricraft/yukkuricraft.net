<template>
  <b-avatar variant="primary" :size="size" :text="staffMember.substring(0, 1)">
    <img
      v-if="staffAvatar && staffAvatar.loaded && staffAvatar.avatar"
      loading="lazy"
      class="b-avatar-img"
      :src="staffAvatar.avatar"
      :alt="staffMember"
    />
    <span v-else class="b-avatar-text" style="font-size: 40px">
      {{ staffMember.substring(0, 1) }}
    </span>
  </b-avatar>
</template>

<script>
import { BAvatar } from 'bootstrap-vue'

import { staffAvatar } from '../images'

export default {
  components: {
    BAvatar,
  },
  props: {
    staffMember: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      required: true,
    },
    quality: String,
    avatarLoc: String,
  },
  data() {
    return {
      staffAvatar: {
        loaded: false,
        avatar: null,
      },
    }
  },
  watch: {
    staffMember: {
      immediate: true,
      async handler() {
        await this.loadAvatar()
      },
    },
  },
  serverPrefetch() {
    return this.loadAvatar()
  },
  methods: {
    async loadAvatar() {
      if (this.avatarLoc) {
        this.staffAvatar.loaded = false
        this.staffAvatar.avatar = await staffAvatar(this.avatarLoc, this.quality)
        this.staffAvatar.loaded = true
      }
    },
  },
}
</script>
