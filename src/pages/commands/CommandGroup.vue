<template>
	<div>
		<heading :id="'commands-' + commandGroupId" :level="3 + depth">{{ commandGroup.displayName }}</heading>
		<markdown :content="commandGroup.description"></markdown>
		<command-groups v-if="commandGroup.subgroups" :depth="depth + 1"
						:subgroups="commandGroup.subgroups"></command-groups>
		<ul v-else>
			<li v-for="command in commandGroup.commands">
				<command-node :command="command"></command-node>
			</li>
		</ul>
	</div>
</template>

<script>
	import Heading from "../../components/Heading";
	import CommandNode from "./CommandNode";

	import Markdown from "../../components/Markdown";

	export default {
		components: {
			Markdown,
			CommandGroups: () => import("./CommandGroups.vue"),
			CommandNode,
			Heading
		},
		props: {
			commandGroupId: {
				type: String,
				required: true
			},
			commandGroup: {
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