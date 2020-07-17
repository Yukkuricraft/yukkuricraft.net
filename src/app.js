import "regenerator-runtime/runtime.js";

import Vue from 'vue'
import VueRouter from "vue-router";
import VueI18n from "vue-i18n";
import Vuex from 'vuex';
import vueHeadful from 'vue-headful';

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import "./fontAwesomeLibrary";

import "./scss/app.scss";

import "css.escape";

import InfoPage from './pages/InfoPage'
import AnnouncementsPage from "./pages/announcements/AnnouncementsPage";
import AnnouncementPostPage from "./pages/announcements/AnnouncementPostPage";
import announcementList from "./pages/announcements/announcementList.yaml";
import RanksPage from './pages/RanksPage'
import StaffPage from "./pages/StaffPage";
import CommandsPage from './pages/commands/CommandsPage'
import GensokyoLocationsPage from "./pages/gensokyo/LocationsPage";
import GensokyoHelpPage from "./pages/gensokyo/HelpPage";
import DownloadGenso from "./pages/downloads/Download";
import DownloadSurvival from "./pages/downloads/DownloadSurvival";
import _404Page from "./pages/404Page";

import App from './App.vue'
import MarkdownPage from "./pages/MarkdownPage";

import {store} from "./stores/index";
import {autoImage} from "./images";

const mdPagesResolve = require.context('./pages/markdown', true, /\.md$/);

Vue.use(VueRouter);
Vue.use(VueI18n);

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.config.productionTip = false;

Vue.component('vue-headful', vueHeadful);

const supportedLocales = ['en'];

let preferredLanguage = window.navigator.language.slice(0, 2);
let usedLocale = supportedLocales.includes(preferredLanguage) ? preferredLanguage : 'en';

const i18n = new VueI18n({
	locale: usedLocale
})

store.dispatch('server/loadServerInfo');

const router = new VueRouter({
	base: '/',
	mode: 'history',
	routes: [
		{
			path: '/',
			name: 'info',
			component: InfoPage,
			pathToRegexpOptions: { strict: true }
		},
		{
			path: '/announcements/',
			name: 'announcements',
			component: AnnouncementsPage,
			pathToRegexpOptions: { strict: true }
		},
		{
			path: '/ranks/',
			name: 'ranks',
			component: RanksPage,
			pathToRegexpOptions: { strict: true }
		},
		{
			path: '/staff/',
			name: 'staff',
			component: StaffPage,
			pathToRegexpOptions: { strict: true }
		},
		{
			path: '/commands/',
			name: 'commands',
			component: CommandsPage,
			pathToRegexpOptions: { strict: true }
		},
		{
			path: '/gensokyo/',
			name: 'gensokyo',
			component: GensokyoLocationsPage,
			pathToRegexpOptions: { strict: true }
		},
		{
			path: '/gensokyo/help/',
			name: 'gensokyo_help',
			component: GensokyoHelpPage,
			pathToRegexpOptions: { strict: true }
		},
		{
			path: '/downloads/gensokyo/',
			name: 'download_genso',
			component: DownloadGenso,
			pathToRegexpOptions: { strict: true }
		},
		{
			path: '/downloads/survival/',
			name: 'download_survival',
			component: DownloadSurvival,
			pathToRegexpOptions: { strict: true }
		},
		...mdPagesResolve.keys().map(mdPagesResolve).filter(p => !p.attributes.isLocalization).map(page => ({
			path: page.attributes.path,
			name: page.attributes.vueRouterName,
			component: MarkdownPage,
			props: {
				component: page,
				localizedComponents: {},
				parallaxImages: page.attributes.parallaxImages && autoImage(page.attributes.parallaxImages),
			},
			pathToRegexpOptions: { strict: true }
		})),
		...announcementList.posts.map(post => {
			let name = post.file.endsWith('.md') ? post.file.substring(0, post.file.length - 3) : post.file;
			let slug = post.slug || name;

			return {
				path: `/announcements/${slug}/`,
				component: AnnouncementPostPage,
				props: {
					postName: name
				},
				pathToRegexpOptions: { strict: true }
			}
		}),
		{
			path: '*',
			name: '404',
			component: _404Page
		},
	],
	scrollBehavior(to, from, savedPosition) {
		if(to.hash.length) {
			return { selector: '#' + CSS.escape(to.hash.substring(1)) }
		} else {
			return { x: 0, y: 0 }
		}
	}
});

document.addEventListener('DOMContentLoaded', () => {
	const app = new Vue({
		el: '#app',
		render: createElement => createElement(App),
		router,
		i18n,
		store,
		mounted() {
			// You'll need this for renderAfterDocumentEvent.
			document.dispatchEvent(new Event('render-event'))
		}
	});
});