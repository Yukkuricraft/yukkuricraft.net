<template>
	<markdown-page :parallax-images="images" title="Rules" :localized-content="rules">
		<vue-headful title="YukkuriCraft Info - Rules"
					 description="All the different rules for YukkuriCraft on it's different platforms."
					 :image="require('../favicon_upscaled.png')"
					 url="https://info.yukkuricraft.net/rules"/>
	</markdown-page>
</template>
<script>
	import MarkdownPage from "./markdown/MarkdownPage";
	import rulesEn from "./RulesEN.md"
	import {makeImage} from "../images";

	export default {
		components: {MarkdownPage},
		computed: {
			rules() {
				return {
					en: rulesEn
				}
			},
			images() {
				return makeImage(
					require('../images/rules.png'),
					require('../images/rules.webp'),
					require('../images/rules_small.jpg'),
					require('../images/rules_small.webp'),
				)
			}
		}
	}
</script>