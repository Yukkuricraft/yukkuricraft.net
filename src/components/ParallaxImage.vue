<template>
	<div class="parallax" :style="{height: '600px', 'background-image': 'url(' + imageToUse + ')' }">
		<picture @load="switchImage">
			<source :srcset="images.highResWebp" type="image/webp" @load="switchImage">
			<source :srcset="images.highRes" :type="images.type" @load="switchImage">

			<img v-show="false" :src="images.highRes" @load="switchImage" alt="High res background">
		</picture>
		<div class="container h-100">
			<div class="row text-center align-items-center h-100">
				<div class="col-md-2"></div>
				<div class="col parallax-text">
					<slot></slot>
				</div>
				<div class="col-md-2"></div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				imageToUse: Modernizr.webp ? this.images.lowResWebp : this.images.lowRes
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
				if(typeof event.target.currentSrc === 'undefined') {
					this.imageToUse = event.target.src;
				}
				else {
					this.imageToUse = event.target.currentSrc;
				}
			}
		}
	}
</script>
