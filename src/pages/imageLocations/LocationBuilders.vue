<template>
  <div class="mb-3">
    <span>{{ annotation }}</span>
    <minecraft-account
      v-if="builders.length === 1"
      :name="builders[0].name"
      :uuid="builders[0].uuid"
      fetch-username-from-uuid
      class="is-display-inline"
    />
    <ul v-else-if="builders.length <= 5">
      <li v-for="builder of builders" :key="builder.uuid" class="mb-1">
        <minecraft-account
          :name="builder.name"
          :uuid="builder.uuid"
          fetch-username-from-uuid
        />
      </li>
    </ul>
    <div v-else class="is-flex is-flex-wrap-wrap">
      <minecraft-account
        v-for="builder of builders"
        :key="builder.uuid"
        :name="builder.name"
        :uuid="builder.uuid"
        fetch-username-from-uuid
        collapse
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, type PropType } from 'vue'
import MinecraftAccount from '@/components/MinecraftAccount.vue'

interface Builder {
  name: string,
  uuid?: string
}

const props = defineProps({
  builders: {
    type: Array as PropType<Builder[]>,
    required: true,
  },
  type: String
})

const annotation = computed(() => {
  let annotateText = ''
  switch (props.type) {
    case 'town':
      annotateText = 'Owner'
      break
    default:
      annotateText = 'Builder'
  }
  return annotateText + (props.builders.length > 1 ? 's:' : ':')
})
</script>