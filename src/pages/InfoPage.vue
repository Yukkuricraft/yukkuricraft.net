<template>
  <b-row class="mt-5">
    <b-col md="6">
      <h2 id='whoAreWe'>Who are we</h2>
      <p>
        Yukkuricraft is the online community that brought you a fully explorable rendition of Gensokyo of Touhou
        Project fame in Minecraft! Our Gensokyo project is a community-led effort - we welcome all players to join the
        fun!
      </p>
    </b-col>
    <b-col md="6">
      <!-- https://css-tricks.com/lazy-load-embedded-youtube-videos/ -->
      <iframe
        class='yt-embed'
        type="iframe"
        title="YC trailer"
        src="https://www.youtube-nocookie.com/embed/FI07wDxl5T8"
        srcdoc="<style>*{padding:0;margin:0;overflow:hidden}html,body{height:100%}img,span{position:absolute;width:100%;top:0;bottom:0;margin:auto}span{height:1.5em;text-align:center;font:48px/1.5 sans-serif;color:white;text-shadow:0 0 0.5em black}</style><a href=https://www.youtube-nocookie.com/embed/FI07wDxl5T8?autoplay=1><img src=https://img.youtube.com/vi/FI07wDxl5T8/hqdefault.jpg alt='【Touhou Minecraft】Gensokyo ~ The Eternal Dream 【TraFI07wDxl5T8'><span>▶</span></a>"
        frameborder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      />
    </b-col>
  </b-row>

  <h2 id='latestAnnouncements'>Latest announcements</h2>
  <div class="mb-5">
    <ul class="list-unstyled">
      <li v-for="post in announcementPosts.slice(0, 3)" :key="post.file" class="mb-3">
        <announcement-excerpt :heading-level="3" :post="post" />
      </li>
    </ul>

    <router-link class="btn btn-primary" :to="{ name: 'announcements' }">More announcements</router-link>
  </div>

  <h2 id='serverAndDiscord'>Server and Discord</h2>
  <b-row>
    <server-widget ip="mc.yukkuricraft.net" />
    <b-col md="4">
      <iframe
        :src="'https://discordapp.com/widget?id=201938197171798017&theme=' + discordTheme"
        loading="lazy"
        width="350"
        height="500"
        allowtransparency="true"
        frameborder="0"
      ></iframe>
    </b-col>
  </b-row>

  <h2 id="subdomains">Our Subdomains and Pages</h2>
  <h3>General</h3>
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

  <h3 id='subdomainsSocialMedia'>Social media</h3>
  <ul>
    <li>
      <a href="https://www.instagram.com/yukkuricraft/" target="noopener">https://www.instagram.com/yukkuricraft/</a>
      - Instagram Page
    </li>
    <li>
      <a href="https://www.youtube.com/c/Yukkuricraft" target="noopener">https://www.youtube.com/c/Yukkuricraft</a>
      - Youtube Channel
    </li>
    <li>
      <a href="https://www.facebook.com/yukkuricraft" target="noopener">https://www.facebook.com/yukkuricraft</a>
      - Facebook Page
    </li>
    <li>
      <a href="https://www.facebook.com/groups/yukkuricraft" target="noopener">
        https://www.facebook.com/groups/yukkuricraft
      </a>
      - Facebook Group
    </li>
    <li>
      <a href="https://steamcommunity.com/groups/yukkuricraft" target="noopener">
        https://steamcommunity.com/groups/yukkuricraft
      </a>
      - Steam Group
    </li>
  </ul>

  <h3 id='subdomainsOther'>Other</h3>
  <ul>
    <li><a href="https://forms.gle/gwFiECrDKNiJwLzH8">Ban appeals</a></li>
  </ul>

  <h2 id="contact">Contact Us</h2>
  <p>
    Honestly, there isn't much to say. This is Remi_Scarlet's contact information. Contact me with your preferred
    method.
  </p>
  <ol>
    <li><strong>Email: </strong>remi (@) yukkuricraft.net</li>
    <li><strong>Discord: </strong>Remi#5619</li>
    <li><strong>Steam: </strong>Mr. Bromilia Amatsukaze Scarlet</li>
  </ol>

  <p>
    Consider following our <a href="https://www.instagram.com/yukkuricraft/">Instagram</a> and liking our
    <a href="https://facebook.com/yukkuricraft">Facebook Page</a>!
  </p>
  <br />
</template>

<script setup lang="ts">
import { BButton, BCol, BRow } from 'bootstrap-vue-next'

import { onMounted, onUnmounted, ref } from 'vue'
import { useMeta } from 'vue-meta'

import ServerWidget from '../components/ServerWidget.vue'
import announcementPosts from '../../generated/announcementList.json'
import AnnouncementExcerpt from './announcements/AnnouncementExcerpt.vue'
import { makeMeta } from '@/pageHelpers'

// Test for SSR
// noinspection JSUnusedLocalSymbols
const useDarkTheme =
  typeof window !== 'undefined'
    ? window.matchMedia('(prefers-color-scheme: dark)')
    : {
        matches: false,
        addEventListener<K extends keyof MediaQueryListEventMap>(
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          type: K,
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          listener: (this: MediaQueryList, ev: MediaQueryListEventMap[K]) => any,
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          options?: boolean | AddEventListenerOptions,
        ) {},
        removeEventListener<K extends keyof MediaQueryListEventMap>(
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          type: K,
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          listener: (this: MediaQueryList, ev: MediaQueryListEventMap[K]) => any,
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

useMeta(makeMeta({
  title: 'YukkuriCraft',
  description: 'Yukkuricraft is the online community that brought you a fully explorable rendition of Gensokyo of Touhou Project fame in Minecraft! Our Gensokyo project is a community-led effort - we welcome all players to join the fun!',
  url: '',
}))
</script>
