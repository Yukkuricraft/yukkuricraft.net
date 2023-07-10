<template>
  <b-avatar :variant="staffAvatar ? null : 'primary'" :size="size + 'px'" rounded='circle'>

    <picture v-if="staffAvatar" class='rounded-circle'>
      <source v-for="(srcset, type) in staffAvatar.srcsets" :key="type" :type="type" :srcset="srcset" />
      <img
        loading="lazy"
        class="b-avatar-img"
        :width="size"
        :height="size"
        :src="staffAvatar.default"
        :alt="staffMember"
      />
    </picture>
    <span v-else class="b-avatar-text" style="font-size: 40px">
      {{ staffMember.substring(0, 1) }}
    </span>
  </b-avatar>
</template>

<script setup lang="ts">
import { BAvatar } from 'bootstrap-vue-next'

import { onServerPrefetch, ref, watch } from 'vue'
import { staffAvatar as loadStaffAvatar } from '@/images'

const props = defineProps({
  staffMember: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    required: true,
  },
  avatarLoc: String,
})

const staffAvatar = ref()

async function loadAvatar() {
  if (props.avatarLoc) {
    staffAvatar.value = await loadStaffAvatar(props.avatarLoc, props.size)
  }
}

watch(
  () => props.avatarLoc,
  async () => {
    await loadAvatar()
  },
  { immediate: true },
)

onServerPrefetch(() => loadAvatar())
</script>
