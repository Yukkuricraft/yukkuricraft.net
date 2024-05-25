<template>
  <div class="offset-box">
    <picture>
      <source :srcset="image.webp" type="image/webp" />
      <source :srcset="image.normal" type="image/jpeg" />

      <img
        style="border-radius: var(--bulma-radius)"
        class="image"
        loading="lazy"
        :src="image.normal"
        :alt="title"
        @load="$emit('load')"
      />
    </picture>
    <font-awesome-icon
      v-show="!image.loaded"
      class="offset-loading"
      :icon="['fas', 'spinner']"
      spin
      size="3x"
    ></font-awesome-icon>
  </div>
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

<style>
.offset-box {
  position: relative;
}

.offset-loading {
  position: absolute;
  top: 40%;
  left: 45%;
}
</style>
