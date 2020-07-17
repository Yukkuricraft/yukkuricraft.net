<template>
	<normal-page v-if="post">
		<h1>{{ attributes.title }}</h1>
		<div class="byline">
			<p>
				By: {{ attributes.poster }}
				<b-avatar variant="primary" size="32" :text="attributes.poster.substring(0, 1)"
						  :src="posterAvatar"></b-avatar>
			</p>
			<p>Posted: {{ localizedPostedTime }}</p>
		</div>

		<article>
			<component :is="post.vue.component"></component>
		</article>
	</normal-page>
	<normal-page v-else>
		<font-awesome-icon :icon="['fa', 'spinner']" spin size="4x" />
	</normal-page>
</template>

<script>
	import {BAvatar} from "bootstrap-vue";

	import NormalPage from "../../layout/NormalPage";
	import posters from "./posters.yaml";

	export default {
		components: {
			NormalPage,
			BAvatar
		},
		props: {
			postName: String
		},
		data() {
			return {
				post: null,
				posterAvatar: null
			}
		},
		created() {
			import(`./${this.postName}.md`).then(p => {
				this.post = p.default;
			})
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
				return this.post.attributes;
			},
			localizedPostedTime() {
				return new Date(this.post.attributes.time).toLocaleString(this.$i18n.locale, {
					weekday: 'long',
					year: 'numeric',
					month: 'long',
					day: 'numeric'
				})
			},
		},
		methods: {
			loadPosterAvatar() {
				let posterName = this.post.attributes.poster;
				if (posters[posterName] && posters[posterName].avatar) {
					let avatarName = posters[posterName].avatar;
					import(`../../images/avatars/${avatarName}`).then(mod => {
						this.posterAvatar = mod.default;
					})
				}
			}
		}
	}
</script>