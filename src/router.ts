import {
  createRouter,
  createWebHistory,
  type RouteLocationNormalized,
  type RouteComponent,
  createMemoryHistory,
} from 'vue-router'

import announcementList from '@gen/announcementList.json'
import mdPages from '@cont/pages/pages.yaml'
import _404Page from '@/pages/404Page.vue'

import { removeExtension } from '@/files'
import { type BackgroundKeys } from '@/images'
import DefaultSidebar from '@/pages/DefaultSidebar.vue'
import DefaultParallax from '@/pages/DefaultParallax.vue'

interface MdPage {
  vueRouterName: string
  canonicalUrl: string
  path: string
  parallaxImages: string
  parallaxTitle: string
  contents: string
}

declare module 'vue-router' {
  interface RouteMeta {
    parallaxHeight?: number
    parallaxImage: BackgroundKeys | string[] | null
    parallaxTitle?: string
    parallaxParagraph?: string
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
    history: import.meta.env.SSR
      ? createMemoryHistory(import.meta.env.BASE_URL)
      : createWebHistory(import.meta.env.BASE_URL),
    routes: [
      {
        path: '/',
        name: 'info',
        components: makeComponents(() => import('@/pages/InfoPage.vue'), {
          parallax: () => import('@/pages/InfoPageParallax.vue'),
        }),
        sensitive: true,
        meta: {
          parallaxImage: 'hakurei',
        },
      },
      {
        path: '/announcements/',
        name: 'announcements',
        components: makeComponents(() => import('@/pages/announcements/AnnouncementsPage.vue')),
        sensitive: true,
        meta: {
          parallaxImage: null,
          sidebarTitle: 'Announcements'
        },
      },
      {
        path: '/ranks/',
        name: 'ranks',
        components: makeComponents(() => import('@/pages/ranks/RanksPage.vue')),
        sensitive: true,
        meta: {
          parallaxImage: 'people',
          parallaxTitle: 'Ranks',
        },
      },
      {
        path: '/staff/',
        name: 'staff',
        components: makeComponents(() => import('@/pages/staff/StaffPage.vue')),
        sensitive: true,
        meta: {
          parallaxImage: 'people',
          parallaxTitle: 'Staff',
        },
      },
      {
        path: '/commands/',
        name: 'commands',
        components: makeComponents(() => import('@/pages/commands/CommandsPage.vue')),
        sensitive: true,
        meta: {
          parallaxImage: 'commands',
          parallaxTitle: 'Commands',
          parallaxParagraph: 'Find commonly used commands here',
          sidebarTitle: 'Commands',
        },
      },
      {
        path: '/gensokyo/',
        name: 'gensokyo',
        components: makeComponents(() => import('@/pages/gensokyo/LocationsPage.vue')),
        sensitive: true,
        meta: {
          parallaxImage: 'greenhouse',
          parallaxTitle: 'Locations in Gensokyo',
          parallaxParagraph: 'Explore our builds in Gensokyo.',
        },
      },
      {
        path: '/gensokyo/help/',
        name: 'gensokyo_help',
        components: makeComponents(() => import('@/pages/gensokyo/HelpPage.vue')),
        sensitive: true,
        meta: {
          parallaxImage: 'pond',
          parallaxTitle: 'Help us build Gensokyo',
          parallaxParagraph:
            'We always need more hands to help us build Gensokyo. Here is a list of our ongoing projects.',
        },
      },
      {
        path: '/downloads/gensokyo/',
        name: 'download_genso',
        components: makeComponents(() => import('@/pages/downloads/DownloadGensokyo.vue'), {
          parallax: () => import('@/pages/downloads/DownloadGensoParallax.vue'),
        }),
        sensitive: true,
        meta: {
          parallaxImage: 'hakurei_inside',
        },
      },
      {
        path: '/downloads/survival/',
        name: 'download_survival',
        components: makeComponents(() => import('@/pages/downloads/DownloadSurvival.vue')),
        sensitive: true,
        meta: {
          parallaxImage: 'hakurei_inside',
          parallaxTitle: 'Past Survival downloads',
          parallaxParagraph: 'Download the maps of past survival worlds',
        },
      },
      {
        path: '/server-activities/survival/farms/',
        name: 'survival_farms',
        components: makeComponents(() => import('@/pages/SurvivalFarmsPage.vue')),
        sensitive: true,
        meta: {
          parallaxImage: 'spawner',
          parallaxTitle: 'Public Farms',
          parallaxParagraph: 'Discover and enjoy our public farms in Survival.',
          sidebarTitle: 'Farms',
        },
      },
      {
        path: '/server-activities/survival/towns/',
        name: 'survival_towns',
        components: makeComponents(() => import('@/pages/SurvivalTownsPage.vue')),
        sensitive: true,
        meta: {
          parallaxImage: 'kagome_airships',
          parallaxTitle: 'Towns',
          parallaxParagraph: 'Explore the various public towns and cities in Survival.',
          sidebarTitle: 'Towns',
        },
      },
      {
        path: '/server-activities/yukkurikart/',
        name: 'yukkurikart',
        components: makeComponents(() => import('@/pages/YukkuriKartPage.vue')),
        sensitive: true,
        meta: {
          parallaxImage: 'yukkurikart',
          parallaxTitle: 'YukkuriKart',
          parallaxParagraph: 'Experience fast-paced ice boat racing fun in this new minigame.',
          sidebarTitle: 'YukkuriKart',
        },
      },
      ...(mdPages as MdPage[]).map((page) => ({
        path: page.path,
        name: page.vueRouterName,
        components: makeComponents(() => import('@/pages/MarkdownPage.vue')),
        props: {
          default: {
            content: () => import(`../content/pages/${removeExtension(page.contents, '.md')}.md`),
            canonicalUrl: page.canonicalUrl,
            parallaxImagesName: page.parallaxImages,
            parallaxTitle: '',
          },
        },
        sensitive: true,
        meta: {
          parallaxImage: ['md_pages', page.parallaxImages],
          parallaxTitle: page.parallaxTitle,
        },
      })),
      ...announcementList.map((post) => {
        const file = removeExtension(post.file, '.md')
        // @ts-expect-error No idea
        const slug = post.slug || file
        const [postYear, postMonth, postFilename] = file.split('/')

        return {
          path: `/announcements/${slug}/`,
          components: makeComponents(() => import('@/pages/announcements/AnnouncementPostPage.vue'), {
            sidebar: () => import('@/pages/announcements/AnnouncementPostSidebar.vue'),
          }),
          props: {
            default: {
              post: {
                ...post,
                postYear,
                postMonth,
                postFilename,
              },
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
