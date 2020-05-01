<template>
	<markdown-page parallaxClass="parallax-rules" title="Rules" :content="rules"></markdown-page>
</template>
<script>
	import MarkdownPage from "./markdown/MarkdownPage";
	import rules from "./Rules.md"

	export default {
		components: {MarkdownPage},
		computed: {
			rules() {
				return rules;
			}
		}
	}
</script>