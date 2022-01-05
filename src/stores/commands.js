import merge from 'lodash/merge'
import orderBy from 'lodash/orderBy'
import commandList from '../../content/commands/commandList.yaml'
import { removeExtension } from '../files'

export default {
  namespaced: true,
  state: () => ({
    allCommands: {},
    loadingCommands: false,
    waiters: [],
  }),
  mutations: {
    startLoading(state) {
      state.loadingCommands = true
    },
    registerWaiter(state, { resolve }) {
      state.waiters.push(resolve)
    },
    setAllCommands(state, { commands }) {
      state.allCommands = commands
    },
    endLoading(state) {
      state.loadingCommands = false
      for (const waiter of state.waiters) {
        waiter()
      }
      state.waiters = []
    },
  },
  actions: {
    async loadCommands({ state, commit }) {
      if (state.loadingCommands) {
        await new Promise((resolve) => commit({ type: 'registerWaiter', resolve }))
        return
      }

      commit('startLoading')

      const allCommandGroups = commandList.commands.map((entry, idx) => {
        const name = removeExtension(entry, '.yaml')
        return import(/* webpackChunkName: "commandsData" */ `../../content/commands/${name}.yaml`).then(
          (commands) => ({
            commands,
            idx,
          })
        )
      })

      // We get them all together to hopefully only update the DOM once
      const allGroups = await Promise.all(allCommandGroups)
      commit({
        type: 'setAllCommands',
        commands: merge({}, ...orderBy(allGroups, 'idx').map((c) => c.commands.default)),
      })

      commit('endLoading')
    },
  },
}
