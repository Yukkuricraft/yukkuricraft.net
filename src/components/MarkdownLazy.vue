<template>
	<markdown :content="content"></markdown>
</template>

<script>
	import TextLoadingComponent from "./TextLoadingComponent"
	import TextErrorComponent from "./TextErrorComponent"

	export default {
		components: {
			'markdown': () => ({
				component: import(/* webpackChunkName: "markdown" */ "./Markdown"),
				loading: TextLoadingComponent,
				error: TextErrorComponent,
			}),
		},
		props: {
			content: {
				required: true
			}
		}
	}
</script>