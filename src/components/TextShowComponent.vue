<template>
  <div>
    <template v-if="noParagraph">{{ content }}</template>
    <p v-else>{{ content }}</p>
  </div>
</template>

<script>
export default {
  props: {
    content: {
      type: String,
      required: true,
    },
    noParagraph: Boolean,
  },
}
</script>
