<template>
	<normal-page v-if="post">
		<vue-headful :title="'YukkuriCraft - ' + attributes.title" :description="attributes.excerpt || null"
					 :image="require('../../favicon_upscaled.png')"
					 :url="`https://yukkuricraft.net/announcements/${postSlug}/`"/>

		<article>
			<header>
				<h1>{{ attributes.title }}</h1>
				<div class="byline">
					<p>
						By: {{ attributes.poster }}
						<b-avatar variant="primary" size="32" :text="attributes.poster.substring(0, 1)"
								  :src="posterAvatar"></b-avatar>
					</p>
					<p>Posted: {{ localizedPostedTime }}</p>
				</div>
			</header>

			<component :is="post.vue.component"></component>
		</article>

		<div v-if="attributes.comments && false">
			<h2>Comments</h2>
			<div>
				<iframe ref="comments" :src="discourseSrc" width="100%" frameborder="0"
						scrolling="no" :height="comments.height"></iframe>
			</div>
		</div>
	</normal-page>
	<normal-page v-else>
		<font-awesome-icon :icon="['fas', 'spinner']" spin size="4x"/>
	</normal-page>
</template>

<script>
	import {BAvatar} from "bootstrap-vue";

	import NormalPage from "../../layout/NormalPage";
	import posters from "../../../content/announcements/posters.yaml";

	//Discourse information
	let discourseUrl = 'https://forums.yukkuricraft.net';
	let defaultPoster = 'YukkuriBot';

	export default {
		components: {
			NormalPage,
			BAvatar
		},
		props: {
			postName: String,
			postSlug: String
		},
		data() {
			return {
				post: null,
				posterAvatar: null
			}
		},
		created() {
			import(`../../../content/announcements/${this.postName}.md`).then(p => {
				this.post = p.default;
			});
			window.addEventListener('message', this.postMessageReceived, false);
		},
		destroyed() {
			window.removeEventListener('message', this.postMessageReceived, false);
		},
		watch: {
			post() {
				if (this.post) {
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
			discourseSrc() {
				let embedUrl = `https://yukkuricraft.net/announcements/${this.postSlug}/`;
				let posterName = this.post.attributes.poster;
				let poster = posters[posterName] && posters[posterName].discourseUser || defaultPoster;
				return `${discourseUrl}/embed/comments?embed_url=${embedUrl}&discourse_username=${poster}`
			},
			//Taken from https://meta.discourse.org/javascripts/embed.js
			findPosY(obj) {
				var top = 0;
				if (obj.offsetParent) {
					while (1) {
						top += obj.offsetTop;
						if (!obj.offsetParent)
							break;
						obj = obj.offsetParent;
					}
				} else if (obj.y) {
					top += obj.y;
				}
				return top;
			},
			normalizeUrl(url) {
				console.log(url);
				return url.replace(/^https?(\:\/\/)?/, '');
			},
			postMessageReceived(e) {
				if (!e) {
					return;
				}
				if (!e.origin || this.normalizeUrl(discourseUrl).indexOf(this.normalizeUrl(e.origin)) === -1) {
					return;
				}

				if (e.data) {
					if (e.data.type === 'discourse-resize' && e.data.height) {
						this.$refs.comments = e.data.height + "px";
					}

					if (e.data.type === 'discourse-scroll' && e.data.top) {
						// find iframe offset
						let destY = this.findPosY(this.$refs.comments) + e.data.top;
						window.scrollTo(0, destY);
					}
				}
			}
		},
		methods: {
			loadPosterAvatar() {
				let posterName = this.post.attributes.poster;
				if (posters[posterName] && posters[posterName].avatar) {
					let avatarName = posters[posterName].avatar;
					import(`../../../content/images/avatars/${avatarName}`).then(mod => {
						this.posterAvatar = mod.default;
					})
				}
			}
		}
	}
</script>