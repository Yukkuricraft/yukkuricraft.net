<template>
  <div>
    <strong class="command">{{ commandStr }}</strong>
    <markdown-lazy :content="command.description" />
  </div>
</template>

<script>
import MarkdownLazy from '../../components/MarkdownLazy'

export default {
  components: { MarkdownLazy },
  props: {
    command: {
      type: Object,
      required: true,
    },
  },
  computed: {
    commandStr() {
      const aliasesStr = this.command.aliases.join(' | ')
      const args = typeof this.command.arguments !== 'undefined' ? ' ' + this.command.arguments : ''
      return '/' + aliasesStr + args
    },
  },
}
</script>
