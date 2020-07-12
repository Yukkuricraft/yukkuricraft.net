<template>
	<normal-page :parallax-images="parallaxImages">
		<template v-slot:parallax>
			<h1>{{ title }}</h1>
		</template>

		<vue-headful :title="'YukkuriCraft - ' + title"
					 :description="description"
					 :image="require('../../favicon_upscaled.png')"
					 :url="canonicalUrl"/>

		<slot></slot>

		<component :is="usedComponent.vue.component"></component>
	</normal-page>
</template>

<script>
	import NormalPage from "../../layout/NormalPage";

	export default {
		components: {
			NormalPage,
		},
		props: {
			component: Object,
			localizedComponents: Object,
			parallaxImages: [Object, Promise]
		},
		computed: {
			usedComponent() {
				return this.localizedComponents && this.localizedComponents[this.$i18n.locale] || this.component
			},
			parallaxHeight() {
				return this.component.attributes.parallaxHeight
			},
			title() {
				return this.component.attributes.title
			},
			description() {
				return this.component.attributes.description
			},
			canonicalUrl() {
				return this.component.attributes.canonicalUrl
			}
		}
	}
</script>
