<template>
  <h1 class="title is-size-2 has-text-white">Yukkuricraft</h1>
  <p class="subtitle has-text-white">The largest english Touhou Minecraft server.</p>
  <p class="block">Server IP: mc.yukkuricraft.net</p>
  <p class="block">MC Server Version: 1.21.1</p>
  <p class="block">MC Client Compatible Versions: 1.21.1+</p>


  <div class="block">
    <router-link class="has-text-white button is-primary" :to="{ name: 'download_genso' }"> Map download </router-link
    >&nbsp;
    <router-link class="has-text-white button is-primary" :to="{ name: 'download_survival' }">
      Survival download
    </router-link>
  </div>
</template>

<script setup lang="ts"></script>
