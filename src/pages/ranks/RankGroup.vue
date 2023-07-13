<template>
  <div>
    <configurable-heading :id="group.id" :level="headingLevel">
      <a :href="'#' + group.id"><font-awesome-icon :icon="['fas', 'link']" style="font-size: 0.5em" /></a>
      {{ group.displayName }}
    </configurable-heading>

    <markdown-later v-if="group.description" :content="group.description"></markdown-later>

    <b-row v-if="'ranks' in group" tag="dl">
      <single-rank v-for="rank in group.ranks" :key="group.id + '_' + rank.name" :rank="rank" />
    </b-row>
    <br />

    <template v-if="'childGroups' in group">
      <rank-group
        v-for="rankGroup in group.childGroups"
        :key="rankGroup.id"
        :group="rankGroup"
        :heading-level="headingLevel + 1"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import { BRow } from 'bootstrap-vue-next'

import ConfigurableHeading from '@/components/ConfigurableHeading.vue'
import MarkdownLater from '@/components/MarkdownLater.vue'
import SingleRank from './SingleRank.vue'

import { type RankGroupTpe } from './RanksPage.vue'
import { type PropType } from 'vue'

defineProps({
  headingLevel: {
    type: Number,
    required: true,
  },
  group: {
    type: Object as PropType<RankGroupTpe>,
    required: true,
  },
})
</script>
