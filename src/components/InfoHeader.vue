<template>
  <b-navbar id="top-navbar" toggleable="lg" type="dark" variant="primary" sticky>
    <b-container v-if="inContainer">
      <slot name="top"></slot>
      <router-link v-slot="{ href, navigate }" :to="{ name: 'info' }">
        <b-navbar-brand :href="href" @click="navigate">Yukkuricraft</b-navbar-brand>
      </router-link>
      <b-navbar-toggle target="navbarSupportedContent" />
      <b-collapse id="navbarSupportedContent" is-nav>
        <navbar-links></navbar-links>
      </b-collapse>

      <navbar-locale-changer></navbar-locale-changer>
      <slot name="bottom"></slot>
    </b-container>

    <template v-else>
      <slot name="top"></slot>
      <router-link v-slot="{ href, navigate }" :to="{ name: 'info' }">
        <b-navbar-brand :href="href" @click="navigate">Yukkuricraft</b-navbar-brand>
      </router-link>
      <b-navbar-toggle target="navbarSupportedContent" />
      <b-collapse id="navbarSupportedContent" is-nav>
        <navbar-links></navbar-links>
      </b-collapse>

      <navbar-locale-changer></navbar-locale-changer>
      <slot name="bottom"></slot>
    </template>
  </b-navbar>
</template>

<script>
import { BNavbar, BContainer, BNavbarBrand, BNavbarToggle, BCollapse } from 'bootstrap-vue'

import NavbarLinks from './NavbarLinks'
import NavbarLocaleChanger from './NavbarLocaleChanger'

export default {
  components: {
    BNavbar,
    BContainer,
    BNavbarBrand,
    BNavbarToggle,
    BCollapse,
    NavbarLinks,
    NavbarLocaleChanger,
  },
  props: {
    inContainer: {
      type: Boolean,
      default: true,
    },
  },
}
</script>
