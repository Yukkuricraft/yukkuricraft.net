<template>
  <b-row class='g-0'>
    <b-col cols='1'>
      <slot name='aside'></slot>
    </b-col>
    <b-col cols='11'>
      <slot></slot>
    </b-col>
  </b-row>
</template>

<script setup lang='ts'>
import {BCol, BRow} from 'bootstrap-vue-next'

</script>