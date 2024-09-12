<template>
  <locations-content :locations="locations"></locations-content>
</template>

<script setup lang="ts">
import { useHead } from '@unhead/vue'
import { computed, onMounted, onServerPrefetch } from 'vue'
import LocationsContent from '@/pages/imageLocations/LocationsContent.vue'
import { useLocationsStore } from '@/stores/locations'
import { makeMeta } from '@/pageHelpers'

const locationsStore = useLocationsStore()

// We throw out all the getters and such
const locations = computed(() => JSON.parse(JSON.stringify(mergeWithSub(locationsStore.allLocations, 'sublocations'))))

onServerPrefetch(() => locationsStore.loadLocations())

function mergeWithSub<Sub extends string, A extends {[key in Sub]?: {[name: string]: A}}>(ass: ({[name: string]: A} | undefined)[], sub: Sub): {[name: string]: A} {
  const res: {[name: string]: A} = {}

  for (const as of ass) {
    if (!as) {
      continue
    }

    for (const [name, a] of Object.entries(as)) {
      if (!res[name]) {
        res[name] = a
      } else {
        const previousSub = res[name][sub]
        const currentSub = a[sub]

        res[name] = {...[res[name]], ...a}
        res[name][sub] = mergeWithSub([previousSub, currentSub], sub) as A[Sub]
      }
    }
  }

  return res
}

onMounted(async () => {
  if (locationsStore.allLocations.length === 0) {
    await locationsStore.loadLocations()
  }
})

useHead(
  makeMeta({
    title: 'Yukkuricraft - Gensokyo',
    description: 'Look at all the different places in our Gensokyo.',
    url: 'gensokyo/',
  }),
)
</script>
