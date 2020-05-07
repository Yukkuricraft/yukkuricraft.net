import Vue from 'vue';
import staff from '../pages/staff';

const mcNames = {};

for(let staffGroup of staff) {
	for(let member of staffGroup.members) {
		for(let mcAccount of member.mcAccounts) {
			mcNames[mcAccount.uuid] = mcAccount.name;
		}
	}
}

const state = {
	mcNames,
	hasFetchedNames: false
};

const mutations = {
	setUsername(state, payload) {
		Vue.set(state.mcNames, payload.uuid, payload.name);
	},
	setHasFetchedNames(state) {
		state.hasFetchedNames = true;
	}
}

async function mcUsername(uuid, fallback) {
	let errorMsg = `Failed to get name for uuid ${uuid}, using fallback ${fallback} instead`;

	try {
		let res = await fetch('https://api.minetools.eu/uuid/' + uuid.replaceAll('-', ''));

		if (res.status !== 200) {
			console.warn(errorMsg);
			return fallback;
		} else {
			let profile = await res.json();

			if(typeof profile.error !== 'undefined') {
				console.warn(errorMsg + '. Error: ' + profile.error);
				return fallback;
			}
			else {
				return profile.name
			}
		}
	} catch (e) {
		console.warn(errorMsg + '. Error: ' + e);
		return fallback
	}
}

const actions = {
	loadRealNames(context) {
		if(context.state.hasFetchedNames) {
			return;
		}
		context.commit('setHasFetchedNames')

		for(let uuid of Object.keys(context.state.mcNames)) {
			mcUsername(uuid, context.state.mcNames[uuid]).then(res => {
				context.commit({
					type: 'setUsername',
					uuid,
					name: res
				})
			})
		}
	}
}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}
