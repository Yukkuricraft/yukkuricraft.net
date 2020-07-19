<template>
	<normal-page>
		<vue-headful title="YukkuriCraft - Announcements"
					 description="See what's happening in the community."
					 :image="require('../../favicon_upscaled.png')"
					 url="https://yukkuricraft.net/announcements/"/>

		<h1>Announcements</h1>
		<ul class="list-unstyled">
			<li v-for="post in posts" class="mb-3">
				<announcement-excerpt v-if="post" :headingLevel="2" :post="post.post" :post-slug="post.slug"></announcement-excerpt>
			</li>
		</ul>
	</normal-page>
</template>

<script>
	import NormalPage from "../../layout/NormalPage";
	import announcementList from "../../../content/announcements/announcementList.yaml";
	import AnnouncementExcerpt from "./AnnouncementExcerpt";

	import {debounce} from "lodash";

	export default {
		components: {
			AnnouncementExcerpt,
			NormalPage
		},
		data() {
			return {
				posts: [],
				postsLoaded: 0
			}
		},
		created() {
			this.loadPosts();
			window.addEventListener('scroll', this.scrollLoadPosts);
		},
		destroyed() {
			window.removeEventListener('scroll', this.scrollLoadPosts);
		},
		methods: {
			loadPosts() {
				let maxPosts = announcementList.posts.length;
				if(this.posts.length === maxPosts) {
					return
				}

				let newPostCount = Math.min(this.postsLoaded + 5, maxPosts);
				while(this.posts.length < newPostCount) {
					this.posts.push(null)
				}

				let currentpostsLoaded = this.postsLoaded;
				announcementList.posts.slice(this.postsLoaded, newPostCount).forEach((post, idx) => {
					let name = post.file.endsWith('.md') ? post.file.substring(0, post.file.length - 3) : post.file;
					import(`../../../content/announcements/${name}.md`).then(mod => {
						this.$set(this.posts, currentpostsLoaded + idx, {post: mod.default, slug: post.slug || name});
					})
				})

				this.postsLoaded = newPostCount;
			},
			scrollLoadPosts(event) {
				let debouncedLoadPosts = debounce(this.loadPosts, 500);

				if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 100)) {
					debouncedLoadPosts();
				}
			}
		}
	}
</script>