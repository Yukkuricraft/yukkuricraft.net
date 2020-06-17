<template>
	<div :style="{height: '600px'}">
		<!-- Two divs here to try to get around flash when the image switches -->
		<div class="parallax" :style="{height: '600px', 'background-image': 'url(' + lowResImageToUse + ')' }" v-show="!imageLoaded">
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
		<div class="parallax" :style="{height: '600px', 'background-image': 'url(' + imageToUse + ')' }" v-show="imageLoaded">
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
		<picture @load="switchImage">
			<source :srcset="images.highResWebp" type="image/webp" @load="switchImage">
			<source :srcset="images.highRes" :type="images.type" @load="switchImage">

			<img v-show="false" :src="images.highRes" @load="switchImage" alt="High res background">
		</picture>
	</div>
</template>

<script>
	import {mapState} from 'vuex';
	import {BContainer, BRow, BCol} from "bootstrap-vue";

	export default {
		components: {
			BContainer,
			BRow,
			BCol
		},
		data() {
			return {
				imageLoaded: false,
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
		computed: {
			lowResImageToUse() {
				return Modernizr.webp ? this.images.lowResWebp : this.images.lowRes
			}
		},
		watch: {
			imageToUse() {
				this.imageLoaded = true;
			}
		},
		methods: {
			switchImage(event) {
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
