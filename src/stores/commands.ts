import { defineStore } from 'pinia'

import merge from 'lodash/merge'
import orderBy from 'lodash/orderBy'
import {type CommandGroups, type CommandGroup, type Command} from '../../content/commands/commandList'
export {type CommandGroups, type CommandGroup, type Command}

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

      const allCommandGroups = await import('../../content/commands/commandList').then(res => res.default.map((commands,idx) => ({commands, idx})))

      this.setAllCommands(merge({}, ...orderBy(allCommandGroups, 'idx').map((c) => c.commands)))

      this.endLoading()
    },
  },
})
