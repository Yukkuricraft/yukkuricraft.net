<template>
	<normal-page :parallax-images="images">
		<vue-headful title="YukkuriCraft - Staff" description="The staff of YukkuriCraft."
					 :image="require('../favicon_upscaled.png')" url="https://info.yukkuricraft.net/staff/"/>

		<template v-slot:parallax>
			<h1>Staff</h1>
		</template>

		<h2>Staff members</h2>
		Get to know our staff members a bit more.

		<template v-for="staffGroup in staff">
			<h3 :id="staffGroup.id" class="mt-5">{{ staffGroup.displayName }}</h3>

			<ul class="list-unstyled">
				<b-media tag="li" class="mt-5" v-for="staffMember in staffGroup.members" :key="staffGroup.id + staffMember.name">
					<template v-slot:aside>
						<b-avatar variant="primary" size="96" :text="staffMember.name.substring(0, 1)"
								  :src="staffAvatars[staffGroup.id + '-' + staffMember.name].avatar"></b-avatar>
					</template>
					<h4>{{ staffMember.name }}</h4>

					<p>{{ staffMember.description }}</p>

					<h5>Minecraft accounts</h5>
					<ul class="list-unstyled">
						<li v-for="mcAccount in staffMember.mcAccounts">
							<img :src="'https://mc-heads.net/avatar/' + mcAccount.uuid + '/32'" :alt="mcAccount.name">
							{{ mcNames[mcAccount.uuid] }}
						</li>
					</ul>
				</b-media>
			</ul>
		</template>

		<template v-if="sakores">
			<h3 id="sakores" class="mt-5">Sakores</h3>

			<b-media class="mt-5">
				<template v-slot:aside>
					<b-avatar variant="primary" size="96" text="S"></b-avatar>
				</template>
				<h4>Sakores</h4>

				<p>Sakores</p>

				<h5>Minecraft accounts</h5>
				<ul class="list-unstyled">
					<li>
						<img :src="'https://mc-heads.net/avatar/5c395d66-8b15-49c1-957a-3b0b41f9eeba/32'" alt="Sakores">
						Sakores
					</li>
				</ul>
			</b-media>
		</template>
	</normal-page>
</template>

<script>
	import {BAvatar, BImg, BMedia} from "bootstrap-vue"

	import NormalPage from "../layout/NormalPage";
	import {makeImage} from "../images";

	import staff from "./staff.yaml";
	import {mapState} from "vuex";

	export default {
		components: {
			NormalPage,
			BMedia,
			BAvatar,
			BImg
		},
		data() {
			return {
				staffAvatars: {},
				sakores: false,
				sakoresHandler: null,
				sakoresIdx: 0
			}
		},
		created() {
			if(!window.__PRERENDER_INJECTED || !window.__PRERENDER_INJECTED.prerendered) {
				this.$store.dispatch('staff/loadRealNames')
			}
			this.loadAvatars();

			if(!this.sakoresHandler) {
				this.sakoresHandler = document.addEventListener('keydown', this.processSakores)
			}
		},
		beforeDestroy() {
			if(this.sakoresHandler) {
				document.removeEventListener('keydown', this.sakoresHandler);
				this.sakoresHandler = null;
			}
		},
		methods: {
			processSakores(event) {
				if (event.isComposing || event.keyCode === 229 || this.sakores) {
					return;
				}

				if('sakores'.charAt(this.sakoresIdx) === event.key) {
					this.sakoresIdx++;
				}
				else {
					this.sakoresIdx = 0;
				}

				this.sakores = 'sakores'.length === this.sakoresIdx;
			},
			loadAvatars() {
				for (let staffGroup of staff) {
					for (let staffMember of staffGroup.members) {
						let key = staffGroup.id + '-' + staffMember.name;

						this.$set(this.staffAvatars, key, {loaded: false});

						if(!staffMember.avatar) {
							continue;
						}

						import(/* webpackMode: "eager" */ '../images/staffAvatars/' + staffMember.avatar).then(img => {
							this.$set(this.staffAvatars, key, {loaded: true, avatar: img.default})
						})
					}
				}
			}
		},
		computed: {
			images() {
				return makeImage(
					require('../images/people.png'),
					require('../images/people.webp'),
					require('../images/people_small.jpg'),
					require('../images/people_small.webp'),
				)
			},
			staff() {
				return staff;
			},
			...mapState('staff', ['mcNames'])
		}
	}
</script>