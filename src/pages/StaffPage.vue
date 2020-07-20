<template>
	<normal-page :parallax-images="images">
		<vue-headful title="YukkuriCraft - Staff" description="The staff of YukkuriCraft."
					 :image="require('../favicon_upscaled.png')" url="https://yukkuricraft.net/staff/"/>

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
	import {autoImage} from "../images";
	import {isPrerender} from "../prerender";

	import staff from "../../content/staff.yaml";

	export default {
		components: {
			NormalPage,
			BMedia,
			BAvatar,
			BImg
		},
		data() {
			let mcNames = {};

			for(let staffGroup of staff) {
				for(let member of staffGroup.members) {
					for(let mcAccount of member.mcAccounts) {
						mcNames[mcAccount.uuid] = mcAccount.name;
					}
				}
			}

			return {
				staffAvatars: {},
				sakores: false,
				sakoresIdx: 0,
				mcNames
			}
		},
		created() {
			if(!isPrerender) {
				this.loadRealNames();
			}
			this.loadAvatars();

			document.addEventListener('keydown', this.processSakores)
		},
		destroyed() {
			document.removeEventListener('keydown', this.processSakores);
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

						import(/* webpackMode: "eager" */ '../../content/images/avatars/' + staffMember.avatar).then(img => {
							this.$set(this.staffAvatars, key, {loaded: true, avatar: img.default})
						})
					}
				}
			},
			async mcUsername(uuid, fallback) {
				let errorMsg = `Failed to get name for uuid ${uuid}, using fallback ${fallback} instead`;

				try {
					let res = await fetch('https://api.minetools.eu/uuid/' + uuid.replaceAll('-', ''));

					if (res.status !== 200) {
						console.warn(errorMsg);
						return fallback;
					} else {
						let profile = await res.json();

						if(typeof profile.error !== 'undefined') {
							console.warn(errorMsg + '. Error: ' + profile.error);
							return fallback;
						}
						else {
							return profile.name
						}
					}
				} catch (e) {
					console.warn(errorMsg + '. Error: ' + e);
					return fallback
				}
			},
			loadRealNames() {
				for(let uuid of Object.keys(this.mcNames)) {
					this.mcUsername(uuid, this.mcNames[uuid]).then(name => {
						this.$set(this.mcNames, uuid, name)
					})
				}
			}
		},
		computed: {
			images() {
				return autoImage('people')
			},
			staff() {
				return staff;
			}
		}
	}
</script>