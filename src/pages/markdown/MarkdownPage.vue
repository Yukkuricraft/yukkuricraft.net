<template>
	<normal-page :parallax-class="parallaxClass">
		<template v-slot:parallax>
			<h1>{{ title }}</h1>
		</template>

		<markdown :content="content"></markdown>
	</normal-page>
</template>
<script>
	import NormalPage from "../../layout/NormalPage";
	import Markdown from "../../components/Markdown";

	export default {
		components: {Markdown, NormalPage},
		props: {
			parallaxClass: String,
			title: String,
			content: {
				type: String,
				required: true
			}
		}
	}
</script>