<template>
	<div :style="{height: height + 'px'}">
		<div class="parallax" :style="{height: height + 'px', 'background-image': `url(${imageToUse})`}">
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

		<picture v-if="loadedImages">
			<source :srcset="loadedImages.highResWebp" type="image/webp">
			<source :srcset="loadedImages.highRes" type="image/jpeg">

			<img v-show="false" :src="loadedImages.highRes" @load="switchImage" alt="High res background">
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
				loadedImages: null,
				imageToUse: null,
				switched: false
			}
		},
		props: {
			images: [Object, Promise],
			height: {
				type: Number,
				default: 600
			}
		},
		created() {
			Promise.resolve(this.images).then(images => {
				this.loadedImages = images

				if(images.loaded) {
					console.log('InstantSwitch');
					this.switched = true;
					this.imageToUse = Modernizr.webp ? images.highResWebp : images.highRes
				}
				else {
					this.imageToUse = Modernizr.webp ? images.lowResWebp : images.lowRes
				}
			});
		},
		methods: {
			switchImage(event) {
				if (!window.__PRERENDER_INJECTED || !window.__PRERENDER_INJECTED.prerendered &&  !this.switched) {
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
