<template>
  <b-navbar-nav class="mr-auto">
    <template v-for="navlink in navlinks">
      <b-nav-item-dropdown
        v-if="'subpages' in navlink"
        :key="navlink.id"
        :class="[navlink.subpages.some(hasMatchingSubpage($route.name)) && 'active']"
        :text="navlink.name"
      >
        <router-link
          v-for="subpage in navlink.subpages"
          :key="destinationKey(subpage)"
          v-slot="{ href, navigate, isExactActive }"
          :to="subpage.to"
        >
          <b-dropdown-item :class="[isExactActive && 'active']" :href="href" @click="navigate">
            {{ subpage.name }}
          </b-dropdown-item>
        </router-link>
      </b-nav-item-dropdown>
      <router-link v-else :key="navlink.name" v-slot="{ href, navigate, isExactActive }" :to="navlink.to">
        <b-nav-item :class="[isExactActive && 'active']" :href="href" @click="navigate">
          {{ navlink.name }}
        </b-nav-item>
      </router-link>
    </template>
  </b-navbar-nav>
</template>

<script setup lang="ts">
import { BNavbarNav, BNavItem, BNavItemDropdown, BDropdownItem } from 'bootstrap-vue-next'
import navlinks, { type NavlinkDestination } from './navlinks'

function hasMatchingSubpage(matchAgainst: string | symbol | null | undefined) {
  return function (v: NavlinkDestination) {
    return typeof v.to === 'object' && 'name' in v.to && v.to.name === matchAgainst
  }
}

function destinationKey(v: NavlinkDestination): string | symbol {
  const to = v.to
  if (typeof to === 'object') {
    return ('name' in to && to.name) || ('path' in to && to.path) || JSON.stringify(to)
  } else {
    return to
  }
}
</script>
