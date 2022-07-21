import Vue from 'vue'
import Vuex from 'vuex'

import commandsModule from './commands'
import locationsModule from './locations'

Vue.use(Vuex)

export function createStore() {
  // eslint-disable-next-line import/no-named-as-default-member
  return new Vuex.Store({
    modules: {
      commands: commandsModule,
      locations: locationsModule,
    },
  })
}
