<template>
  <b-navbar
id="top-navbar"
toggleable="lg"
type="dark"
variant="primary"
sticky="top"
:container="inContainer">
    <slot name="top"></slot>
    <router-link v-slot="{ href, navigate }" :to="{ name: 'info' }">
      <b-navbar-brand :href="href" @click="navigate">Yukkuricraft</b-navbar-brand>
    </router-link>
    <b-navbar-toggle target="navbarSupportedContent" />
    <b-collapse id="navbarSupportedContent" is-nav>
      <navbar-links></navbar-links>
    </b-collapse>

    <slot name="bottom"></slot>
  </b-navbar>
</template>

<script setup lang="ts">
import { BNavbar, BNavbarBrand, BNavbarToggle, BCollapse } from 'bootstrap-vue-next'
import NavbarLinks from './NavbarLinks.vue'

defineProps({
  inContainer: {
    type: Boolean,
    default: true,
  },
})
</script>
