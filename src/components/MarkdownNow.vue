<template>
  <!-- eslint-disable-next-line vue/no-v-html -->
  <div class="markdown-formatting" v-html="htmlContent"></div>
</template>

<script setup lang='ts'>
import markdownIt from 'markdown-it'
import markdownItAnchor from 'markdown-it-anchor'
import { computed } from 'vue'

const md = markdownIt({ linkify: true, typographer: true }).use(markdownItAnchor, {
  slugify(s) {
    return String(s).trim().toLowerCase().replace(/\s+/g, '-')
  },
  permalink: markdownItAnchor.permalink.ariaHidden({
    placement: 'before',
    symbol: '<i class="fas fa-link" style="font-size: 0.5em"></i>',
  }),
})

const props = defineProps({
  content: {
    type: String,
    required: true,
  },
  noParagraph: Boolean,
})

const htmlContent = computed(() => {
  const rendered = md.render(props.content)
  return props.noParagraph ? extractParagraph(rendered) : rendered
})

function extractParagraph(rendered: string) {
  const parser = new DOMParser()
  const doc = parser.parseFromString(rendered, 'text/html')
  if (doc.body.children.length === 1) {
    return doc.body.children[0].innerHTML
  } else {
    return rendered
  }
}
</script>
