<template>
	<li>
		<template v-if="location.sublocations">
			<a data-toggle="collapse" aria-expanded="false" class="dropdown-toggle"
			   :href="'#locationsSidebar-' + locationId">{{ location.menuName }}</a>
			<location-sidebar-entries :id="'locationsSidebar-' + locationId" class="collapse"
									 :locations="location.sublocations"></location-sidebar-entries>
		</template>
		<template v-else>
			<a :href="'#location-' + locationId">{{ location.menuName }}</a>
		</template>
	</li>
</template>

<script>

	export default {
		components: {
			LocationSidebarEntries: () => import("./LocationSidebarEntries")
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