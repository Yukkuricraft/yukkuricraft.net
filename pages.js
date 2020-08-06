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
    mainContent: ['./src/pages/ranks/RanksPage.vue', './src/pages/ranks/RankGroup.vue', './content/ranks.yaml'],
  },
  { url: '/staff/', priority: '0.80', mainContent: ['./src/pages/StaffPage.vue', './content/staff.yaml'] },
  { url: '/rules/', priority: '0.80', mainContent: ['./content/pages/RulesEN.md'] },
  { url: '/commands/', priority: '0.60', mainContent: glob.sync('./src/pages/commands/**.*') },
  { url: '/downloads/gensokyo/', priority: '0.85', mainContent: ['./src/pages/downloads/Download.vue'] },
  { url: '/downloads/survival/', priority: '0.5', mainContent: ['./src/pages/downloads/DownloadSurvival.vue'] },
  { url: '/gensokyo/', priority: '0.85', mainContent: glob.sync('./src/pages/gensokyo/**.*') },
  { url: '/gensokyo/help/', priority: '0.65', mainContent: glob.sync('./src/pages/gensokyo/**.*') },
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
