<template>
  <b-navbar id="top-navbar" toggleable="lg" dark variant="primary" sticky="top" :container="inContainer">
    <slot name="top"></slot>
    <b-navbar-brand :to="{ name: 'info' }">Yukkuricraft</b-navbar-brand>
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
