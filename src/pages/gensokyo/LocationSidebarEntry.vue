<template>
	<li>
		<template v-if="location.sublocations">
			<a v-b-toggle :href="'#locationsSidebar-' + locationId" class="dropdown-toggle" @click.prevent>{{ location.menuName }}</a>
			<b-collapse :id="'locationsSidebar-' + locationId">
				<location-sidebar-entries :locations="location.sublocations"></location-sidebar-entries>
			</b-collapse>
		</template>
		<template v-else>
			<a :href="'#location-' + locationId">{{ location.menuName }}</a>
		</template>
	</li>
</template>

<script>
	import { VBToggle, BCollapse } from 'bootstrap-vue'

	export default {
		components: {
			BCollapse,
			LocationSidebarEntries: () => import("./LocationSidebarEntries")
		},
		directives: {
			'b-toggle': VBToggle
		},
		props: {
			location: {
				type: Object,
				required: true
			},
			locationId: {
				type: String,
				required: true
			}
		}
	}
</script>