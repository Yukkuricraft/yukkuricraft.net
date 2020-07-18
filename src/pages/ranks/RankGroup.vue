<template>
	<div>
		<heading :level="headingLevel" :id="group.id">
			<a :href="'#' + group.id"><font-awesome-icon :icon="['fas', 'link']" style="font-size: 0.5em" /></a>
			{{ group.displayName }}
		</heading>
		<markdown-later v-if="group.description" :content="group.description"></markdown-later>

		<b-row tag="dl" v-if="group.ranks">
			<template v-for="rank in group.ranks">
				<b-col sm="3" md="2" tag="dt">
					<i v-if="rank.italics">
						<b v-if="rank.bold">{{ rank.name }}</b>
						<template v-else>{{ rank.name }}</template>
					</i>
					<b v-else-if="rank.bold">{{ rank.name }}</b>
					<template v-else>{{ rank.name }}</template>:
				</b-col>
				<b-col sm="9" md="10" tag="dd">
					<markdown-later :content="rank.description" :no-paragraph="true"></markdown-later>
				</b-col>
			</template>
		</b-row>
		<br />

		<rank-group v-for="rankGroup in group.childGroups" :group="rankGroup" :heading-level="headingLevel + 1" :key="rankGroup.id" />
	</div>
</template>

<script>
	import {BRow, BCol} from "bootstrap-vue"

	import Heading from "../../components/Heading";
	import MarkdownLater from "../../components/MarkdownLater";

	export default {
		name: 'rank-group',
		components: {
			Heading,
			MarkdownLater,
			BRow,
			BCol
		},
		props: {
			headingLevel: {
				type: Number,
				required: true
			},
			group: {
				type: Object,
				required: true
			}
		}
	}
</script>