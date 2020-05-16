<template>
	<normal-page :is-error="true">
		<vue-headful title="YukkuriCraft - 404 Not found"
					 description="We couldn't find what you were looing for."
					 :image="require('../favicon_upscaled.png')"
					 url=""/>

		<img src="./confused_remi_yukkuri.png" alt="Lost Yukkuri">
		<h1>404 Not Found</h1>
		<h2>We couldn't find {{ requestUri }}.</h2>
		<br/>
		<br/>
		<h2>Maybe you intend to go to our forums at <a :href="forumUri">{{ forumUri }}</a>?</h2>
	</normal-page>
</template>

<script>
	import NormalPage from "../layout/NormalPage";
	export default {
		components: {NormalPage},
		computed: {
			requestUri() {
				return window.location.pathname
			},
			forumUri() {
				return 'https://forums.yukkuricraft.net' + this.requestUri
			}
		}
	}
</script>