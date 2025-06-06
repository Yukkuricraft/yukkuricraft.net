import { glob } from 'glob'
import announcementList from '../generated/announcementList.json'

function removeMdSuffix(file: string): string {
  return file.endsWith('.md') ? file.substring(0, file.length - 3) : file
}

export interface Page {
  url: string
  priority: string
  mainContent: string[]
  htmlFilename?: string
}

export default [
  { url: '/', priority: '1.0', mainContent: ['./src/pages/InfoPage.vue'] },
  {
    url: '/ranks/',
    priority: '0.80',
    mainContent: [...glob.sync('./src/pages/ranks/**/*.*'), './content/ranks.yaml'],
  },
  { url: '/staff/', priority: '0.80', mainContent: ['./src/pages/staff/StaffPage.vue', './content/staff.yaml'] },
  { url: '/rules/', priority: '0.80', mainContent: ['./content/pages/Rules.md'] },
  {
    url: '/server-activities/survival/',
    priority: '0.70',
    mainContent: ['./content/pages/SurvivalGuide.md', ...glob.sync('./content/pages/images/survival_guide/**/*.*')],
  },
  { url: '/server-activities/paintball/', priority: '0.70', mainContent: ['./content/pages/Paintball.md'] },
  {
    url: '/server-activities/survival/farms/',
    priority: '0.70',
    mainContent: ['./src/pages/SurvivalFarmsPage.vue', './content/locations/farms.yaml'],
  },
  {
    url: '/server-activities/survival/towns/',
    priority: '0.70',
    mainContent: ['./src/pages/SurvivalTownsPage.vue', './content/locations/towns.yaml'],
  },
  {
    url: '/server-activities/yukkurikart/',
    priority: '0.70',
    mainContent: ['./src/pages/YukkuriKartPage.vue', './content/locations/yukkurikart.yaml'],
  },
  {
    url: '/commands/',
    priority: '0.60',
    mainContent: [...glob.sync('./src/pages/commands/**/*.*'), ...glob.sync('./content/commands/**/*.*')],
  },
  { url: '/downloads/gensokyo/', priority: '0.85', mainContent: ['./src/pages/downloads/DownloadGensokyo.vue'] },
  { url: '/downloads/survival/', priority: '0.5', mainContent: ['./src/pages/downloads/DownloadSurvival.vue'] },
  {
    url: '/gensokyo/',
    priority: '0.85',
    mainContent: [...glob.sync('./src/pages/gensokyo/**/*.*'), ...glob.sync('./content/locations/neo_genso/**/*.*')],
  },
  {
    url: '/gensokyo/help/',
    priority: '0.65',
    mainContent: [...glob.sync('./src/pages/gensokyo/**/*.*'), './content/locations/help_locations.yaml'],
  },
  {
    url: '/archive/s4towns/',
    priority: '0.60',
    mainContent: ['./src/pages/S4TownsPage.vue', './content/locations/s4towns.yaml'],
  },
  {
    url: '/announcements/',
    priority: '0.70',
    mainContent: [...glob.sync('./src/pages/announcements/**/*.*'), ...glob.sync('./content/announcements/**/*.*')],
  },
  ...announcementList.map((post) => ({
    url: `/announcements/${'slug' in post && post.slug ? post.slug : removeMdSuffix(post.file)}/`,
    priority: '0.60',
    mainContent: [`./content/announcements/${post.file}`],
  })),
  { url: '/404', noSitemap: true, htmlFilename: '/404.html' },
] as Page[]
