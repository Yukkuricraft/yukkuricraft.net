<template>
	<div v-html="htmlContent"></div>
</template>

<script>
	import markdownIt from "markdown-it"

	const md = markdownIt({linkify: true, typographer: true});

	export default {
		props: {
			content: {
				type: String,
				required: true
			}
		},
		computed: {
			htmlContent() {
				return md.render(this.content);
			}
		}
	}
</script>