<template>
	<div>
		<span class="command"><strong>{{ commandStr }}</strong></span>
		<markdown :content="command.description" />
	</div>
</template>

<script>
	import Markdown from "../../components/Markdown";

	export default {
		components: {Markdown},
		props: {
			command: {
				type: Object,
				required: true
			}
		},
		computed: {
			commandStr() {
				let aliasesStr = Array.isArray(this.command.aliases) ? this.command.aliases.join(' | ') : this.command.aliases;
				let args = typeof this.command.arguments !== 'undefined' ? ' ' + this.command.arguments : '';
				return '/' + aliasesStr + args
			}
		}
	}
</script>