import Vue from 'vue'

export default Vue.component('ConfigurableHeading', {
  props: {
    level: {
      type: Number,
      required: true,
    },
  },
  render(createElement) {
    return createElement('h' + this.level, this.$slots.default)
  },
})
