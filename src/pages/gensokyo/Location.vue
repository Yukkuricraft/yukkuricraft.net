<template>
	<div>
		<heading :id="'location-' + locationId" :level="3 + depth">{{ location.displayName }}</heading>
		<markdown :content="location.description"></markdown>
		<locations v-if="location.sublocations" :depth="depth + 1" :locations="location.sublocations"></locations>
		<div v-if="location.images">
			<h5>Images</h5>
			<!-- https://startbootstrap.com/snippets/thumbnail-gallery/ -->
			<!-- https://css-tricks.com/creating-a-modal-image-gallery-with-bootstrap-components/ -->
			<b-row v-b-modal="'locationModal-' + locationId">
				<b-col md="4" sm="6" cols="12" v-for="(image, i) in loadedImages" :key="i">
					<div v-if="image.loaded" class="d-block mb-4 h-100" @click="slide = i">
						<b-img loading="lazy" fluid thumbnail :src="image.small"></b-img>
					</div>
					<div v-else class="d-block mb-4 h-100">
						<font-awesome-icon :icon="['fas', 'spinner']" spin size="2x"/>
					</div>
				</b-col>
			</b-row>

			<b-modal :id="'locationModal-' + locationId" ok-only ok-variant="secondary" ok-title="Close" title="Images" size="xl" centered>
				<b-carousel :id="'locationCarousel-' + locationId" controls class="mt-5" :interval="0" v-model="slide">
					<b-carousel-slide v-for="image in loadedImages"
									  :key="image.large"
									  :img-src="image.large"
									  :caption="image.title"
									  :text="image.description"/>
				</b-carousel>
			</b-modal>
		</div>
	</div>
</template>

<script>
	import {BRow, BCol, BImg, BModal, VBModal, BCarousel, BCarouselSlide} from "bootstrap-vue"

	import Heading from "../../components/Heading";
	import Markdown from "../../components/Markdown";

	import chunk from "lodash/chunk"

	export default {
		components: {
			Markdown,
			Locations: () => import("./Locations.vue"),
			Heading,
			BRow,
			BCol,
			BImg,
			BModal,
			BCarousel,
			BCarouselSlide
		},
		directives: {
			'b-modal': VBModal
		},
		data() {
			return {
				loadedImages: [],
				slide: 0,
			}
		},
		props: {
			locationId: {
				type: String,
				required: true
			},
			location: {
				type: Object,
				required: true
			},
			depth: {
				type: Number,
				required: true
			}
		},
		created() {
			this.loadImages()
		},
		methods: {
			loadImages() {
				if (this.location.images) {
					for (let [i, image] of this.location.images.entries()) {
						this.$set(this.loadedImages, i, {loaded: false})

						let smallImg = import(/* webpackMode: "eager" */ './images/' + image.small);
						let largeImg = import(/* webpackMode: "eager" */ './images/' + image.large);
						Promise.all([smallImg, largeImg]).then(([small, large]) => {
							this.$set(this.loadedImages, i, {
								...image,
								small: small.default,
								large: large.default,
								loaded: true
							})
						})
					}
				}
			}
		}
	}
</script>
