<template>
  <b-col sm="3" md="2" tag="dt">
    <i v-if="rank.italics">
      <b v-if="rank.bold">{{ rank.name }}:</b>
      <template v-else>{{ rank.name }}:</template>
    </i>
    <b v-else-if="rank.bold">{{ rank.name }}:</b>
    <template v-else>{{ rank.name }}:</template>
  </b-col>
  <b-col sm="9" md="10" tag="dd">
    <markdown-later :content="rank.description" :no-paragraph="true"></markdown-later>
  </b-col>
</template>

<script setup lang="ts">
import { BCol } from 'bootstrap-vue-next'
import { type PropType } from 'vue'
import MarkdownLater from '@/components/MarkdownLater.vue'
import { type Rank } from '@/pages/ranks/RanksPage.vue'

defineProps({
  rank: {
    type: Object as PropType<Rank>,
    required: true,
  },
})
</script>
