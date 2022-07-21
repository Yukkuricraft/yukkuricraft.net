<template>
  <normal-page :parallax-images="images">
    <headful-wrap
      title="YukkuriCraft - Staff"
      description="The staff of YukkuriCraft."
      :image="require('../favicon_upscaled.png')"
      url="https://yukkuricraft.net/staff/"
    />

    <template #parallax>
      <h1>Staff</h1>
    </template>

    <h2>Staff members</h2>
    <p>Get to know our staff members a bit more.</p>

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
                :alt="mcAccount.name"
              />
              {{ mcNames[mcAccount.uuid] }}
            </li>
          </ul>
        </b-media>
      </ul>
    </template>

    <template v-for="blooper in bloopers">
      <template v-if="blooper.enabled">
        <h3 :id="blooper.id" :key="blooper.id + 'BH'" class="mt-5">{{ blooper.name }}</h3>

        <b-media :key="blooper.id + 'BL'" class="mt-5">
          <template #aside>
            <b-avatar variant="primary" size="96" :text="blooper.name.charAt(0)"></b-avatar>
          </template>
          <h4>{{ blooper.name }}</h4>

          <p>{{ blooper.content }}</p>

          <h5>Minecraft accounts</h5>
          <ul class="list-unstyled">
            <li v-for="blooperMcAccount in blooper.mcAccounts" :key="blooperMcAccount.uuid">
              <img :src="'https://mc-heads.net/avatar/' + blooperMcAccount.uuid + '/32'" :alt="blooperMcAccount.name" />
              Sakores
            </li>
          </ul>
        </b-media>
      </template>
    </template>
  </normal-page>
</template>

<script>
import { BAvatar, BMedia } from 'bootstrap-vue'

import NormalPage from '../layout/NormalPage'
import HeadfulWrap from '../components/HeadfulWrap'
import { autoImage } from '../images'
import { isPrerender } from '../prerender'

import staff from '../../content/staff.yaml'
import StaffAvatar from '../components/StaffAvatar'

export default {
  components: {
    StaffAvatar,
    NormalPage,
    BMedia,
    BAvatar,
    HeadfulWrap,
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
      bloopers: [
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
      ],
      mcNames,
    }
  },
  computed: {
    images() {
      return autoImage(
        'people',
        import(/* webpackMode: "eager" */ `!url-loader!../../generated/backgrounds/people_data.jpeg`),
        import(/* webpackMode: "eager" */ `!url-loader!../../generated/backgrounds/people_data.webp`)
      )
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
  mounted() {
    document.addEventListener('keydown', this.processBloopers)
  },
  destroyed() {
    document.removeEventListener('keydown', this.processBloopers)
  },
  methods: {
    processBloopers(event) {
      if (event.isComposing || event.keyCode === 229) {
        return
      }

      this.bloopers
        .filter((b) => !b.enabled)
        .forEach((b) => {
          console.log(b.idx)
          if (b.key.charAt(b.idx) === event.key) {
            b.idx++
          } else {
            b.idx = 0
          }
          console.log(b.idx)
          console.log(b.idx)

          b.enabled = b.key.length === b.idx
          if (b.enabled) {
            // eslint-disable-next-line no-console
            console.log(`Secret ${b.name} unlocked`)
          }
        })
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
