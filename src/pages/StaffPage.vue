<template>
  <h2>Staff members</h2>
  <p>Get to know our staff members a bit more.</p>

  <template v-for="staffGroup in staff" :key="staffGroup.id">
    <h3 :id="staffGroup.id" class="mt-5">{{ staffGroup.displayName }}</h3>

    <ul class="list-unstyled">
      <fake-media
        v-for="staffMember in staffGroup.members"
        :key="staffGroup.id + staffMember.name"
        tag="li"
        class="mt-5"
      >
        <template #aside>
          <staff-avatar :size="96" :staff-member="staffMember.name" :avatar-loc="staffMember.avatar"></staff-avatar>
        </template>
        <h4>{{ staffMember.name }}</h4>

        <p>{{ staffMember.description }}</p>

        <h5>Minecraft accounts</h5>
        <ul class="list-unstyled">
          <li v-for="mcAccount in staffMember.mcAccounts" :key="mcAccount.uuid">
            <img
              loading="lazy"
              :src="'https://mc-heads.net/avatar/' + mcAccount.uuid + '/32'"
              width="32"
              height="32"
              :alt="mcAccount.name"
            />
            {{ mcNames[mcAccount.uuid] }}
          </li>
        </ul>
      </fake-media>
    </ul>
  </template>

  <template v-for="blooper in bloopers">
    <template v-if="blooper.enabled">
      <h3 :id="blooper.id" :key="blooper.id + 'BH'" class="mt-5">{{ blooper.name }}</h3>

      <fake-media :key="blooper.id + 'BL'" class="mt-5">
        <template #aside>
          <b-avatar variant="primary" size="96" :text="blooper.name.charAt(0)"></b-avatar>
        </template>
        <h4>{{ blooper.name }}</h4>

        <p>{{ blooper.content }}</p>

        <h5>Minecraft accounts</h5>
        <ul class="list-unstyled">
          <li v-for="blooperMcAccount in blooper.mcAccounts" :key="blooperMcAccount.uuid">
            <img
              :src="'https://mc-heads.net/avatar/' + blooperMcAccount.uuid + '/32'"
              width="32"
              height="32"
              :alt="blooperMcAccount.name"
            />
            Sakores
          </li>
        </ul>
      </fake-media>
    </template>
  </template>
</template>

<script setup lang="ts">
import { BAvatar } from 'bootstrap-vue-next'
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { useHead } from '@unhead/vue'

import staff from '../../content/staff.yaml'

import StaffAvatar from '@/components/StaffAvatar.vue'
import FakeMedia from '@/components/FakeMedia.vue'
import { makeMeta } from '@/pageHelpers'

interface Staff {
  name: string
  mcAccounts: { name: string; uuid: string }[]
  discordAccount: string
  avatar: string
  description: string
}

interface StaffGroup {
  id: string
  displayName: string
  members: Staff[]
}

interface Blooper {
  id: string
  name: string
  key: string
  enabled: boolean
  idx: number
  content: string
  mcAccounts: { uuid: string; name: string }[]
}

const bloopers = ref<Blooper[]>([
  {
    id: 'sakores',
    name: 'Sakores',
    key: 'sakores',
    enabled: false,
    idx: 0,
    content: 'Sakores',
    mcAccounts: [{ uuid: '5c395d66-8b15-49c1-957a-3b0b41f9eeba', name: 'Sakires' }],
  },
  {
    id: 'mori',
    name: 'Mori (Machine generated)',
    key: 'mori',
    enabled: false,
    idx: 0,
    content:
      "Remi Hi, I'm Koko. I'm the server or anything else feel free to help out on Yukuricraft. I basically make sure the server, or just mainly slacking around the Mediators on Yukuricraft. I basically make sure the server builds, such as Paintball and deal with people, Warframe, drawing, and just chat, don't feel free to check up on your best behavior. I lurk around the server. I'm one of other things, and just tag me anything, I'm Redleaf, an old builder for about a W.I.P). If there's any help of YukkuriCraft. Whether it's server or issues, feel free to keep our community moving forward, so if I’m online and you need anything let me or one of other probably won't hesitate to oversee the Minecraft communities for Gensokyo, or one that region, you'll most likely be happy to hang out who needs it so please remain playful and other things! Feel free to ask. Birb Hi! I'm Koko. I'm a team in Yukkuricraft. These days, I mostly work on the one of the daily technical side of the paintball minigame, and you want!\n",
    mcAccounts: [],
  },
])

const mcNames = ref<{ [uuid: string]: string }>(
  (() => {
    const mcNames: { [uuid: string]: string } = {}

    for (const staffGroup of staff as StaffGroup[]) {
      for (const member of staffGroup.members) {
        for (const mcAccount of member.mcAccounts) {
          mcNames[mcAccount.uuid] = mcAccount.name
        }
      }
    }

    return mcNames
  })(),
)

watch(mcNames, () => loadRealNames(), { immediate: true })

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
        // eslint-disable-next-line no-console
        console.log(`Secret ${b.name} unlocked`)
      }
    })
}

async function mcUsername(uuid: string, fallback: string) {
  const errorMsg = `Failed to get name for uuid ${uuid}, using fallback ${fallback} instead`

  try {
    const res = await fetch('https://api.minetools.eu/uuid/' + uuid.replaceAll('-', ''))

    if (res.status !== 200) {
      // eslint-disable-next-line no-console
      console.warn(errorMsg)
      return fallback
    } else {
      const profile = await res.json()

      if (typeof profile.error !== 'undefined') {
        // eslint-disable-next-line no-console
        console.warn(errorMsg + '. Error: ' + profile.error)
        return fallback
      } else {
        return profile.name
      }
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn(errorMsg + '. Error: ' + e)
    return fallback
  }
}

async function loadRealNames() {
  const names = mcNames.value
  const realNames = await Promise.all(
    Object.keys(names).map(async (uuid) => [uuid, await mcUsername(uuid, names[uuid])]),
  )

  for (const [uuid, realName] of realNames) {
    mcNames.value[uuid] = realName
  }
}

useHead(
  makeMeta({
    title: 'YukkuriCraft - Staff',
    description: 'The staff of YukkuriCraft.',
    url: 'staff/',
  }),
)
</script>
