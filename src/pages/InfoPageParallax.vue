<template>
  <h1>Yukkuricraft</h1>
  <p>The largest english Touhou Minecraft server.</p>
  <p class="lead">Server IP: mc.yukkuricraft.net</p>
  <p>MC Version: 1.14 - 1.18</p>

  <b-button :to="{ name: 'download_genso' }" variant="primary">Map download</b-button>&nbsp;
  <b-button :to="{ name: 'download_survival' }" variant="primary">Survival download</b-button>
</template>

<script setup lang="ts">
import { BButton } from 'bootstrap-vue-next'
</script>
