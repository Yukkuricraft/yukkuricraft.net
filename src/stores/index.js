import Vue from 'vue';
import Vuex from 'vuex';
import staffStore from './staff';

Vue.use(Vuex);

export const store = new Vuex.Store({
	modules: {
		staff: staffStore
	}
})