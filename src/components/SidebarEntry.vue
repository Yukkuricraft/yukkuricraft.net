<template>
  <li>
    <template v-if="subgroup[subgroupChildrenName]">
      <a v-b-toggle :href="`#${hrefPrefix}Sidebar-${subgroupId}`" class="dropdown-toggle" @click.prevent>{{
        subgroup.menuName
      }}</a>
      <b-collapse :id="`${hrefPrefix}Sidebar-${subgroupId}`">
        <sidebar-entries
          :subgroups="subgroup[subgroupChildrenName]"
          :href-prefix="hrefPrefix"
          :subgroup-children-name="subgroupChildrenName"
        ></sidebar-entries>
      </b-collapse>
    </template>
    <template v-else>
      <a :href="`#${hrefPrefix}-${subgroupId}`">{{ subgroup.menuName }}</a>
    </template>
  </li>
</template>

<script setup lang="ts">
import { BCollapse, Directives } from 'bootstrap-vue-next'
import { type PropType } from 'vue'

type Subgroups = { [k: string]: Subgroups } | { menuName: string }

const vBToggle = Directives.vBToggle
const SidebarEntries = () => import('./SidebarEntries.vue')

defineProps({
  hrefPrefix: {
    type: String,
    required: true,
  },
  subgroup: {
    type: Object as PropType<Subgroups>,
    required: true,
  },
  subgroupId: {
    type: String,
    required: true,
  },
  subgroupChildrenName: {
    type: String,
    required: true,
  },
})
</script>
