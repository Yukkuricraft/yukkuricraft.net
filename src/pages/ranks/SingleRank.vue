<template>
  <dt class="column is-2 pb-0">
    <i v-if="rank.italics" class="is-italic">
      <b v-if="rank.bold" class="is-bold">{{ rank.name }}:</b>
      <template v-else>{{ rank.name }}:</template>
    </i>
    <b v-else-if="rank.bold" class="is-bold">{{ rank.name }}:</b>
    <template v-else>{{ rank.name }}:</template>
  </dt>
  <dd class="column is-10 pt-0">
    <!-- eslint-disable vue/no-v-html -->
    <div class="content markdown-formatting" v-html="rank.description"></div>
  </dd>
</template>

<script setup lang="ts">
import { type PropType } from 'vue'
import { type Rank } from '@/pages/ranks/RanksPage.vue'

defineProps({
  rank: {
    type: Object as PropType<Rank>,
    required: true,
  },
})
</script>
