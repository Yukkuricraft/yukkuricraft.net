<template>
  <div class="columns">
    <div class="column">
      <h2 id="whoAreWe" class="title is-size-2">Who are we</h2>
      <p>
        Yukkuricraft is the online community that brought you a fully explorable rendition of Gensokyo of Touhou Project
        fame in Minecraft! Our Gensokyo project is a community-led effort - we welcome all players to join the fun!
      </p>
    </div>
    <div class="column">
      <!-- https://css-tricks.com/lazy-load-embedded-youtube-videos/ -->
      <iframe
        class="image is-16by9"
        style="width: 100%"
        type="iframe"
        title="YC trailer"
        src="https://www.youtube-nocookie.com/embed/FI07wDxl5T8"
        srcdoc="<style>*{padding:0;margin:0;overflow:hidden}html,body{height:100%}img,span{position:absolute;width:100%;top:0;bottom:0;margin:auto}span{height:1.5em;text-align:center;font:48px/1.5 sans-serif;color:white;text-shadow:0 0 0.5em black}</style><a href=https://www.youtube-nocookie.com/embed/FI07wDxl5T8?autoplay=1><img src=https://img.youtube.com/vi/FI07wDxl5T8/hqdefault.jpg alt='【Touhou Minecraft】Gensokyo ~ The Eternal Dream 【TraFI07wDxl5T8'><span>▶</span></a>"
        frameborder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      />
    </div>
  </div>

  <h2 id="latestAnnouncements" class="title is-size-2">Latest announcements</h2>
  <div class="block">
    <ul>
      <li v-for="post in announcementPosts.slice(0, 3)" :key="post.file" class="mb-3">
        <AnnouncementExcerpt :heading-level="3" :post="post" />
      </li>
    </ul>

    <router-link class="button is-primary has-text-white" :to="{ name: 'announcements' }"
      >More announcements</router-link
    >
  </div>

  <h2 id="serverAndDiscord" class="title is-size-2">Server and Discord</h2>
  <div class="columns">
    <server-widget ip="mc.yukkuricraft.net" />
    <div class="is-one-third">
      <iframe
        :src="'https://discordapp.com/widget?id=201938197171798017&theme=' + discordTheme"
        loading="lazy"
        width="350"
        height="500"
        allowtransparency="true"
        frameborder="0"
      ></iframe>
    </div>
  </div>

  <h2 id="partners" class="title is-size-2">Partners</h2>
  <p class="subtitle">A list of communities that are officially partnered with Yukkuricraft</p>

  <div v-for="partner in partners" :key="partner.id" class="columns">
    <div class="column">
      <h3 :id="partner.id" class="is-size-3">{{ partner.name }}</h3>
      <p>{{ partner.description }}</p>
    </div>
    <div v-if="partner.image" class="column">
      <img :src="partner.image" :alt="partner.id" loading="lazy" />
    </div>
  </div>

  <h2 id="subdomains" class="title is-size-2">Our Subdomains and Pages</h2>
  <div class="block">
    <h3 class="is-size-4">General</h3>
    <ul>
      <li>
        <router-link :to="{ name: 'info' }">https://yukkuricraft.net</router-link>
        - You're looking at it right now! This is our main homepage.
      </li>
      <li>mc.yukkuricraft.net - Join this IP to play on our server!</li>
      <li>
        <a href="https://discord.yukkuricraft.net/" target="noopener">https://discord.yukkuricraft.net/</a> - Our
        Discord server
      </li>
      <li>
        <a href="http://mc.yukkuricraft.net:18123" target="noopener">https://mc.yukkuricraft.net:18123</a> - Our dynmap!
      </li>
      <li>
        <a href="https://bugs.yukkuricraft.net" target="noopener">https://bugs.yukkuricraft.net</a> - This will take you
        to a page where you can submit a bug report for anything that needs to be fixed! No login required!
      </li>
      <li>
        <a href="https://forums.yukkuricraft.net" target="noopener">https://forums.yukkuricraft.net</a> - Our forums!
      </li>
    </ul>
  </div>

  <div class="block">
    <h3 id="subdomainsSocialMedia" class="is-size-4">Social media</h3>
    <ul>
      <li>
        <a href="https://www.youtube.com/c/Yukkuricraft" target="noopener">https://www.youtube.com/c/Yukkuricraft</a>
        - Youtube Channel
      </li>
      <li>
        <a href="https://linktr.ee/yukkuricraft" target="noopener">
          https://linktr.ee/yukkuricraft
        </a>
        - Linktree
      </li>
      <li>
        <a href="https://www.instagram.com/yukkuricraft/" target="noopener">https://www.instagram.com/yukkuricraft/</a>
        - Instagram Page
      </li>
      <li>
        <a href="https://www.facebook.com/yukkuricraft" target="noopener">https://www.facebook.com/yukkuricraft</a>
        - Facebook Page
      </li>
      <li>
        <a href="https://x.com/YukkuriCraft" target="noopener">
          https://twitter.com/YukkuriCraft
        </a>
        - Twitter Page
      </li>
      <li>
        <a href="https://www.tumblr.com/yukkuricraft" target="noopener">
          https://www.tumblr.com/yukkuricraft
        </a>
        - Tumblr Page
      </li>
      <li>
        <a href="https://github.com/yukkuricraft" target="noopener">
          https://github.com/yukkuricraft
        </a>
        - Github organization
      </li>
    </ul>
  </div>

  <div class="block">
    <h3 id="subdomainsOther" class="is-size-4">Other</h3>
    <ul>
      <li><a href="https://forms.gle/gwFiECrDKNiJwLzH8">Ban appeals</a></li>
    </ul>
  </div>

  <h2 id="contact" class="title is-size-2">Contact Us</h2>
  <p class="subtitle">
    Honestly, there isn't much to say. This is Remi_Scarlet's contact information. Contact me with your preferred
    method.
  </p>
  <div class="block">
    <ol>
      <li><strong>Email: </strong>remi (@) yukkuricraft.net</li>
      <li><strong>Discord: </strong>remiscarlet</li>
      <li><strong>Steam: </strong>Mr. Bromilia Amatsukaze Scarlet</li>
    </ol>
  </div>

  <p class="block">
    Consider following our <a href="https://www.instagram.com/yukkuricraft/">Instagram</a> and liking our
    <a href="https://facebook.com/yukkuricraft">Facebook Page</a>!
  </p>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { useHead } from '@unhead/vue'

import announcementPosts from '@gen/announcementList.json'
import partners from '@cont/partners.yaml'
import AnnouncementExcerpt from './announcements/AnnouncementExcerpt.vue'
import ServerWidget from '@/components/ServerWidget.vue'
import { makeMeta } from '@/pageHelpers'

// noinspection JSUnusedLocalSymbols
const useDarkTheme = !import.meta.env.SSR
  ? window.matchMedia('(prefers-color-scheme: dark)')
  : {
      matches: false,
      addEventListener<K extends keyof MediaQueryListEventMap>(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        type: K,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        listener: (this: MediaQueryList, ev: MediaQueryListEventMap[K]) => unknown,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        options?: boolean | AddEventListenerOptions,
      ) {},
      removeEventListener<K extends keyof MediaQueryListEventMap>(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        type: K,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        listener: (this: MediaQueryList, ev: MediaQueryListEventMap[K]) => unknown,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        options?: boolean | EventListenerOptions,
      ) {},
    }

const discordTheme = ref(useDarkTheme.matches ? 'dark' : 'light')

function onDarkThemeChange(event: MediaQueryListEvent) {
  discordTheme.value = event.matches ? 'dark' : 'light'
}

onMounted(() => {
  useDarkTheme.addEventListener('change', onDarkThemeChange)
})

onUnmounted(() => {
  useDarkTheme.removeEventListener('change', onDarkThemeChange)
})

useHead({
  title: 'Yukkuricraft',
})

useHead(
  makeMeta({
    title: 'Yukkuricraft',
    description:
      'Yukkuricraft is the online community that brought you a fully explorable rendition of Gensokyo of Touhou Project fame in Minecraft! Our Gensokyo project is a community-led effort - we welcome all players to join the fun!',
    url: '',
  }),
)
</script>
