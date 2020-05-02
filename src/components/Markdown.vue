<template>
	<div v-html="htmlContent"></div>
</template>

<script>
	import markdownIt from "markdown-it";
	import markdownItAnchor from "markdown-it-anchor";

	const md = markdownIt({linkify: true, typographer: true})
		.use(markdownItAnchor, {
			slugify(s) {
				return String(s).trim().toLowerCase().replace(/\s+/g, '-')
			},
			permalink: true,
			permalinkBefore: true,
			permalinkSymbol: '<i class="fas fa-link" style="font-size: 0.5em"></i>'
		});

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