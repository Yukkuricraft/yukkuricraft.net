<template>
  <div
    class="image has-text-centered"
    :style="{
      'background-color': staffAvatar
        ? undefined
        : 'hsl(var(--bulma-primary-h), var(--bulma-primary-s), var(--bulma-primary-l))',
    }"
    :class="'is-' + size + 'x' + size"
    style="
      border-radius: var(--bulma-radius-rounded);
      display: inline-flex;
      align-items: center;
      justify-content: center;
    "
  >
    <picture v-if="staffAvatar">
      <source
        v-for="(srcset, type) in refineType<string>(staffAvatar.srcsets)"
        :key="type"
        :type="type"
        :srcset="srcset"
      />
      <img
        loading="lazy"
        class="is-rounded"
        :width="size"
        :height="size"
        :src="staffAvatar.default"
        :alt="staffMember"
      />
    </picture>
    <span v-else style="font-size: 40px">
      {{ staffMember.substring(0, 1) }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { onServerPrefetch, ref, watch } from 'vue'
import { staffAvatar as loadStaffAvatar } from '@/images'

function refineType<V>(sources: { [k: string]: V }): Record<string, V> {
  return sources
}

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
