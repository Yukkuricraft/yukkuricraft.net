<template>
  <div class="sidebar-header">
    <p>{{ route.meta.sidebarTitle || 'Navigate' }}</p>
  </div>

  <ul>
    <li v-for="h2 in toc" :key="'toCh2' + h2.id">
      <a class='text-no-underline' :href="'#' + h2.id">{{ h2.content }}</a>
      <ul v-if="h2.children.length">
        <li v-for="h3 in h2.children" :key="'toCh3' + h3.id">
          <a class='text-no-underline' :href="'#' + h3.id">{{ h3.content }}</a>
          <ul v-if="h3.children.length">
            <li v-for="h4 in h3.children" :key="'toCh4' + h4.id">
              <a class='text-no-underline' :href="'#' + h4.id">{{ h4.content }}</a>
              <ul v-if="h4.children.length">
                <li v-for="h5 in h4.children" :key="'toCh5' + h5.id">
                  <a class='text-no-underline' :href="'#' + h5.id">{{ h5.content }}</a>
                </li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { onMounted, onUnmounted, ref } from 'vue'

interface ToC {
  id: string
  content: string
  level: number
  children: ToC[]
  currentTopElement: ToC | null
}

function moveCurrentTopElement(toc: ToC) {
  if (toc.currentTopElement) {
    moveCurrentTopElement(toc.currentTopElement)
    toc.children.push(toc.currentTopElement)
  }
}

function processElement(existing: ToC, id: string, content: string, level: number) {
  if (!existing.currentTopElement) {
    existing.currentTopElement = { id, content, level, children: [], currentTopElement: null }
  } else if (level <= existing.currentTopElement.level) {
    moveCurrentTopElement(existing)

    existing.currentTopElement = { id, content, level, children: [], currentTopElement: null }
  } else if (level > existing.level + 1) {
    processElement(existing.currentTopElement, id, content, level)
  }
}

const selector = 'h2[id], h3[id], h4[id], h5[id]'

function makeToC() {
  if (typeof document === 'undefined') {
    return []
  }

  const elements = document.querySelectorAll(selector)
  const toC = { id: '', content: '', level: 1, children: [], currentTopElement: null }

  for (const element of elements) {
    const heading = element as HTMLHeadingElement
    const level = Number(heading.tagName.substring(1))

    if (heading.dataset.ignoreSidebar) {
      continue
    }

    processElement(toC, heading.id, heading.innerText, level)
  }
  moveCurrentTopElement(toC)

  return toC.children
}

const toc = ref<ToC[]>(makeToC())
const observer = ref()

onMounted(() => {
  observer.value = new MutationObserver(() => {
    updateToc() // TODO: Be smarter here
  })

  observer.value.observe(document.getElementById('contentRoot'), { childList: true, subtree: true })
})
onUnmounted(() => {
  observer.value.disconnect()
})

function updateToc() {
  toc.value = makeToC()
}

const route = useRoute()
</script>
