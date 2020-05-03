import Vue from 'vue'
import VueRouter from "vue-router";
import VueI18n from "vue-i18n";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import "./fontAwesomeLibrary";

import "bootstrap";
import "./scss/app.scss";

import "css.escape";

import InfoPage from './pages/InfoPage'
import RulesPage from './pages/RulesPage'
import RanksStaffPage from './pages/RanksStaffPage'
import CommandsPage from './pages/commands/CommandsPage'
import GensokyoLocationsPage from "./pages/gensokyo/LocationsPage";
import GensokyoHelpPage from "./pages/gensokyo/HelpPage";
import DownloadGenso from "./pages/downloads/Download";
import DownloadSurvival from "./pages/downloads/DownloadSurvival";

import mdPages from "./pages/markdown/pages"

import App from './App.vue'
import MarkdownPage from "./pages/markdown/MarkdownPage";

Vue.use(VueRouter);
Vue.use(VueI18n);

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.config.productionTip = false;

const supportedLocales = ['en'];

let preferredLanguage = window.navigator.language.slice(0, 2);
let usedLocale = supportedLocales.includes(preferredLanguage) ? preferredLanguage : 'en';

const i18n = new VueI18n({
	locale: usedLocale
})

const router = new VueRouter({
	base: '/',
	mode: 'history',
	routes: [
		{
			path: '/',
			name: 'info',
			component: InfoPage
		},
		{
			path: '/rules',
			name: 'rules',
			component: RulesPage
		},
		{
			path: '/ranks_staff',
			name: 'ranks_staff',
			component: RanksStaffPage
		},
		{
			path: '/commands',
			name: 'commands',
			component: CommandsPage
		},
		{
			path: '/gensokyo',
			name: 'gensokyo',
			component: GensokyoLocationsPage
		},
		{
			path: '/gensokyo/help',
			name: 'gensokyo_help',
			component: GensokyoHelpPage
		},
		{
			path: '/downloads/gensokyo',
			name: 'download_genso',
			component: DownloadGenso
		},
		{
			path: '/downloads/survival',
			name: 'download_survival',
			component: DownloadSurvival
		},
		...mdPages.map(({title, path, parallaxClass, content, localizedContent}) => ({
			path,
			component: MarkdownPage,
			props: {
				title,
				parallaxClass,
				content,
				localizedContent
			}
		}))
	],
	scrollBehavior(to, from, savedPosition) {
		if(to.hash.length) {
			return { selector: '#' + CSS.escape(to.hash.substring(1)) }
		} else {
			return { x: 0, y: 0 }
		}
	}
})

const app = new Vue({
	el: '#app',
	render: createElement => createElement(App),
	router,
	i18n,
	mounted() {
		// You'll need this for renderAfterDocumentEvent.
		document.dispatchEvent(new Event('render-event'))
	}
});