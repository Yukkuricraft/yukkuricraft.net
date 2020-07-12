<template>
	<div class="sidebar-wrapper">
		<nav class="sidebar" :class="{active: sidebarActive}">
			<slot name="sidebar"></slot>
		</nav>

		<div class="sidebar-content" :class="{active: sidebarActive}">
			<info-header :in-container="false">
				<template v-slot:top>
					<b-button aria-controls="sidebar-nav" type="button" variant="none"
							  @click="sidebarActive = !sidebarActive" aria-expanded="false" aria-label="Toggle sidebar">
						<font-awesome-icon class="text-white" :icon="['fas', 'align-left']"/>
					</b-button>
				</template>
			</info-header>

			<parallax-image :height="parallaxHeight" :images="parallaxImages">
				<slot name="parallax"></slot>
			</parallax-image>

			<b-container class="container-pad">
				<slot></slot>

				<info-footer></info-footer>
			</b-container>
		</div>
	</div>
</template>

<script>
	import {BContainer, BButton} from "bootstrap-vue"

	import InfoHeader from "../components/InfoHeader";
	import InfoFooter from "../components/InfoFooter";
	import ParallaxImage from "../components/ParallaxImage";

	export default {
		components: {
			InfoHeader,
			InfoFooter,
			ParallaxImage,
			BContainer,
			BButton
		},
		props: {
			parallaxImages: [Object, Promise],
			parallaxHeight: Number,
		},
		data() {
			return {
				sidebarActive: false
			}
		}
	}
</script>
