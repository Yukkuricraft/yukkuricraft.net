<template>
  <normal-page :parallax-images="images">
    <vue-headful
      title="YukkuriCraft - Staff"
      description="The staff of YukkuriCraft."
      :image="require('../favicon_upscaled.png')"
      url="https://yukkuricraft.net/staff/"
    />

    <template #parallax>
      <h1>Staff</h1>
    </template>

    <h2>Staff members</h2>
    Get to know our staff members a bit more.

    <template v-for="staffGroup in staff">
      <h3 :id="staffGroup.id" :key="staffGroup.id + 'H'" class="mt-5">{{ staffGroup.displayName }}</h3>

      <ul :key="staffGroup.id + 'L'" class="list-unstyled">
        <b-media
          v-for="staffMember in staffGroup.members"
          :key="staffGroup.id + staffMember.name"
          tag="li"
          class="mt-5"
        >
          <template #aside>
            <b-avatar variant="primary" size="96" :text="staffMember.name.substring(0, 1)">
              <img
                v-if="
                  staffAvatars[staffGroup.id + '-' + staffMember.name] &&
                  staffAvatars[staffGroup.id + '-' + staffMember.name].loaded
                "
                loading="lazy"
                class="b-avatar-img"
                :src="staffAvatars[staffGroup.id + '-' + staffMember.name].avatar"
                :alt="staffMember.name"
              />
              <span v-else class="b-avatar-text" style="font-size: 40px;">
                {{ staffMember.name.substring(0, 1) }}
              </span>
            </b-avatar>
          </template>
          <h4>{{ staffMember.name }}</h4>

          <p>{{ staffMember.description }}</p>

          <h5>Minecraft accounts</h5>
          <ul class="list-unstyled">
            <li v-for="mcAccount in staffMember.mcAccounts" :key="mcAccount.uuid">
              <img
                loading="lazy"
                :src="'https://mc-heads.net/avatar/' + mcAccount.uuid + '/32'"
                :alt="mcAccount.name"
              />
              {{ mcNames[mcAccount.uuid] }}
            </li>
          </ul>
        </b-media>
      </ul>
    </template>

    <template v-if="sakores">
      <h3 id="sakores" class="mt-5">Sakores</h3>

      <b-media class="mt-5">
        <template #aside>
          <b-avatar variant="primary" size="96" text="S"></b-avatar>
        </template>
        <h4>Sakores</h4>

        <p>Sakores</p>

        <h5>Minecraft accounts</h5>
        <ul class="list-unstyled">
          <li>
            <img :src="'https://mc-heads.net/avatar/5c395d66-8b15-49c1-957a-3b0b41f9eeba/32'" alt="Sakores" />
            Sakores
          </li>
        </ul>
      </b-media>
    </template>
  </normal-page>
</template>

<script>
import { BAvatar, BMedia } from 'bootstrap-vue'

import NormalPage from '../layout/NormalPage'
import { autoImage } from '../images'
import { isPrerender } from '../prerender'
import { removeExtension } from '../files'

import staff from '../../content/staff.yaml'

export default {
  components: {
    NormalPage,
    BMedia,
    BAvatar,
  },
  data() {
    const mcNames = {}

    for (const staffGroup of staff) {
      for (const member of staffGroup.members) {
        for (const mcAccount of member.mcAccounts) {
          mcNames[mcAccount.uuid] = mcAccount.name
        }
      }
    }

    return {
      staffAvatars: {},
      sakores: false,
      sakoresIdx: 0,
      mcNames,
    }
  },
  computed: {
    images() {
      return autoImage('people')
    },
    staff() {
      return staff
    },
  },
  watch: {
    mcNames: {
      immediate: true,
      handler() {
        if (!isPrerender) {
          this.loadRealNames()
        }
      },
    },
  },
  created() {
    this.loadAvatars()

    document.addEventListener('keydown', this.processSakores)
  },
  destroyed() {
    document.removeEventListener('keydown', this.processSakores)
  },
  methods: {
    processSakores(event) {
      if (event.isComposing || event.keyCode === 229 || this.sakores) {
        return
      }

      if ('sakores'.charAt(this.sakoresIdx) === event.key) {
        this.sakoresIdx++
      } else {
        this.sakoresIdx = 0
      }

      this.sakores = 'sakores'.length === this.sakoresIdx
    },
    async loadAvatars() {
      for (const staffGroup of staff) {
        for (const staffMember of staffGroup.members) {
          const key = staffGroup.id + '-' + staffMember.name

          this.$set(this.staffAvatars, key, { loaded: false })

          if (!staffMember.avatar) {
            continue
          }

          const fileName = removeExtension(staffMember.avatar, '.png')
          const extension = Modernizr.webp ? '.webp' : '.png'

          const img = (await import(/* webpackMode: "eager" */ '../../generated/avatars/' + fileName + extension))
            .default
          this.$set(this.staffAvatars, key, { loaded: true, avatar: img })
        }
      }
    },
    async mcUsername(uuid, fallback) {
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
    },
    async loadRealNames() {
      for (const uuid of Object.keys(this.mcNames)) {
        const name = await this.mcUsername(uuid, this.mcNames[uuid])
        this.$set(this.mcNames, uuid, name)
      }
    },
  },
}
</script>
