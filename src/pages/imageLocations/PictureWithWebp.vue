<template>
  <picture>
    <source :srcset="image.webp" type="image/webp" />
    <source :srcset="image.normal" type="image/jpeg" />

    <img
      style="border-radius: var(--bulma-radius)"
      class="image is-16by9"
      loading="lazy"
      :src="image.normal"
      :alt="title"
      @load="$emit('load')"
    />
  </picture>
  <font-awesome-icon v-if="!image.loaded" :icon="['fas', 'spinner']" spin size="3x"></font-awesome-icon>
</template>

<script setup lang="ts">
import { type PropType } from 'vue'
import { type PictureWithWebp as PictureWithWebpTpe } from '@/images'

defineProps({
  image: {
    type: Object as PropType<PictureWithWebpTpe>,
    required: true,
  },
  title: {
    type: String,
    required: false,
  },
})

defineEmits(['load'])
</script>
