<template>
	<sidebar-page :parallax-images="images">
		<vue-headful title="YukkuriCraft - Gensokyo"
					 description="Look at all the different places in our Gensokyo."
					 :image="require('../../favicon_upscaled.png')"
					 url="https://info.yukkuricraft.net/gensokyo/"/>

		<template v-slot:sidebar>
			<div class="sidebar-header">
				<h2>Locations</h2>
			</div>

			<location-sidebar-entries class="sidebar-components" :locations="locations"></location-sidebar-entries>
		</template>

		<template v-slot:parallax>
			<h1>Locations in Gensokyo</h1>
			<p>Explore our builds in Gensokyo.</p>
		</template>

		<h2>Locations</h2>
		<p>
			While a lot of Gensokyo isn't finished yet, you can explore various images taken of taken if over it's
			lifetime.
		</p>

		<locations :locations="locations" :depth="0"></locations>

	</sidebar-page>
</template>

<script>
	import SidebarPage from "../../layout/SidebarPage";
	import LocationSidebarEntries from "./LocationSidebarEntries";
	import Locations from "./Locations";

	import merge from "lodash/merge"

	import neoGenso from "./neo/neo_genso.yaml"
	import neoSdm from "./neo/sdm.yaml";
	import neoUntroddenValley from "./neo/untrodden_valley.yaml";
	import neoYoukaiMnt from "./neo/youkai_mnt.yaml";
	import neoHumanVillage from "./neo/human_village.yaml";
	import neoForestMagic from "./neo/forest_magic.yaml"
	import {makeImage} from "../../images";


	let allLocations = merge({}, neoGenso, neoSdm, neoUntroddenValley, neoYoukaiMnt, neoHumanVillage, neoForestMagic);

	export default {
		components: {
			SidebarPage,
			LocationSidebarEntries,
			Locations
		},
		computed: {
			images() {
				return makeImage(
					require('../../images/greenhouse.png'),
					require('../../images/greenhouse.webp'),
					require('../../images/greenhouse_small.jpg'),
					require('../../images/greenhouse_small.webp'),
				)
			},
			locations() {
				return allLocations
			}
		}
	}
</script>