<template>
	<div>
		<heading :id="'location-' + locationId" :level="3 + depth">{{ location.displayName }}</heading>
		<markdown :content="location.description"></markdown>
		<locations v-if="location.sublocations" :depth="depth + 1" :locations="location.sublocations"></locations>
		<div v-if="location.images">
			<h4>Images</h4>
			<!-- https://startbootstrap.com/snippets/thumbnail-gallery/ -->
			<!-- https://css-tricks.com/creating-a-modal-image-gallery-with-bootstrap-components/ -->
			<div class="row" data-toggle="modal" :data-target="'#locationModal-' + locationId">
				<div class="col-md-4 col-sm-6 col-12" v-for="(image, i) in loadedImages">
					<div v-if="image.loaded" class="d-block mb-4 h-100" :data-target="'#locationCarousel-' + locationId"
						 :data-slide-to="i">
						<img loading="lazy" class="img-fluid img-thumbnail" :src="image.small">
					</div>
					<div v-else class="d-block mb-4 h-100">
						<font-awesome-icon :icon="['fas', 'spinner']" spin size="2x"/>
					</div>
				</div>
			</div>

			<div :id="'locationModal-' + locationId" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
				<div class="modal-dialog modal-dialog-centered modal-xl" role="document">
					<div class="modal-content">
						<div class="modal-header">
							Images
							<button type="button" class="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">×</span>
							</button>
						</div>

						<div class="modal-body">
							<div :id="'locationCarousel-' + locationId" class="carousel slide mt-5">
								<div class="carousel-inner">
									<div class="carousel-item active">
										<img loading="lazy" class="d-block w-100" :src="loadedImages[0].large">
										<div v-if="loadedImages[0].title || loadedImages[0].description"
											 class="carousel-caption d-none d-md-block">
											<heading v-if="loadedImages[0].title" :id="'location-' + locationId"
													 :level="4 + depth">{{ loadedImages[0].title }}
											</heading>
											<p v-if="loadedImages[0].description">{{ loadedImages[0].description }}</p>
										</div>
									</div>
									<div class="carousel-item" v-for="image in loadedImages.slice(1)">
										<img loading="lazy" class="d-block w-100" :src="image.large">
										<div v-if="image.title || image.description"
											 class="carousel-caption d-none d-md-block">
											<heading v-if="image.title" :id="'location-' + locationId"
													 :level="4 + depth">{{ image.title }}
											</heading>
											<p v-if="image.description">{{ image.description }}</p>
										</div>
									</div>
								</div>
								<a class="carousel-control-prev" :href="'#locationCarousel-' + locationId" role="button"
								   data-slide="prev">
									<span class="carousel-control-prev-icon" aria-hidden="true"></span>
									<span class="sr-only">Previous</span>
								</a>
								<a class="carousel-control-next" :href="'#locationCarousel-' + locationId" role="button"
								   data-slide="next">
									<span class="carousel-control-next-icon" aria-hidden="true"></span>
									<span class="sr-only">Next</span>
								</a>
							</div>

							<div class="modal-footer">
								<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Heading from "../../components/Heading";
	import Markdown from "../../components/Markdown";

	import chunk from "lodash/chunk"

	export default {
		components: {
			Markdown,
			Locations: () => import("./Locations.vue"),
			Heading
		},
		data() {
			return {
				loadedImages: []
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