<template>
  <b-alert :model-value='true' variant="warning" class="mt-3" style="font-size: 85%">
    <h2 class="alert-heading h5">Compatability and old versions</h2>
    <p class="mb-2">
      These maps have never been taken to a newer Minecraft version than what we list here. It might work just fine,
      it might go absolutely terrible. For the best experience, play the map on the version it was intended for.
    </p>
  </b-alert>

  <ul>
    <li>
      <a href="https://mega.nz/file/4kdnXZxB#m3v01SsD_ZKmjRdQBxnCdHBnvaG8wzcXKZuciJ1z7hw"
      >Survival 1: 1.6 (2012-2014)</a
      >
    </li>
    <li>
      <a href="https://mega.nz/file/QgtwhbwJ#5nxZBAWxpCAjk4el5nuVDylCs1RqWzQT3WFtQj8mIOo"
      >Survival 2 (Neo Survival): 1.8 (2014-2016)</a
      >
    </li>
    <li>
      <a href="https://mega.nz/folder/89dTzKTT#H-PpWty0lNUwaQi9lRFOlw"
      >Survival 3 (Nova Survival): 1.12 (2016-2019)</a
      >
    </li>
  </ul>

  <p>
    <strong>CHROME USERS</strong> - Mega is known to have issues downloading on Chrome. If you are using Chrome and
    having difficulty downloading, please temporarily use Firefox or some other browser of your choice to download
    from that link.
  </p>
</template>

<script setup lang='ts'>
import { BAlert } from 'bootstrap-vue-next'

import { useHead } from '@unhead/vue'
import { makeMeta } from '@/pageHelpers'

useHead(makeMeta({
  title: 'YukkuriCraft - Survival Downloads',
  description: 'Download our survival maps.',
  url: 'downloads/survival/'
}))
</script>
