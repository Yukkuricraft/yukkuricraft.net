<template>
  <ul class="list-unstyled">
    <sidebar-entry
      v-for="(subgroup, subgroupId) in subgroups"
      :key="subgroupId"
      :subgroup="subgroup"
      :subgroup-id="subgroupId"
      :href-prefix="hrefPrefix"
      :subgroup-children-name="subgroupChildrenName"
    />
  </ul>
</template>

<script setup lang='ts'>
import { type PropType } from 'vue'
import SidebarEntry from './SidebarEntry.vue'

type Subgroups = { [k: string]: Subgroups } | { menuName: string }

defineProps({
  hrefPrefix: {
    type: String,
    required: true,
  },
  subgroups: {
    type: Object as PropType<Subgroups>,
    required: true,
  },
  subgroupChildrenName: {
    type: String,
    required: true,
  },
})
</script>
