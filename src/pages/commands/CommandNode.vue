<template>
  <div>
    <strong class="command">{{ commandStr }}</strong>
    <markdown-lazy :content="command.description" />
  </div>
</template>

<script setup lang="ts">
import { computed, type PropType } from 'vue'
import { type Command } from '@cont/commands/commandList'
import MarkdownLazy from '@/components/MarkdownLazy.vue'


const props = defineProps({
  command: {
    type: Object as PropType<Command>,
    required: true,
  },
})

const commandStr = computed(() => {
  const aliasesStr = props.command.aliases.join(' | ')
  const args = typeof props.command.arguments !== 'undefined' ? ' ' + props.command.arguments : ''
  return '/' + aliasesStr + args
})
</script>
