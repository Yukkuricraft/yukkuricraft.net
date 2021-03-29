const fs = require('fs')
const glob = require('glob')
const yaml = require('yaml')

const content = fs.readFileSync('./content/announcements/announcementList.yaml', { encoding: 'utf-8' })
const announcementList = yaml.parse(content)

function removeMdSuffix(file) {
  return file.endsWith('.md') ? file.substring(0, file.length - 3) : file
}

module.exports = [
  { url: '/', priority: '1.0', mainContent: ['./src/pages/InfoPage.vue'] },
  {
    url: '/ranks/',
    priority: '0.80',
    mainContent: [glob.sync('./src/pages/ranks/**.*'), './content/ranks.yaml'],
  },
  { url: '/staff/', priority: '0.80', mainContent: ['./src/pages/StaffPage.vue', './content/staff.yaml'] },
  { url: '/rules/', priority: '0.80', mainContent: ['./content/pages/RulesEN.md'] },
  {
    url: '/server-activities/survival/',
    priority: '0.70',
    mainContent: ['./content/pages/SurvivalGuideEN.md', ...glob.sync('./content/pages/images/survival_guide/**.*')],
  },
  { url: '/server-activities/paintball/', priority: '0.70', mainContent: ['./content/pages/PaintballEN.md'] },
  {
    url: '/server-activities/farms-towns/',
    priority: '0.70',
    mainContent: ['./src/pages/SurvivalFarmsTowns.vue', './content/locations/farms_towns.yaml'],
  },
  {
    url: '/commands/',
    priority: '0.60',
    mainContent: [...glob.sync('./src/pages/commands/**.*'), ...glob.sync('./content/commands/**.*')],
  },
  { url: '/downloads/gensokyo/', priority: '0.85', mainContent: ['./src/pages/downloads/Download.vue'] },
  { url: '/downloads/survival/', priority: '0.5', mainContent: ['./src/pages/downloads/DownloadSurvival.vue'] },
  {
    url: '/gensokyo/',
    priority: '0.85',
    mainContent: [
      ...glob.sync('./src/pages/gensokyo/**.*'),
      './content/locations/locationList.yaml',
      ...glob.sync('./content/locations/neo/**.*'),
    ],
  },
  {
    url: '/gensokyo/help/',
    priority: '0.65',
    mainContent: [...glob.sync('./src/pages/gensokyo/**.*'), './content/locations/help_locations.yaml'],
  },
  {
    url: '/announcements/',
    priority: '0.70',
    mainContent: [...glob.sync('./src/pages/announcements/**.*'), ...glob.sync('./content/announcements/**.*')],
  },
  ...announcementList.posts.map((post) => ({
    url: `/announcements/${post.slug || removeMdSuffix(post.file)}/`,
    priority: '0.60',
    mainContent: [`./content/announcements/${removeMdSuffix(post.file)}.md`],
  })),
  { url: '/404', noSitemap: true },
]
