<template>
  <h2 class="title is-size-2">Staff members</h2>
  <p class="subtitle">Get to know our staff members a bit more.</p>

  <div v-for="staffGroup in staff" :key="staffGroup.id" class="block">
    <staff-group :staff-group="staffGroup"></staff-group>
  </div>

  <template v-for="blooper in bloopers">
    <staff-member v-if="blooper.enabled" :key="blooper.id" :staff-member="blooper"></staff-member>
  </template>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { useHead } from '@unhead/vue'

import staff from '@cont/staff.yaml'

import StaffMember from './StaffMember.vue'
import { makeMeta } from '@/pageHelpers'
import StaffGroup from '@/pages/staff/StaffGroup.vue'

export interface StaffMemberTpe {
  name: string
  mcAccounts: { name: string; uuid: string }[]
  discordAccount?: string
  avatar?: string
  description: string
}

export interface StaffGroupTpe {
  id: string
  displayName: string
  members: StaffMemberTpe[]
}

interface Blooper extends StaffMemberTpe {
  id: string
  key: string
  enabled: boolean
  idx: number
}

const bloopers = ref<Blooper[]>([
  {
    id: 'sakores',
    name: 'Sakores',
    key: 'sakores',
    enabled: false,
    idx: 0,
    description: 'Sakores',
    mcAccounts: [{ uuid: '5c395d66-8b15-49c1-957a-3b0b41f9eeba', name: 'Sakires' }],
  },
  {
    id: 'mori',
    name: 'Mori (Machine generated)',
    key: 'mori',
    enabled: false,
    idx: 0,
    description:
      "Remi Hi, I'm Koko. I'm the server or anything else feel free to help out on Yukuricraft. I basically make sure the server, or just mainly slacking around the Mediators on Yukuricraft. I basically make sure the server builds, such as Paintball and deal with people, Warframe, drawing, and just chat, don't feel free to check up on your best behavior. I lurk around the server. I'm one of other things, and just tag me anything, I'm Redleaf, an old builder for about a W.I.P). If there's any help of Yukkuricraft. Whether it's server or issues, feel free to keep our community moving forward, so if I’m online and you need anything let me or one of other probably won't hesitate to oversee the Minecraft communities for Gensokyo, or one that region, you'll most likely be happy to hang out who needs it so please remain playful and other things! Feel free to ask. Birb Hi! I'm Koko. I'm a team in Yukkuricraft. These days, I mostly work on the one of the daily technical side of the paintball minigame, and you want!\n",
    mcAccounts: [],
  },
])

onMounted(() => document.addEventListener('keydown', processBloopers))

onUnmounted(() => document.removeEventListener('keydown', processBloopers))

function processBloopers(event: KeyboardEvent) {
  if (event.isComposing || event.keyCode === 229) {
    return
  }

  bloopers.value
    .filter((b) => !b.enabled)
    .forEach((b) => {
      if (b.key.charAt(b.idx) === event.key) {
        b.idx++
      } else {
        b.idx = 0
      }

      b.enabled = b.key.length === b.idx
      if (b.enabled) {
        console.log(`Secret ${b.name} unlocked`)
      }
    })
}

useHead(
  makeMeta({
    title: 'Yukkuricraft - Staff',
    description: 'The staff of Yukkuricraft.',
    url: 'staff/',
  }),
)
</script>
