<template>
  <div class="mb-3">
    {{ annotation }}
    <minecraft-account v-if="builders.length === 1"
      :name="builders[0].name"
      :uuid="builders[0].uuid"
      fetch-username-from-uuid
      class="d-inline"
    />
    <template v-else>
      <ul>
        <li v-for="builder of builders" class="mb-1">
          <minecraft-account
            :name="builder.name"
            :uuid="builder.uuid"
            fetch-username-from-uuid
          />
        </li>
      </ul>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, type PropType } from 'vue'
import MinecraftAccount from '@/components/MinecraftAccount.vue'

interface Builder {
  name: string,
  uuid: string
}

const props = defineProps({
  builders: {
    type: Array as PropType<Builder[]>,
    required: true,
  },
  type: String
})

const annotation = ref("")
switch (props.type) {
  case 'town':
    annotation.value = 'Owner'
    break
  default:
    annotation.value = 'Builder'
}
annotation.value += props.builders.length > 1 ? 's:' : ':'
</script>