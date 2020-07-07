let glob = require('glob');

module.exports = [
	{url: '/', priority: '1.0', mainContent: ['./src/pages/InfoPage.vue']},
	{url: '/ranks/', priority: '0.80', mainContent: ['./src/pages/RanksPage.vue']},
	{url: '/staff/', priority: '0.80', mainContent: ['./src/pages/StaffPage.vue', './src/pages/staff.yaml']},
	{url: '/rules/', priority: '0.80', mainContent: ['./src/pages/RulesEN.md']},
	{url: '/commands/', priority: '0.60', mainContent: glob.sync('./src/pages/commands/**.*')},
	{url: '/downloads/gensokyo/', priority: '0.85', mainContent: ['./src/pages/downloads/Download.vue']},
	{url: '/downloads/survival/', priority: '0.5', mainContent: ['./src/pages/downloads/DownloadSurvival.vue']},
	{url: '/gensokyo/', priority: '0.85', mainContent: glob.sync('./src/pages/gensokyo/**.*')},
	{url: '/gensokyo/help/', priority: '0.65', mainContent: glob.sync('./src/pages/gensokyo/**.*')},
	{url: '/404', noSitemap: true},
]