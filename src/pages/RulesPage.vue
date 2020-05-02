<template>
	<markdown-page :parallax-high-res-image="require('../images/rules.png')" :parallax-low-res-image="require('../images/rules_small.jpg')" title="Rules" :localized-content="rules"></markdown-page>
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