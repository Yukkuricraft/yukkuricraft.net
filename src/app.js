import "regenerator-runtime/runtime.js";

import Vue from 'vue'
import VueRouter from "vue-router";
import VueI18n from "vue-i18n";
import vueHeadful from 'vue-headful';

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import "./fontAwesomeLibrary";

import "./scss/app.scss";

import "css.escape";

import App from './App.vue'

import {store} from "./stores/index";
import {router} from "./router";

Vue.use(VueRouter);
Vue.use(VueI18n);

Vue.component('vue-headful', vueHeadful);
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.config.productionTip = false;

const supportedLocales = ['en'];

let preferredLanguage = window.navigator.language.slice(0, 2);
let usedLocale = supportedLocales.includes(preferredLanguage) ? preferredLanguage : 'en';

const i18n = new VueI18n({
	locale: usedLocale
})

store.dispatch('server/loadServerInfo');

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