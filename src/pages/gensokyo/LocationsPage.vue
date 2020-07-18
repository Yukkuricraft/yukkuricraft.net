<template>
	<sidebar-page :parallax-images="images">
		<vue-headful title="YukkuriCraft - Gensokyo" description="Look at all the different places in our Gensokyo."
					 :image="require('../../favicon_upscaled.png')" url="https://info.yukkuricraft.net/gensokyo/"/>

		<template v-slot:sidebar>
			<div class="sidebar-header">
				<h2>Locations</h2>
			</div>

			<sidebar-entries class="sidebar-components" href-prefix="location" :subgroups="locations"
							 subgroup-children-name="sublocations" />
		</template>

		<template v-slot:parallax>
			<h1>Locations in Gensokyo</h1>
			<p>Explore our builds in Gensokyo.</p>
		</template>

		<location v-for="(location, locationId) in locations" :depth="0" :location-id="locationId" :location="location"
				  :key="locationId"/>

	</sidebar-page>
</template>

<script>
	import SidebarPage from "../../layout/SidebarPage";
	import SidebarEntries from "../../components/SidebarEntries";
	import Location from "./Location";

	import merge from "lodash/merge"

	import {autoImage} from "../../images";

	import locationList from "../../../content/locations/locationList.yaml";

	export default {
		components: {
			SidebarPage,
			SidebarEntries,
			Location
		},
		data() {
			return {
				allLocations: []
			}
		},
		created() {
			let allLocations = locationList.locations.map((entry, idx) => {
				let name = entry.endsWith('.yaml') ? entry.substring(0, entry.length - 5) : entry;
				return import(/* webpackMode: "eager" */ `../../../content/locations/${name}.yaml`).then(commands => ({
					commands,
					idx
				}))
			});

			//We get them all together to hopefully only update the DOM once
			Promise.all(allLocations).then(all => {
				all.forEach(({commands, idx}) => {
					this.$set(this.allLocations, idx, commands.default);
				})
			})
		},
		computed: {
			images() {
				return autoImage('greenhouse')
			},
			locations() {
				//We throw out all the getters and such
				return JSON.parse(JSON.stringify(merge({}, ...this.allLocations)));
			}
		}
	}
</script>
