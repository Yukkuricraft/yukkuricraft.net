<template>
	<div>
		<span class="command"><strong>{{ commandStr }}</strong></span>
		<markdown-lazy :content="command.description" />
	</div>
</template>

<script>
	import MarkdownLazy from "../../components/MarkdownLazy";

	export default {
		components: {MarkdownLazy},
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