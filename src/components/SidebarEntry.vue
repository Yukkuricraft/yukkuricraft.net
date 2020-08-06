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

<script>
import { VBToggle, BCollapse } from 'bootstrap-vue'

export default {
  components: {
    BCollapse,
    SidebarEntries: () => import('./SidebarEntries'),
  },
  directives: {
    'b-toggle': VBToggle,
  },
  props: {
    hrefPrefix: {
      type: String,
      required: true,
    },
    subgroup: {
      type: Object,
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
  },
}
</script>
