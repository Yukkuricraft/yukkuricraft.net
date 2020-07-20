<template>
	<div class="markdown-extra" v-html="htmlContent"></div>
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
				required: true
			},
			noParagraph: Boolean
		},
		computed: {
			htmlContent() {
				if(this.content) {
					let rendered = md.render(this.content);

					return this.noParagraph ? this.extractParagraph(rendered) : rendered;
				}
				else {
					return null
				}
			}
		},
		methods: {
			extractParagraph(rendered) {
				let parser = new DOMParser();
				let doc = parser.parseFromString(rendered, 'text/html');
				if(doc.body.children.length === 1) {
					return doc.body.children[0].innerHTML
				}
				else {
					return rendered
				}
			}
		}
	}
</script>