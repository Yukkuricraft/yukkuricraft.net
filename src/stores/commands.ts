import { defineStore } from 'pinia'

import merge from 'lodash/merge'
import orderBy from 'lodash/orderBy'
import commandList, {type CommandGroups} from '../../content/commands/commandList'

interface State {
  allCommands: CommandGroups
  loadingCommands: boolean
  waiters: (() => void)[]
}

export const useCommandsStore = defineStore('commands', {
  state: (): State => ({
    allCommands: {},
    loadingCommands: false,
    waiters: [],
  }),
  actions: {
    startLoading() {
      this.loadingCommands = true
    },
    registerWaiter(resolve: () => void) {
      this.waiters.push(resolve)
    },
    setAllCommands(commands: CommandGroups) {
      this.allCommands = commands
    },
    endLoading() {
      this.loadingCommands = false
      for (const waiter of this.waiters) {
        waiter()
      }
      this.waiters = []
    },
    async loadCommands() {
      if (this.loadingCommands) {
        await new Promise((resolve) => this.registerWaiter(resolve as () => void))
        return
      }

      this.startLoading()

      const allCommandGroups = commandList.map((entry, idx) => {
        return entry().then((commands) => ({
          commands: commands.default,
          idx,
        }))
      })

      // We get them all together to hopefully only update the DOM once
      const allGroups = await Promise.all(allCommandGroups)
      this.setAllCommands(merge({}, ...orderBy(allGroups, 'idx').map((c) => c.commands)))

      this.endLoading()
    },
  },
})
