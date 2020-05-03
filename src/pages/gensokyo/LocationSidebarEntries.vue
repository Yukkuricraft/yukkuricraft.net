<template>
	<ul class="list-unstyled">
		<location-sidebar-entry v-for="(location, locationId) in locations" :location="location" :locationId="locationId"
							   :key="locationId" />
	</ul>
</template>

<script>
	import LocationSidebarEntry from "./LocationSidebarEntry";

	export default {
		components: {
			LocationSidebarEntry
		},
		props: {
			locations: {
				type: Object,
				required: true
			}
		}
	}
</script>