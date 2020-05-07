<template>
	<normal-page :parallax-images="parallaxImages">
		<template v-slot:parallax>
			<h1>{{ title }}</h1>
		</template>

		<slot></slot>

		<markdown :content="usedContent"></markdown>
	</normal-page>
</template>

<script>
	import NormalPage from "../../layout/NormalPage";
	import Markdown from "../../components/Markdown";

	export default {
		components: {Markdown, NormalPage},
		props: {
			parallaxHeight: Number,
			parallaxImages: Object,
			title: String,
			content: String,
			localizedContent: Object
		},
		computed: {
			defaultContent() {
				return this.content ? this.content : this.localizedContent['en']
			},
			usedContent() {
				return this.localizedContent && this.localizedContent[this.$i18n.locale] || this.defaultContent;
			}
		}
	}
</script>