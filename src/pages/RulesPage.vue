<template>
	<markdown-page parallaxClass="parallax-rules" title="Rules" :localized-content="rules"></markdown-page>
</template>
<script>
	import MarkdownPage from "./markdown/MarkdownPage";
	import rulesEn from "./RulesEN.md"

	export default {
		components: {MarkdownPage},
		computed: {
			rules() {
				return {
					en: rulesEn
				}
			}
		}
	}
</script>