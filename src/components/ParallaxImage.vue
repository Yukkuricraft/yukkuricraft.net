<template>
	<div :style="{height: height + 'px'}">
		<div class="parallax" :style="{height: height + 'px', 'background-image': 'url(' + imageToUse + ')'}">
			<b-container class="h-100">
				<b-row class="text-center align-items-center h-100">
					<b-col md="2"></b-col>
					<b-col class="parallax-text">
						<slot></slot>
					</b-col>
					<b-col md="2"></b-col>
				</b-row>
			</b-container>
		</div>
		<picture>
			<source :srcset="images.highResWebp" type="image/webp">
			<source :srcset="images.highRes" :type="images.type">

			<img v-show="false" :src="images.highRes" @load="switchImage" alt="High res background">
		</picture>
	</div>
</template>

<script>
	import {BContainer, BRow, BCol} from "bootstrap-vue";

	export default {
		components: {
			BContainer,
			BRow,
			BCol
		},
		data() {
			return {
				imageToUse: Modernizr.webp ? this.images.lowResWebp : this.images.lowRes,
			}
		},
		props: {
			images: Object,
			height: {
				type: Number,
				default: 600
			}
		},
		methods: {
			switchImage(event) {
				console.log(event)
				if(!window.__PRERENDER_INJECTED || !window.__PRERENDER_INJECTED.prerendered) {
					if (typeof event.target.currentSrc === 'undefined') {
						this.imageToUse = event.target.src;
					} else {
						this.imageToUse = event.target.currentSrc;
					}
				}
			}
		}
	}
</script>
