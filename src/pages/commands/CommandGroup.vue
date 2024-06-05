<template>
  <div>
    <configurable-heading
      :id="'commands-' + commandGroupId"
      :level="3 + depth"
      class="title"
      :class="'is-size-' + (3 + depth)"
      >{{ commandGroupArg.displayName }}</configurable-heading
    >
    <!-- eslint-disable vue/no-v-html -->
    <div
      v-if="commandGroupArg.description"
      class="content markdown-formatting"
      v-html="commandGroupArg.description"
    ></div>

    <div class="content">
      <ul v-if="'commands' in commandGroupArg">
        <li v-for="command in commandGroupArg.commands" :key="command.aliases.join(' | ') + (command.arguments || '')">
          <command-node :command="command"></command-node>
        </li>
      </ul>
    </div>
    <template v-if="commandGroupArg.subgroups">
      <command-group
        v-for="(subCommandGroup, subCommandGroupId) in refineType<CommandGroupTpe>(commandGroupArg.subgroups)"
        :key="subCommandGroupId"
        :depth="depth + 1"
        :command-group-id="subCommandGroupId"
        :command-group-arg="subCommandGroup"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import { type CommandGroup as CommandGroupTpe } from '@gen/commands/commandList'
import { type PropType } from 'vue'
import CommandNode from './CommandNode.vue'
import ConfigurableHeading from '@/components/ConfigurableHeading.vue'

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
