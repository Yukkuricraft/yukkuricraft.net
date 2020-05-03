<template>
	<div>
		<location v-for="(location, locationId) in locations" :depth="depth"
				  :location-id="locationId" :location="location"
				  :key="locationId" />
	</div>
</template>

<script>
	import Location from "./Location";

	export default {
		components: {
			Location
		},
		props: {
			locations: {
				type: Object,
				required: true
			},
			depth: {
				type: Number,
				required: true
			}
		}
	}
</script>