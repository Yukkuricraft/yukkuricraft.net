<template>
  <h2 id="ranks">Ranks</h2>
  <p>
    Yukkuricraft has many different ranks. Here is a brief description of them, and what sets them apart from each
    other.
  </p>

  <rank-group v-for="rankGroup in rankGroups" :key="rankGroup.id" :group="rankGroup" :heading-level="3" />

  <p>
    <strong>Disclaimer:</strong> Mediators <em>do not</em> have authority over builders, they are completely even
    ranks that do not overpower each other unless it's in the category their rank is designed for. If the subject is
    about building decisions and choices, builders have first say. If it's about banning/kicking/rollback/lookups,
    mediators have first say.
  </p>
</template>

<script setup lang='ts'>
import { useHead } from '@unhead/vue'
import rankGroupsUntyped from '../../../content/ranks.yaml'
import RankGroup from './RankGroup.vue'
import { makeMeta } from '@/pageHelpers'

export interface Rank {
  name: string
  description: string
  italics?: boolean
  bold?: boolean
}

export interface RankGroupBase {
  id: string
  displayName: string
  description?: string
}

export interface RankGroupWithChildren extends RankGroupBase {
  // eslint-disable-next-line no-use-before-define
  childGroups: RankGroupTpe[]
}

export interface RankGroupWithRanks extends RankGroupBase {
  ranks: Rank[]
}

export type RankGroupTpe = RankGroupWithChildren | RankGroupWithRanks

const rankGroups = rankGroupsUntyped as RankGroupTpe[]

useHead(makeMeta({
  title: 'YukkuriCraft - Ranks',
  description: 'The different ranks found on YukkuriCraft.',
  url: 'ranks/'
}))
</script>
