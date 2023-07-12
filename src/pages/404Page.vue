<template>
  <img src="./confused_remi_yukkuri.png" alt="Lost Yukkuri" />
  <h1>404 Not Found</h1>
  <h2>We couldn't find {{ requestUri }}.</h2>
  <br />
  <br />
  <h2>
    Maybe you intend to go to our forums at <a :href="forumUri">{{ forumUri }}</a
  >?
  </h2>
</template>

<script setup lang="ts">
import { useHead } from '@unhead/vue'

import { makeMeta } from '@/pageHelpers'

useHead(
  makeMeta({
    title: 'YukkuriCraft - 404 Not found',
    description: "We couldn't find what you were looing for.",
    url: null,
  }),
)

const requestUri = typeof window !== 'undefined' ? window.location.pathname : ''
const forumUri = 'https://forums.yukkuricraft.net' + requestUri
</script>
