<template>
  <div>
    <heading :id="'commands-' + commandGroupId" :level="3 + depth">{{ commandGroup.displayName }}</heading>
    <markdown-lazy v-if="commandGroup.description" :content="commandGroup.description"></markdown-lazy>

    <template v-if="commandGroup.subgroups">
      <command-group
        v-for="(subCommandGroup, subCommandGroupId) in commandGroup.subgroups"
        :key="subCommandGroupId"
        :depth="depth + 1"
        :command-group-id="subCommandGroupId"
        :command-group="subCommandGroup"
      />
    </template>
    <ul v-else>
      <li v-for="command in commandGroup.commands" :key="command.aliases.join(' | ') + (command.arguments || '')">
        <command-node :command="command"></command-node>
      </li>
    </ul>
  </div>
</template>

<script>
import Heading from '../../components/Heading'
import MarkdownLazy from '../../components/MarkdownLazy'
import CommandNode from './CommandNode'

export default {
  name: 'CommandGroup',
  components: {
    MarkdownLazy,
    CommandNode,
    Heading,
  },
  props: {
    commandGroupId: {
      type: String,
      required: true,
    },
    commandGroup: {
      type: Object,
      required: true,
    },
    depth: {
      type: Number,
      required: true,
    },
  },
}
</script>
