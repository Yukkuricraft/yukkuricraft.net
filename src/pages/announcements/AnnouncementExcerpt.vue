<template>
	<div v-if="post">
		<b-card>
			<b-media>
				<template v-slot:aside>
					<b-avatar variant="primary" size="64" :text="attributes.poster.substring(0, 1)"
							  :src="posterAvatar"></b-avatar>
				</template>

				<heading :level="headingLevel" class="h3">
					<router-link :to="{path: `/announcements/${postSlug}/`}">{{ attributes.title }}</router-link>
				</heading>
				<div class="byline">
					<p>By: {{ attributes.poster }}</p>
					<p>Posted: {{ localizedPostedTime }}</p>
				</div>
				<p>
					{{ attributes.excerpt }}
				</p>
			</b-media>
		</b-card>
	</div>
	<div v-else>
		<font-awesome-icon :icon="['fas', 'spinner']" spin size="4x" />
	</div>
</template>

<script>
	import {BCard, BMedia, BAvatar} from "bootstrap-vue";
	import posters from "../../../content/announcements/posters.yaml";
	import Heading from "../../components/Heading";

	export default {
		components: {
			BCard,
			BMedia,
			BAvatar,
			Heading
		},
		props: {
			headingLevel: Number,
			post: Object,
			postSlug: String,
		},
		data() {
			return {
				posterAvatar: null
			}
		},
		created() {
			if(this.post) {
				this.loadPosterAvatar();
			}
		},
		watch: {
			post() {
				if(this.post) {
					this.loadPosterAvatar();
				}
			}
		},
		computed: {
			attributes() {
				return this.post.attributes
			},
			localizedPostedTime() {
				return new Date(this.post.attributes.time).toLocaleString(this.$i18n.locale, {
					weekday: 'long',
					year: 'numeric',
					month: 'long',
					day: 'numeric'
				})
			}
		},
		methods: {
			loadPosterAvatar() {
				let posterName = this.post.attributes.poster;
				if (posters[posterName] && posters[posterName].avatar) {
					let avatarName = posters[posterName].avatar;
					import(/* webpackMode: "eager" */ `../../../content/images/avatars/${avatarName}`).then(mod => {
						this.posterAvatar = mod.default;
					})
				}
			}
		}
	}

</script>