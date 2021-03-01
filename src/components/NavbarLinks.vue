<template>
  <b-navbar-nav class="mr-auto">
    <template v-for="navlink in navlinks">
      <b-nav-item-dropdown
        v-if="navlink.subpages"
        :key="navlink.id || navlink.name"
        :class="[navlink.subpages.some((v) => v.to.name && v.to.name === $route.name) && 'active']"
        :text="navlink.name"
      >
        <router-link
          v-for="subpage in navlink.subpages"
          :key="subpage.to.name || subpage.to.path || JSON.stringify(subpage.to)"
          v-slot="{ href, navigate, isExactActive }"
          :to="subpage.to"
        >
          <b-dropdown-item :class="[isExactActive && 'active']" :href="href" @click="navigate">
            {{ subpage.name }}
          </b-dropdown-item>
        </router-link>
      </b-nav-item-dropdown>
      <router-link v-else :key="navlink.id || navlink.name" v-slot="{ href, navigate, isExactActive }" :to="navlink.to">
        <b-nav-item :class="[isExactActive && 'active']" :href="href" @click="navigate">
          {{ navlink.name }}
        </b-nav-item>
      </router-link>
    </template>
  </b-navbar-nav>
</template>

<script>
import { BNavbarNav, BNavItem, BNavItemDropdown, BDropdownItem } from 'bootstrap-vue'

import navlinks from './navlinks'

export default {
  components: {
    BNavbarNav,
    BNavItem,
    BNavItemDropdown,
    BDropdownItem,
  },
  computed: {
    navlinks() {
      return navlinks
    },
  },
}
</script>
