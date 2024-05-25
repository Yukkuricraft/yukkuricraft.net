<template>
  <nav
    class="navbar is-primary is-fixed-top"
  >
    <div class="navbar-brand">
      <slot name="top"></slot>
      <router-link class="navbar-item has-text-white" :to="{ name: 'info' }">Yukkuricraft</router-link>

      <button
        type="button"
        class="navbar-burger"
        :class="{ 'is-active': burgerExpanded }"
        aria-label="menu"
        :aria-expanded="burgerExpanded"
        @click="burgerExpanded = !burgerExpanded"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </button>
    </div>

    <div class="navbar-menu" :class="{ 'is-active': burgerExpanded }">
      <div class="navbar-start">
        <NavbarLink
          v-for="navlink in navlinks"
          :key="'subpages' in navlink ? navlink.id : navlink.name"
          :navlink="navlink"
        ></NavbarLink>
      </div>
      <div class="navbar-end">
        <slot name="bottom"></slot>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import NavbarLink from './NavbarLink.vue'
import navlinks from '../navlinks'

const burgerExpanded = ref(false)
</script>
