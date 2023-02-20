import VueRouter from 'vue-router'

import announcementList from '../generated/announcementList.json'
import mdPages from '../content/pages/pages.yaml'
import InfoPage from './pages/InfoPage'
import AnnouncementsPage from './pages/announcements/AnnouncementsPage'
import DownloadGenso from './pages/downloads/DownloadGensokyo'
import DownloadSurvival from './pages/downloads/DownloadSurvival'
import _404Page from './pages/404Page'
import AnnouncementPostPage from './pages/announcements/AnnouncementPostPage'
import LoadingPage from './pages/LoadingPage'
import ErrorPage from './pages/ErrorPage'

import { removeExtension } from './files'

function asyncComponent(component) {
  return () => ({
    component: component(),
    loadinmg: LoadingPage,
    error: ErrorPage,
  })
}

export function createRouter() {
  return new VueRouter({
    base: '/',
    mode: 'history',
    routes: [
      {
        path: '/',
        name: 'info',
        component: InfoPage,
        pathToRegexpOptions: { strict: true },
      },
      {
        path: '/announcements/',
        name: 'announcements',
        component: AnnouncementsPage,
        pathToRegexpOptions: { strict: true },
      },
      {
        path: '/ranks/',
        name: 'ranks',
        component: asyncComponent(() => import(/* webpackChunkName: "ranksPage" */ './pages/ranks/RanksPage')),
        pathToRegexpOptions: { strict: true },
      },
      {
        path: '/staff/',
        name: 'staff',
        component: asyncComponent(() => import(/* webpackChunkName: "staffPage" */ './pages/StaffPage')),
        pathToRegexpOptions: { strict: true },
      },
      {
        path: '/commands/',
        name: 'commands',
        component: asyncComponent(() => import(/* webpackChunkName: "commandsPage" */ './pages/commands/CommandsPage')),
        pathToRegexpOptions: { strict: true },
      },
      {
        path: '/gensokyo/',
        name: 'gensokyo',
        component: asyncComponent(() =>
          import(/* webpackChunkName: "gensokyoPage" */ './pages/gensokyo/LocationsPage')
        ),
        pathToRegexpOptions: { strict: true },
      },
      {
        path: '/gensokyo/help/',
        name: 'gensokyo_help',
        component: asyncComponent(() => import(/* webpackChunkName: "gensokyoHelpPage" */ './pages/gensokyo/HelpPage')),
        pathToRegexpOptions: { strict: true },
      },
      {
        path: '/downloads/gensokyo/',
        name: 'download_genso',
        component: DownloadGenso,
        pathToRegexpOptions: { strict: true },
      },
      {
        path: '/downloads/survival/',
        name: 'download_survival',
        component: DownloadSurvival,
        pathToRegexpOptions: { strict: true },
      },
      {
        path: '/server-activities/survival/farms/',
        name: 'survival_farms',
        component: asyncComponent(() =>
          import(/* webpackChunkName: "survivalFarmsPage" */ './pages/SurvivalFarmsPage')
        ),
        pathToRegexpOptions: { strict: true },
      },
      {
        path: '/server-activities/survival/towns/',
        name: 'survival_towns',
        component: asyncComponent(() =>
          import(/* webpackChunkName: "survivalFarmsPage" */ './pages/SurvivalTownsPage')
        ),
        pathToRegexpOptions: { strict: true },
      },
      ...mdPages.map((page) => ({
        path: page.path,
        name: page.vueRouterName,
        component: asyncComponent(() => import(/* webpackChunkName: "markdownPages" */ './pages/MarkdownPage')),
        props: {
          localizedComponents: page.localizations,
          canonicalUrl: page.canonicalUrl,
          parallaxImages: page.parallaxImages,
        },
        pathToRegexpOptions: { strict: true },
      })),
      ...announcementList.map((post) => {
        const file = removeExtension(post.file, '.md')
        const slug = post.slug || file

        return {
          path: `/announcements/${slug}/`,
          component: AnnouncementPostPage,
          props: {
            post,
          },
          pathToRegexpOptions: { strict: true },
        }
      }),
      {
        path: '*',
        name: '404',
        component: _404Page,
      },
    ],
    scrollBehavior(to, from, savedPosition) {
      if (to.hash.length) {
        return { selector: '#' + CSS.escape(to.hash.substring(1)) }
      } else {
        return { x: 0, y: 0 }
      }
    },
  })
}
