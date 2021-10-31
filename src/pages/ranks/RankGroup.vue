<template>
  <div>
    <configurable-heading :id="group.id" :level="headingLevel">
      <a :href="'#' + group.id"><font-awesome-icon :icon="['fas', 'link']" style="font-size: 0.5em" /></a>
      {{ group.displayName }}
    </configurable-heading>

    <markdown-later v-if="group.description" :content="group.description"></markdown-later>

    <b-row v-if="group.ranks" tag="dl">
      <template v-for="rank in group.ranks">
        <b-col :key="rank.name + 'N'" sm="3" md="2" tag="dt">
          <i v-if="rank.italics">
            <b v-if="rank.bold">{{ rank.name }}:</b>
            <template v-else>{{ rank.name }}:</template>
          </i>
          <b v-else-if="rank.bold">{{ rank.name }}:</b>
          <template v-else>{{ rank.name }}:</template>
        </b-col>
        <b-col :key="rank.name + 'D'" sm="9" md="10" tag="dd">
          <markdown-later :content="rank.description" :no-paragraph="true"></markdown-later>
        </b-col>
      </template>
    </b-row>
    <br />

    <rank-group
      v-for="rankGroup in group.childGroups"
      :key="rankGroup.id"
      :group="rankGroup"
      :heading-level="headingLevel + 1"
    />
  </div>
</template>

<script>
import { BRow, BCol } from 'bootstrap-vue'

import ConfigurableHeading from '../../components/ConfigurableHeading'
import MarkdownLater from '../../components/MarkdownLater'

export default {
  name: 'RankGroup',
  components: {
    ConfigurableHeading,
    MarkdownLater,
    BRow,
    BCol,
  },
  props: {
    headingLevel: {
      type: Number,
      required: true,
    },
    group: {
      type: Object,
      required: true,
    },
  },
}
</script>
