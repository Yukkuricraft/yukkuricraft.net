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
				return {
					'en': 'English',
					//Remi, please localize stuff
					//'ja': 'Japanese'
				}
			}
		}
	}
</script>