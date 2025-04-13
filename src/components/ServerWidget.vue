<template>
  <div class="column">
    <div class="card" :style="{ height: hasServerPing ? '100%' : undefined }">
      <div class="card-header">
        <p class="card-header-title is-family-monospace">{{ ip }}</p>
        &nbsp;
        <div class="card-header-icon" style="cursor: inherit">
          <span class="dot mr-2" :class="hasServerPing ? 'has-background-success' : 'has-background-danger'"></span>
          {{ hasServerPing ? 'Online' : 'Offline' }}
        </div>
      </div>
      <div v-if="hasServerPing" class="card-content">
        <!-- eslint-disable-next-line vue/no-v-html vue/no-v-text-v-html-on-component -->
        <h5 class="title is-size-4 is-family-monospace" v-html="parseMCCodes(serverPing.description).raw"></h5>
        <div>
          <br />
          Players: {{ serverPing.players.online }} / {{ serverPing.players.max }}
          <div class="columns">
            <div
              v-for="playerChunk in chunk(serverPing.players.sample, 8)"
              :key="'Chunk' + playerChunk[0].name"
              class="column"
            >
              <ul>
                <li v-for="player in playerChunk" :key="player.name">
                  <minecraft-account v-if="player.name" :name="player.name" />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'

import { parseMCCodes } from '@/colorFormatter'
import MinecraftAccount from '@/components/MinecraftAccount.vue'

const props = defineProps({
  ip: {
    type: String,
    required: true,
  },
  port: {
    type: String,
    default: '25565',
  },
})

function chunk<A>(arr: A[], size: number): A[][] {
  const copy = [...arr]
  const res: A[][] = []
  let currentArr: A[] = []
  let idx = 0
  let obj: A | undefined

  while ((obj = copy.shift())) {
    if (idx === size) {
      res.push(currentArr)
      currentArr = []
      idx = 0
    }

    currentArr.push(obj)
  }
  res.push(currentArr)

  return res
}

interface ServerPing {
  description: string
  players: {
    max: number
    online: number
    sample: {
      name: string
    }[]
  }
  version: {
    name: string
  }
}

const serverPing = ref<ServerPing>({
  description: null as unknown as string,
  players: {
    max: null as unknown as number,
    online: null as unknown as number,
    sample: null as unknown as {
      name: string
    }[],
  },
  version: {
    name: null as unknown as string,
  },
})

const hasServerPing = computed(() => Boolean(serverPing.value.description))

watch(
  () => props.ip,
  () => loadServerInfo(),
  { immediate: true },
)

async function mcPing() {
  const errorMsg = `Failed to get YC server info`

  if (import.meta.env.SSR) {
    return null
  }

  try {
    const res = await fetch(`https://api.minetools.eu/ping/${props.ip}/${props.port}`)

    if (res.status !== 200) {
      console.warn(errorMsg)
      return null
    } else {
      const json = await res.json()

      if (typeof json.error !== 'undefined') {
        console.warn(errorMsg + '. Error: ' + json.error)
        return null
      } else {
        return json
      }
    }
  } catch (e) {
    console.warn(errorMsg + '. Error: ' + e)
    return null
  }
}
async function loadServerInfo() {
  const ping = await mcPing()
  if (ping !== null) {
    serverPing.value.description = ping.description
    serverPing.value.players.max = ping.players.max
    serverPing.value.players.online = ping.players.online
    serverPing.value.players.sample = (ping.players.sample as { name: string }[]).filter((o) => !o.name.includes('§'))
    serverPing.value.version.name = ping.version.name
  }
}
</script>

<style lang="scss">
.dot {
  height: 15px;
  width: 15px;
  background-color: #bbb;
  border-radius: 50%;
  display: inline-block;
}
</style>
