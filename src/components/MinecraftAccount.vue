<template>
  <span v-tippy="collapse ? { content: realName, theme: 'yukkuricraft' } : null" class="m-1">
    <img
      loading="lazy"
      :src="`https://mc-heads.net/avatar/${uuid ?? name}/32`"
      width="32"
      height="32"
      :alt="realName"
      style="vertical-align: middle"
    />&nbsp;
    <span v-if="!collapse">{{ realName }}</span>
  </span>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { directive as vTippy } from 'vue-tippy'

const props = defineProps({
  uuid: String,
  name: {
    type: String,
    required: true,
  },
  fetchUsernameFromUuid: Boolean,
  collapse: Boolean,
})

const realName = ref(props.name)

watchEffect(async () => {
  const doFetch = props.fetchUsernameFromUuid
  const uuid = props.uuid
  const name = props.name

  realName.value = name
  if (uuid && doFetch) {
    realName.value = await fetchMcUsername(uuid, name)
  }
})

async function fetchMcUsername(uuid: string, fallback: string) {
  const errorMsg = `Failed to get name for uuid ${uuid}, using fallback ${fallback} instead`

  try {
    const res = await fetch('https://api.minetools.eu/uuid/' + uuid.replaceAll('-', ''))

    if (res.status !== 200) {
      // eslint-disable-next-line no-console
      console.warn(errorMsg)
      return fallback
    } else {
      const profile = await res.json()

      if (typeof profile.error !== 'undefined') {
        // eslint-disable-next-line no-console
        console.warn(errorMsg + '. Error: ' + profile.error)
        return fallback
      } else {
        return profile.name
      }
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn(errorMsg + '. Error: ' + e)
    return fallback
  }
}
</script>
