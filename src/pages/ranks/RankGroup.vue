<template>
  <div>
    <configurable-heading :id="group.id" :level="headingLevel" class="title" :class="'is-size-' + headingLevel">
      <a :href="'#' + group.id"><font-awesome-icon :icon="['fas', 'link']" style="font-size: 0.5em" /></a>
      {{ group.displayName }}
    </configurable-heading>

    <div v-if="group.description" class="subtitle content markdown-formatting" v-html="group.description"></div>

    <dl v-if="'ranks' in group" class="columns is-multiline">
      <single-rank v-for="rank in group.ranks" :key="group.id + '_' + rank.name" :rank="rank" />
    </dl>
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
import { type PropType } from 'vue'
import SingleRank from './SingleRank.vue'
import { type RankGroupTpe } from './RanksPage.vue'
import ConfigurableHeading from '@/components/ConfigurableHeading.vue'

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
