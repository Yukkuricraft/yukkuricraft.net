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

			<ul class="list-unstyled" v-for="staffMember in staffGroup.members">
				<b-media tag="li" class="mt-5">
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
				staffAvatars: {}
			}
		},
		created() {
			if(!window.__PRERENDER_INJECTED || !window.__PRERENDER_INJECTED.prerendered) {
				this.$store.dispatch('staff/loadRealNames')
			}
			this.loadAvatars();
		},
		methods: {
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