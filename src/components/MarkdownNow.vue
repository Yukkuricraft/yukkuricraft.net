<template>
  <!-- eslint-disable-next-line vue/no-v-html -->
  <div class="markdown-formatting" v-html="htmlContent"></div>
</template>

<script setup lang="ts">
import markdownIt from 'markdown-it'
import markdownItAnchor from 'markdown-it-anchor'
import { computed, ref, watch } from 'vue'

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

const rendered = computed(() => md.render(props.content))

const htmlContent = ref(rendered.value)

watch(
  rendered,
  (val) => {
    const processDoc = (el: ParentNode) => {
      if (el.children.length === 1) {
        htmlContent.value = el.children[0].innerHTML
      }
    }

    if (import.meta.env.SSR) {
      import('jsdom').then((p) => {
        processDoc(p.JSDOM.fragment(val))
      })
    } else {
      const parser = new DOMParser()
      processDoc(parser.parseFromString(val, 'text/html').body)
    }
  },
  { immediate: true },
)
</script>
