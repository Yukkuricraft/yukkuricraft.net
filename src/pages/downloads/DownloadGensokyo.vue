<template>
  <div class="message is-primary mt-3">
    <div class="message-header">
      <h2 class="is-size-5">Missing and broken features in Vanilla</h2>
    </div>
    <div class="message-body content">
      <p>
        While we try as best we can to give you a great experience, some things might not work correctly. Our
        recommendation is always to explore the map on the server for the best experience. Some things that might break
        include (not an exclusive list):
      </p>
      <ul>
        <li>Grass growing on dirt</li>
        <li>Monsters spawning</li>
        <li>Ice/snow forming and melting</li>
        <li>Portals/teleportation not working</li>
        <li>Vegetation growing</li>
      </ul>
    </div>
  </div>

  <p>
    <strong>CHROME USERS</strong> - Mega is known to have issues downloading on Chrome. If you are using Chrome and
    having difficulty downloading, please temporarily use Firefox or some other browser of your choice to download
    from that link.
  </p>
</template>

<script setup lang="ts">
import { useHead } from '@unhead/vue'
import { makeMeta } from '@/pageHelpers'

useHead(
  makeMeta({
    title: 'YukkuriCraft - Downloads',
    description: 'Download our Gensokyo maps.',
    url: 'downloads/gensokyo/',
  }),
)
</script>
