<template>
  <div class="col-md-8">
    <b-card no-body :style="{ height: hasServerPing ? '100%' : undefined }">
      <b-card-header>
        <pre style="display: inline">{{ ip }}</pre>
        &nbsp;
        <span class="bg-success dot" :class="hasServerPing ? 'bg-success' : 'bg-danger'"></span>
        {{ hasServerPing ? 'Online' : 'Offline' }}
      </b-card-header>
      <b-card-body v-if="hasServerPing">
        <!-- eslint-disable-next-line vue/no-v-html vue/no-v-text-v-html-on-component -->
        <b-card-title class="h5" v-html="parseMCCodes(serverPing.description).raw"></b-card-title>
        <b-card-text>
          <br />
          Players: {{ serverPing.players.online }} / {{ serverPing.players.max }}
          <div class="row">
            <div
              v-for="playerChunk in chunk(serverPing.players.sample, 8)"
              :key="'Chunk' + playerChunk[0].name"
              class="col-xl-4 col-lg-6 col-md-12"
            >
              <ul class="list-unstyled">
                <li v-for="player in playerChunk" :key="player.name">
                  <minecraft-account v-if="player.name" :name="player.name" />
                </li>
              </ul>
            </div>
          </div>
        </b-card-text>
      </b-card-body>
    </b-card>
  </div>
</template>

<script setup lang="ts">
import { BCard, BCardBody, BCardHeader, BCardText, BCardTitle } from 'bootstrap-vue-next'
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

  // eslint-disable-next-line no-cond-assign
  while(obj = copy.shift()) {
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
      // eslint-disable-next-line no-console
      console.warn(errorMsg)
      return null
    } else {
      const json = await res.json()

      if (typeof json.error !== 'undefined') {
        // eslint-disable-next-line no-console
        console.warn(errorMsg + '. Error: ' + json.error)
        return null
      } else {
        return json
      }
    }
  } catch (e) {
    // eslint-disable-next-line no-console
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
