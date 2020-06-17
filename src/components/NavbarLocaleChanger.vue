<template>
	<div class="navbar-text">
		<b-form inline>
			<label class="m-1" for="locale">Locale: </label>
			<b-form-select plain :select-size="null" class="p-0 h-100" id="locale" v-model="locale" :options="supportedLocales" />
		</b-form>
	</div>
</template>

<script>
	import {BNavText, BForm, BFormSelect} from "bootstrap-vue"

	export default {
		components: {
			BNavText,
			BForm,
			BFormSelect
		},
		data() {
			return {
				locale: this.$i18n.locale
			}
		},
		watch: {
			locale(val) {
				this.$i18n.locale = val;
			}
		},
		computed: {
			supportedLocales() {
				return [
					{
						value: 'en',
						text: 'English'
					},
					//Remi, please localize stuff
					/*
					{
						value: 'ja',
						text: 'Japanese'
					},
					 */
				]
			}
		}
	}
</script>