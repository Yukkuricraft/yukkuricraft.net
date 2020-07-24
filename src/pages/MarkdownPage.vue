<template>
	<normal-page :parallax-images="realParallaxImages">
		<template v-slot:parallax>
			<h1>{{ title }}</h1>
		</template>

		<vue-headful :title="'YukkuriCraft - ' + title"
					 :description="description"
					 :image="require('../favicon_upscaled.png')"
					 :url="canonicalUrl"/>

		<slot></slot>

		<component :is="usedComponent.vue.component"></component>
	</normal-page>
</template>

<script>
	import NormalPage from "../layout/NormalPage";

	export default {
		components: {
			NormalPage,
		},
		props: {
			component: Object,
			localizedComponents: [Object, Promise],
			parallaxImages: Function
		},
		data() {
			return {
				nowLocalizedComponents: {},
				realParallaxImages: null
			}
		},
		watch: {
			parallaxImages: {
				immediate: true,
				handler(val) {
					this.realParallaxImages = val();
				}
			},
			localizedComponents: {
				immediate: true,
				handler(val) {
					Promise.resolve(val || {}).then(localized => {
						this.nowLocalizedComponents = localized;
					})
				}
			}
		},
		computed: {
			usedComponent() {
				return this.nowLocalizedComponents[this.$i18n.locale] || this.component;
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
