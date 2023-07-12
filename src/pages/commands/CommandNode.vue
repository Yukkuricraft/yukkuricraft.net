<template>
  <div>
    <strong class="command">{{ commandStr }}</strong>
    <markdown-lazy :content="command.description" />
  </div>
</template>

<script setup lang='ts'>
import { computed } from 'vue'
import MarkdownLazy from '@/components/MarkdownLazy.vue'

const props = defineProps({
  command: {
    type: Object,
    required: true,
  },
})

const commandStr = computed(() => {
  const aliasesStr = props.command.aliases.join(' | ')
  const args = typeof props.command.arguments !== 'undefined' ? ' ' + props.command.arguments : ''
  return '/' + aliasesStr + args
})
</script>
