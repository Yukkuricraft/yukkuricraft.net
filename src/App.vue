<template>
  <div
    class="sidebar-wrapper"
  >
    <aside style="overflow: initial">
      <div
        ref="sidebar"
        class="sidebar"
        :class="{
          'is-sidebar-hidden': sidebarHidden && sidebarChanged,
          'is-sidebar-active': !sidebarHidden && sidebarChanged,
        }"
        style="position: sticky; top: 52px"
      >
        <div class="sidebar-menu">
          <div><router-view name="sidebar" /></div>
        </div>
      </div>
    </aside>

    <div class="sidebar-content site">
      <InfoHeader>
        <template #top>
          <button
            class="has-text-white p-2 ml-5"
            aria-controls="sidebar-nav"
            type="button"
            :aria-expanded="!sidebarHidden"
            aria-label="Toggle sidebar"
            @click="toggleSidebar()"
          >
            <font-awesome-icon :icon="['fas', 'align-left']" />
          </button>
        </template>
      </InfoHeader>

      <parallax-image
        v-if="route.meta.parallaxImage"
        :height="route.meta.parallaxHeight"
        :images="route.meta.parallaxImage"
      >
        <router-view name="parallax" />
      </parallax-image>

      <div class="section site-content">
        <div id="contentRoot" class="container" :class="route.meta.isError ? 'container-error' : ''">
          <router-view />
        </div>
      </div>

      <info-footer class="mt-5" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watchPostEffect } from 'vue'

import { useRoute } from 'vue-router'
import InfoHeader from '@/components/navbar/InfoHeader.vue'
import InfoFooter from '@/components/InfoFooter.vue'
import ParallaxImage from '@/components/ParallaxImage.vue'

const sidebar = ref<HTMLElement | null>(null)
const sidebarHidden = ref(false)
const sidebarChanged = ref(false)

watchPostEffect(() => {
  if (sidebar.value && !sidebarChanged.value) {
    sidebarHidden.value = getComputedStyle(sidebar.value).display === 'none'
  }
})

function toggleSidebar() {
  sidebarHidden.value = !sidebarHidden.value
  sidebarChanged.value = true
}

const route = useRoute()
</script>
