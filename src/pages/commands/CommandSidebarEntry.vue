<template>
	<li>
		<template v-if="subgroup.subgroups">
			<a v-b-toggle :href="'#commandsSidebar-' + subgroupId" class="dropdown-toggle" @click.prevent>{{ subgroup.menuName }}</a>
			<b-collapse :id="'commandsSidebar-' + subgroupId">
				<command-sidebar-entries :subgroups="subgroup.subgroups"></command-sidebar-entries>
			</b-collapse>
		</template>
		<template v-else>
			<a :href="'#commands-' + subgroupId">{{ subgroup.menuName }}</a>
		</template>
	</li>
</template>

<script>
	import { VBToggle, BCollapse } from 'bootstrap-vue'

	export default {
		components: {
			BCollapse,
			CommandSidebarEntries: () => import("./CommandSidebarEntries")
		},
		directives: {
			'b-toggle': VBToggle
		},
		props: {
			subgroup: {
				type: Object,
				required: true
			},
			subgroupId: {
				type: String,
				required: true
			}
		}
	}
</script>