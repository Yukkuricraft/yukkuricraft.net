<template>
  <b-avatar :variant="staffAvatar ? undefined : 'primary'" :size="size">
    <img v-if="staffAvatar" loading="lazy" class="b-avatar-img" :src="staffAvatar" :alt="staffMember" />
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
      staffAvatar: null,
    }
  },
  watch: {
    avatarLoc: {
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
        this.staffAvatar = await staffAvatar(this.avatarLoc, this.quality)
      }
    },
  },
}
</script>
