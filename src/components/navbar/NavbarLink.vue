<template>
  <div v-if="'subpages' in navlink" class="navbar-item has-dropdown is-hoverable">
    <a class="navbar-link has-text-white">{{ navlink.name }}</a>

    <div class="navbar-dropdown">
      <router-link
        v-for="subpage in navlink.subpages"
        :key="destinationKey(subpage)"
        :to="subpage.to"
        class="navbar-item"
        exact-active-class="is-active"
      >
        {{ subpage.name }}
      </router-link>
    </div>
  </div>
  <router-link v-else :to="navlink.to" class="navbar-item has-text-white" exact-active-class="is-active">
    {{ navlink.name }}
  </router-link>
</template>

<script setup lang="ts">
import { type PropType } from 'vue'
import { type Navlink, type NavlinkDestination } from '../navlinks'

function destinationKey(v: NavlinkDestination): string | symbol {
  const to = v.to
  if (typeof to === 'object') {
    return ('name' in to && to.name) || ('path' in to && to.path) || JSON.stringify(to)
  } else {
    return to
  }
}

defineProps({
  navlink: {
    type: Object as PropType<Navlink>,
    required: true,
  },
})
</script>
