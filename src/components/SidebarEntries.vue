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

<script>
import SidebarEntry from './SidebarEntry'

export default {
  components: {
    SidebarEntry,
  },
  props: {
    hrefPrefix: {
      type: String,
      required: true,
    },
    subgroups: {
      type: Object,
      required: true,
    },
    subgroupChildrenName: {
      type: String,
      required: true,
    },
  },
}
</script>
