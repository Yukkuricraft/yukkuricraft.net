<template>
	<div class="site">
		<info-header></info-header>

		<div class="site-content">
			<parallax-image v-if="parallaxImages" :height="parallaxHeight" :images="parallaxImages">
				<slot name="parallax"></slot>
			</parallax-image>

			<b-container class="container-pad" :class="isError ? 'container-error' : ''">
				<slot></slot>
			</b-container>
		</div>

		<info-footer></info-footer>
	</div>
</template>

<script>
	import {BContainer} from "bootstrap-vue";

	import InfoHeader from "../components/InfoHeader";
	import InfoFooter from "../components/InfoFooter";
	import ParallaxImage from "../components/ParallaxImage";

	export default {
		components: {
			InfoHeader,
			InfoFooter,
			ParallaxImage,
			BContainer
		},
		props: {
			parallaxImages: [Object, Promise],
			parallaxHeight: Number,
			isError: Boolean
		}
	}
</script>
