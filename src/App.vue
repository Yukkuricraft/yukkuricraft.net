<template>
  <div class="sidebar-wrapper">
    <nav class="sidebar" :class="{ active: sidebarActive }">
      <router-view name="sidebar" />
    </nav>

    <div class="sidebar-content site" :class="{ active: sidebarActive }">
      <info-header :in-container="sidebarActive">
        <template #top>
          <b-button
            class='text-white'
            aria-controls="sidebar-nav"
            type="button"
            variant="link"
            aria-expanded="false"
            aria-label="Toggle sidebar"
            @click="sidebarActive = !sidebarActive"
          >
            <font-awesome-icon :icon="['fas', 'align-left']" />
          </b-button>
        </template>
      </info-header>

      <parallax-image
        v-if="route.meta.parallaxImage"
        :height="route.meta.parallaxHeight"
        :images="route.meta.parallaxImage"
      >
        <router-view name="parallax" />
      </parallax-image>

      <b-container id="contentRoot" class="container-pad site-content" :class="route.meta.isError ? 'container-error' : ''">
        <router-view />

      </b-container>

      <info-footer />
    </div>
  </div>
</template>

<script setup lang="ts">
import { BContainer, BButton } from 'bootstrap-vue-next'
import { ref } from 'vue'

import { useRoute } from 'vue-router'
import InfoHeader from '@/components/InfoHeader.vue'
import InfoFooter from '@/components/InfoFooter.vue'
import ParallaxImage from '@/components/ParallaxImage.vue'

const sidebarActive = ref(false)

const route = useRoute()
</script>
