<template>
  <div>
    <configurable-heading :id="'commands-' + commandGroupId" :level="3 + depth">{{
      commandGroupArg.displayName
    }}</configurable-heading>
    <markdown-lazy v-if="commandGroupArg.description" :content="commandGroupArg.description"></markdown-lazy>

    <template v-if="'subgroups' in commandGroupArg">
      <command-group
        v-for="(subCommandGroup, subCommandGroupId) in refineType<CommandGroupTpe>(commandGroupArg.subgroups)"
        :key="subCommandGroupId"
        :depth="depth + 1"
        :command-group-id="subCommandGroupId"
        :command-group-arg="subCommandGroup"
      />
    </template>
    <ul v-else>
      <li v-for="command in commandGroupArg.commands" :key="command.aliases.join(' | ') + (command.arguments || '')">
        <command-node :command="command"></command-node>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import CommandNode from './CommandNode.vue'
import ConfigurableHeading from '@/components/ConfigurableHeading.vue'
import MarkdownLazy from '@/components/MarkdownLazy.vue'

import { type CommandGroup as CommandGroupTpe } from '../../../content/commands/commandList'
import { type PropType } from 'vue'

function refineType<V>(sources: { [k: string]: V }): Record<string, V> {
  return sources
}

defineProps({
  commandGroupId: {
    type: String,
    required: true,
  },
  commandGroupArg: {
    type: Object as PropType<CommandGroupTpe>,
    required: true,
  },
  depth: {
    type: Number,
    required: true,
  },
})
</script>
