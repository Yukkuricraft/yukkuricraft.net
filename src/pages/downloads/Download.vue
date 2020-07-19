<template>
	<normal-page :parallax-images="images">
		<vue-headful title="YukkuriCraft - Downloads"
					 description="Download our Gensokyo maps."
					 :image="require('../../favicon_upscaled.png')"
					 url="https://yukkuricraft.net/downloads/gensokyo/"/>

		<template v-slot:parallax>
			<h1>"Gensokyo ~ The Second Dream" Map download</h1>
			<b-button variant="primary" href="https://mega.nz/#F!5hU2HCJC!IpwU8ZjpwSALOgLjoZtNlA">Downloads</b-button>
		</template>

		<b-alert show variant="warning" class="mt-3" style="font-size: 85%">
			<h2 class="alert-heading h5">Missing and broken features in Vanilla</h2>
			<p class="mb-2">
				While we try as best we can to give you a great experience, some things might not work correctly. Our
				recommendation is always to explore the map on the server for the best experience. Some things that
				might
				break include (not an exclusive list):
			</p>
			<ul>
				<li>Grass growing on dirt</li>
				<li>Monsters spawning</li>
				<li>Ice/snow forming and melting</li>
				<li>Portals/teleportation not working</li>
				<li>Vegetation growing</li>
			</ul>
		</b-alert>

		<p v-if="showI18nExample">message: {{ $t('hello') }}</p>

		<p>
			<strong>CHROME USERS</strong> - Mega is known to have issues downloading on Chrome. If you are using Chrome
			and
			having difficulty downloading, please temporarily use Firefox or some other browser of your choice to
			download
			from that link.
		</p>
	</normal-page>
</template>

<i18n>
	{
	"en": {
	"hello": "hello world!"
	},
	"ja": {
	"hello": "こんにちは、世界！"
	}
	}
</i18n>

<script>
	import {BButton, BAlert} from "bootstrap-vue"

	import NormalPage from "../../layout/NormalPage";
	import {autoImage} from "../../images";

	export default {
		components: {
			NormalPage,
			BButton,
			BAlert
		},
		computed: {
			showI18nExample() {
				return false
			},
			images() {
				return autoImage('hakurei_inside')
			}
		}
	}
</script>