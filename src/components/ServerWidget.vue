<template>
  <div class="col-md-8">
    <b-card no-body :style="{ height: hasServerPing ? '100%;' : undefined }">
      <b-card-header>
        <pre style="display: inline">{{ ip }}</pre>
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
                  <img
                    :src="'https://mc-heads.net/avatar/' + player.name + '/32'"
                    width="32"
                    height="32"
                    :alt="player.name"
                  />
                  {{ player.name }}
                </li>
              </ul>
            </div>
          </div>
        </b-card-text>
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
import { BCard, BCardBody, BCardHeader, BCardText, BCardTitle } from 'bootstrap-vue'
import chunk from 'lodash/chunk'

import { parseMCCodes } from '../colorFormatter'

export default {
  components: {
    BCard,
    BCardHeader,
    BCardBody,
    BCardTitle,
    BCardText,
  },
  props: {
    ip: {
      type: String,
      required: true,
    },
    port: {
      type: String,
      default: '25565',
    },
  },
  data() {
    return {
      serverPing: {
        description: null,
        players: {
          max: null,
          online: null,
          sample: null,
        },
        version: {
          name: null,
        },
      },
    }
  },
  computed: {
    hasServerPing() {
      return Boolean(this.serverPing.description)
    },
  },
  watch: {
    ip: {
      immediate: true,
      async handler() {
        await this.loadServerInfo()
      },
    },
  },
  methods: {
    parseMCCodes,
    chunk,
    async mcPing() {
      const errorMsg = `Failed to get YC server info`

      if (typeof window === 'undefined') {
        return null
      }

      try {
        const res = await fetch(`https://api.minetools.eu/ping/${this.ip}/${this.port}`)

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
    },
    async loadServerInfo() {
      const ping = await this.mcPing()
      if (ping !== null) {
        this.serverPing.description = ping.description
        this.serverPing.players.max = ping.players.max
        this.serverPing.players.online = ping.players.online
        this.serverPing.players.sample = ping.players.sample.filter((o) => !o.name.includes('§'))
        this.serverPing.version.name = ping.version.name
      }
    },
  },
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
