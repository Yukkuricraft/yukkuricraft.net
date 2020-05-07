import Vue from 'vue';
import Vuex from 'vuex';

import staffStore from './staff';
import serverStore from './server';

Vue.use(Vuex);

export const store = new Vuex.Store({
	modules: {
		staff: staffStore,
		server: serverStore
	}
})