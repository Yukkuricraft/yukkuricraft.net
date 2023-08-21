<template>
  <div class="mb-3">
    {{ annotation }}
    <minecraft-account
      v-if="builders.length === 1"
      :name="builders[0].name"
      :uuid="builders[0].uuid"
      fetch-username-from-uuid
      class="d-inline"
    />
    <template v-else>
      <br />
      <ul v-if="builders.length <= 5">
        <li v-for="(builder, index) of builders" :key="index" class="mb-1">
          <minecraft-account
            :name="builder.name"
            :uuid="builder.uuid"
            fetch-username-from-uuid
          />
        </li>
      </ul>
      <div v-else class="d-flex flex-wrap">
        <minecraft-account
          v-for="(builder, index) of builders"
          :key="index"
          :name="builder.name"
          :uuid="builder.uuid"
          fetch-username-from-uuid
          collapse
        />
      </div>
    </template>
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