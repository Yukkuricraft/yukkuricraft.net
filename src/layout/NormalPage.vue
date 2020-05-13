<template>
	<div class="site">
		<info-header></info-header>

		<div class="site-content">
			<parallax-image v-if="parallaxImages" :height="parallaxHeight" :images="parallaxImages">
				<slot name="parallax"></slot>
			</parallax-image>

			<div class="container" :class="isError ? 'container-error' : ''">
				<slot></slot>
			</div>
		</div>

		<info-footer></info-footer>
	</div>
</template>

<script>
	import InfoHeader from "../components/InfoHeader";
	import InfoFooter from "../components/InfoFooter";
	import ParallaxImage from "../components/ParallaxImage";

	export default {
		components: {
			InfoHeader,
			InfoFooter,
			ParallaxImage
		},
		props: {
			parallaxImages: Object,
			parallaxHeight: Number,
			isError: Boolean
		}
	}
</script>