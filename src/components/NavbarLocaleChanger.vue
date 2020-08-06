<template>
  <div class="navbar-text">
    <b-form inline>
      <label class="m-1" for="locale">Locale: </label>
      <b-form-select
        id="locale"
        v-model="locale"
        plain
        :select-size="null"
        class="p-0 h-100"
        :options="supportedLocales"
      />
    </b-form>
  </div>
</template>

<script>
import { BForm, BFormSelect } from 'bootstrap-vue'

export default {
  components: {
    BForm,
    BFormSelect,
  },
  data() {
    return {
      locale: this.$i18n.locale,
    }
  },
  computed: {
    supportedLocales() {
      return [
        {
          value: 'en',
          text: 'English',
        },
        // Remi, please localize stuff
        /*
					{
						value: 'ja',
						text: 'Japanese'
					},
					 */
      ]
    },
  },
  watch: {
    locale(val) {
      this.$i18n.locale = val
    },
  },
}
</script>
