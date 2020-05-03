<template>
	<div class="parallax" :style="{height: '600px', 'background-image': 'url(' + imageToUse + ')' }">
		<img v-show="false" :src="highResImage" @load="switchImage" alt="High res background">
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
				imageToUse: this.lowResImage,
			}
		},
		props: {
			lowResImage: String,
			highResImage: String,
			height: {
				type: Number,
				default: 600
			}
		},
		methods: {
			switchImage() {
				this.imageToUse = this.highResImage;
			}
		}
	}
</script>
