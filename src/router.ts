import { createRouter, createWebHistory, type RouteLocationNormalized, type RouteComponent } from 'vue-router'

import announcementList from '../generated/announcementList.json'
import mdPages from '../content/pages/pages.yaml'
import InfoPage from './pages/InfoPage.vue'
import InfoPageParallax from '@/pages/InfoPageParallax.vue'
import AnnouncementsPage from './pages/announcements/AnnouncementsPage.vue'
import DownloadGenso from './pages/downloads/DownloadGensokyo.vue'
import DownloadSurvival from './pages/downloads/DownloadSurvival.vue'
import _404Page from './pages/404Page.vue'
import AnnouncementPostPage from './pages/announcements/AnnouncementPostPage.vue'

import { removeExtension } from './files'
import { type BackgroundKeys } from '@/images'
import DefaultSidebar from '@/pages/DefaultSidebar.vue'
import DefaultParallax from '@/pages/DefaultParallax.vue'
import DownloadGensoParallax from '@/pages/downloads/DownloadGensoParallax.vue'
import DownloadSurvivalParallax from '@/pages/downloads/DownloadSurvivalParallax.vue'
import SurvivalFarmsParallax from '@/pages/SurvivalFarmsParallax.vue'
import SurvivalTownsParallax from '@/pages/SurvivalTownsParallax.vue'
import LocationsParallax from '@/pages/gensokyo/LocationsParallax.vue'
import HelpParallax from '@/pages/gensokyo/HelpParallax.vue'
import CommandsParallax from '@/pages/commands/CommandsParallax.vue'

interface MdPage {
  vueRouterName: string
  canonicalUrl: string
  path: string
  parallaxImages: string
  contents: string
}

declare module 'vue-router' {
  interface RouteMeta {
    parallaxHeight?: number
    parallaxImage: BackgroundKeys | string[] | null
    sidebarTitle?: string
    isError?: boolean
  }
}

function makeComponents(main: RouteComponent, others?: { parallax?: RouteComponent; sidebar?: RouteComponent }) {
  return {
    default: main,
    parallax: others?.parallax ?? DefaultParallax,
    sidebar: others?.sidebar ?? DefaultSidebar,
  }
}

export function createYcRouter() {
  return createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
      {
        path: '/',
        name: 'info',
        components: makeComponents(InfoPage, {
          parallax: InfoPageParallax,
        }),
        sensitive: true,
        meta: {
          parallaxImage: 'hakurei',
        },
      },
      {
        path: '/announcements/',
        name: 'announcements',
        components: makeComponents(AnnouncementsPage, {
          sidebar: undefined, // TODO
        }),
        sensitive: true,
        meta: {
          parallaxImage: null,
        },
      },
      {
        path: '/ranks/',
        name: 'ranks',
        components: makeComponents(() => import(/* webpackChunkName: "ranksPage" */ './pages/ranks/RanksPage.vue')),
        sensitive: true,
        meta: {
          parallaxImage: 'people',
        },
      },
      {
        path: '/staff/',
        name: 'staff',
        components: makeComponents(() => import(/* webpackChunkName: "staffPage" */ './pages/StaffPage.vue')),
        sensitive: true,
        meta: {
          parallaxImage: 'people',
        },
      },
      {
        path: '/commands/',
        name: 'commands',
        components: makeComponents(() => import(/* webpackChunkName: "commandsPage" */ './pages/commands/CommandsPage.vue'), {
          parallax: CommandsParallax
        }),
        sensitive: true,
        meta: {
          parallaxImage: 'commands',
          sidebarTitle: 'Commands'
        },
      },
      {
        path: '/gensokyo/',
        name: 'gensokyo',
        components: makeComponents(() => import(/* webpackChunkName: "gensokyoPage" */ './pages/gensokyo/LocationsPage.vue'), {
          parallax: LocationsParallax
        }),
        sensitive: true,
        meta: {
          parallaxImage: 'greenhouse',
        },
      },
      {
        path: '/gensokyo/help/',
        name: 'gensokyo_help',
        components: makeComponents(() => import(/* webpackChunkName: "gensokyoHelpPage" */ './pages/gensokyo/HelpPage.vue'), {
          parallax: HelpParallax
        }),
        sensitive: true,
        meta: {
          parallaxImage: 'pond',
        },
      },
      {
        path: '/downloads/gensokyo/',
        name: 'download_genso',
        components: makeComponents(DownloadGenso, {
          parallax: DownloadGensoParallax
        }),
        sensitive: true,
        meta: {
          parallaxImage: 'hakurei_inside',
        },
      },
      {
        path: '/downloads/survival/',
        name: 'download_survival',
        components: makeComponents(DownloadSurvival, {
          parallax: DownloadSurvivalParallax
        }),
        sensitive: true,
        meta: {
          parallaxImage: 'hakurei_inside',
        },
      },
      {
        path: '/server-activities/survival/farms/',
        name: 'survival_farms',
        components: makeComponents(() => import(/* webpackChunkName: "survivalFarmsPage" */ './pages/SurvivalFarmsPage.vue'), {
          parallax: SurvivalFarmsParallax
        }),
        sensitive: true,
        meta: {
          parallaxImage: 'spawner',
          sidebarTitle: 'Farms'
        },
      },
      {
        path: '/server-activities/survival/towns/',
        name: 'survival_towns',
        components: makeComponents(() => import(/* webpackChunkName: "survivalTownsPage" */ './pages/SurvivalTownsPage.vue'), {
          parallax: SurvivalTownsParallax
        }),
        sensitive: true,
        meta: {
          parallaxImage: 'kagome_airships',
          sidebarTitle: 'Towns'
        },
      },
      ...(mdPages as MdPage[]).map((page) => ({
        path: page.path,
        name: page.vueRouterName,
        components: makeComponents(() => import(/* webpackChunkName: "markdownPages" */ './pages/MarkdownPage.vue')),
        props: {
          default: {
            content: () =>
              import(/* webpackChunkName: "mdPage" */ `../content/pages/${removeExtension(page.contents, '.md')}.md`),
            canonicalUrl: page.canonicalUrl,
            parallaxImagesName: page.parallaxImages,
          },
        },
        sensitive: true,
        meta: {
          parallaxImage: ['md_pages', page.parallaxImages],
        },
      })),
      ...announcementList.map((post) => {
        const file = removeExtension(post.file, '.md')
        // @ts-ignore
        const slug = post.slug || file
        const [postYear, postMonth, postFilename] = file.split('/')

        return {
          path: `/announcements/${slug}/`,
          components: makeComponents(AnnouncementPostPage),
          props: {
            default: {
              post: {
                ...post,
                postYear,
                postMonth,
                postFilename,
              }
            },
          },
          sensitive: true,
          meta: {
            parallaxImage: null,
          },
        }
      }),
      {
        path: '/:pathMatch(.*)*',
        name: '404',
        component: _404Page,
        meta: {
          parallaxImage: null,
          isError: true,
        },
      },
    ],
    scrollBehavior(to: RouteLocationNormalized) {
      if (to.hash.length) {
        return { el: '#' + CSS.escape(to.hash.substring(1)) }
      } else {
        return { left: 0, top: 0 }
      }
    },
  })
}
