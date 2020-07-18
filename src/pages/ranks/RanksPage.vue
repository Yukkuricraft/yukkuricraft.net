<template>
	<normal-page :parallax-images="images">
		<vue-headful title="YukkuriCraft - Ranks and Staff"
					 description="The different ranks found on YukkuriCraft."
					 :image="require('../../favicon_upscaled.png')"
					 url="https://info.yukkuricraft.net/ranks/"/>

		<template v-slot:parallax>
			<h1>Ranks</h1>
		</template>

		<h2 id="ranks">Ranks</h2>
		<p>
			Yukkuricraft has many different ranks. Here is a brief description of them, and what sets them apart
			from each other.
		</p>

		<rank-group v-for="rankGroup in rankGroups" :group="rankGroup" :heading-level="3" :key="rankGroup.id" />

		<p>
			<strong>Disclaimer:</strong> Mediators <em>do
			not</em> have authority over builders, they are completely even ranks that do not overpower each other
			unless it's in the category their rank is designed for. If the subject is about building decisions and
			choices, builders have first say. If it's about banning/kicking/rollback/lookups, mediators have first
			say.
		</p>
	</normal-page>
</template>

<script>
	import {BRow, BCol} from "bootstrap-vue"

	import NormalPage from "../../layout/NormalPage";
	import {autoImage} from "../../images";
	import RankGroup from "./RankGroup";

	import rankGroups from "../../../content/ranks.yaml"

	export default {
		components: {
			RankGroup,
			NormalPage,
			BRow,
			BCol
		},
		computed: {
			images() {
				return autoImage('people')
			},
			rankGroups() {
				return rankGroups
			}
		}
	}
</script>
