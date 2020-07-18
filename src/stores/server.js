const state = {
	ping: {
		description: null,
		players: {
			max: null,
			online: null,
			sample: null
		},
		version: {
			name: null
		}
	}
};

const mutations = {
	setPingData(state, payload) {
		state.ping.description = payload.description;
		state.ping.players.max = payload.players.max;
		state.ping.players.online = payload.players.online;
		state.ping.players.sample = payload.players.sample;
		state.ping.version.name = payload.version.name
	}
};


async function mcPing() {
	let errorMsg = `Failed to get YC server info`;

	try {
		let res = await fetch('https://api.minetools.eu/ping/mc.yukkuricraft.net/25565');

		if (res.status !== 200) {
			console.warn(errorMsg);
			return null;
		} else {
			let json = await res.json();

			if(typeof json.error !== 'undefined') {
				console.warn(errorMsg + '. Error: ' + json.error);
				return null;
			}
			else {
				return json
			}
		}
	} catch (e) {
		console.warn(errorMsg + '. Error: ' + e);
		return null
	}
}

const actions = {
	loadServerInfo(context) {
		mcPing().then(res => {
			if(res !== null) {
				context.commit({
					type: 'setPingData',
					...res
				})
			}
		})
	}
};

export default {
	namespaced: true,
	state,
	mutations,
	actions
}