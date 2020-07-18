<template>
	<ul class="list-unstyled">
		<sidebar-entry v-for="(subgroup, subgroupId) in subgroups" :subgroup="subgroup" :subgroupId="subgroupId" :href-prefix="hrefPrefix"
							   :key="subgroupId" :subgroup-children-name="subgroupChildrenName" />
	</ul>
</template>

<script>
	import SidebarEntry from "./SidebarEntry";

	export default {
		components: {
			SidebarEntry
		},
		props: {
			hrefPrefix: {
				type: String,
				required: true
			},
			subgroups: {
				type: Object,
				required: true
			},
			subgroupChildrenName: {
				type: String,
				required: true
			}
		}
	}
</script>