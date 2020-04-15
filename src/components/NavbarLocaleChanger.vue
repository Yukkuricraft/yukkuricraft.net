<template>
	<div class="navbar-text">
		<div class="form-inline">
			<label class="m-1" for="locale">Locale: </label>
			<select class="form-control p-0 h-100" id="locale" v-model="locale">
				<option v-for="(locale, localeValue) in supportedLocales" :value="localeValue">{{ locale }}</option>
			</select>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			let preferredLanguage = window.navigator.language.slice(0, 2);
			if (typeof this.$i18n !== 'undefined') {
				this.$i18n.locale = preferredLanguage;
			}
			return {
				locale: preferredLanguage
			}
		},
		watch: {
			locale(val) {
				if (typeof this.$i18n != 'undefined') {
					this.$i18n.locale = val
				}
			}
		},
		computed: {
			supportedLocales() {
				return {
					'en': 'English',
					//Remi, please localize stuff
					//'ja': 'Japanese'
				}
			}
		}
	}
</script>