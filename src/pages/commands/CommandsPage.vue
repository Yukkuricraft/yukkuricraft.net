<template>
  <sidebar-page :parallax-images="images">
    <vue-headful
      title="YukkuriCraft - Commands"
      description="Search through the commands found on YukkuriCraft."
      :image="require('../../favicon_upscaled.png')"
      url="https://yukkuricraft.net/commands/"
    />

    <template #sidebar>
      <div class="sidebar-header">
        <h2>Commands</h2>
      </div>

      <sidebar-entries
        class="sidebar-components"
        href-prefix="commands"
        :subgroups="commands"
        subgroup-children-name="subgroups"
      />
    </template>

    <template #parallax>
      <h1>Commands</h1>
      <p>Find commonly used commands here</p>
    </template>

    <h2 id="commands">Command List</h2>
    <div id="commandsSection">
      <p style="font-size: 18px; color: #aaafad;">
        Arguments in "[" and "]" are optional. Arguments in "&lt;" and "&gt;" are required for the command to work!
      </p>
      <p style="font-size: 12px; color: #aaafad;">
        This is nowhere near a complete list of commands, just some of the basics!
      </p>

      <b-form-group>
        <label for="commandsSearch">Search:</label>
        <b-form-input id="commandsSearch" v-model="filter" type="text" placeholder="Search commands..." />
      </b-form-group>

      <div id="commandGroups">
        <command-group
          v-for="(commandGroup, commandGroupId) in commands"
          :key="commandGroupId"
          :depth="0"
          :command-group-id="commandGroupId"
          :command-group="commandGroup"
        />
      </div>
    </div>
  </sidebar-page>
</template>

<script>
import { BFormGroup, BFormInput } from 'bootstrap-vue'

import queryString from 'query-string'
import orderBy from 'lodash/orderBy'
import merge from 'lodash/merge'

import SidebarEntries from '../../components/SidebarEntries'
import SidebarPage from '../../layout/SidebarPage'

import { autoImage } from '../../images'
import { removeExtension } from '../../files'

import commandList from '../../../content/commands/commandList.yaml'
import CommandGroup from './CommandGroup'

export default {
  components: {
    SidebarPage,
    SidebarEntries,
    CommandGroup,
    BFormGroup,
    BFormInput,
  },
  data() {
    return {
      filter: '',
      allCommands: {},
      hasScrolledToHash: false,
    }
  },
  computed: {
    images() {
      return autoImage('commands')
    },
    commands() {
      const filter = this.filter

      function matchesQuery(str) {
        return str.toLowerCase().includes(filter.toLowerCase())
      }

      function commandMatchesQuery(command) {
        return (
          command.aliases.some(matchesQuery) || command.tags.some(matchesQuery) || matchesQuery(command.description)
        )
      }

      function filterSubgroup(subgroup) {
        if (subgroup.subgroups && Object.entries(subgroup.subgroups).length) {
          const subsubgroups = filterSubgroups(subgroup.subgroups)

          if (Object.entries(subsubgroups).length) {
            subgroup.subgroups = subsubgroups
            return subgroup
          } else {
            return null
          }
        } else {
          const validCommands = subgroup.commands.filter(commandMatchesQuery)

          if (validCommands.length) {
            subgroup.commands = validCommands
            return subgroup
          } else {
            return null
          }
        }
      }

      function filterSubgroups(subgroups) {
        Object.entries(subgroups).forEach(([id, subgroup]) => {
          const newSubgroup = filterSubgroup(subgroup)
          if (newSubgroup === null) {
            delete subgroups[id]
          } else {
            subgroups[id] = newSubgroup
          }
        })

        return subgroups
      }

      return this.filter.length ? filterSubgroups({ ...this.allCommands }) : this.allCommands
    },
  },
  watch: {
    filter(oldVal, val) {
      if (oldVal !== val) {
        const query = queryString.stringify({ filter: this.filter ? this.filter : undefined })
        const full = query !== '' ? '?' + query : '/commands/'
        window.history.replaceState(null, null, full)
      }
    },
  },
  async created() {
    Object.entries(queryString.parse(location.search)).forEach(([key, value]) => this.$set(this, key, value))

    const allCommandGroups = commandList.commands.map((entry, idx) => {
      const name = removeExtension(entry, '.yaml')
      return import(/* webpackMode: "eager" */ `../../../content/commands/${name}.yaml`).then((commands) => ({
        commands,
        idx,
      }))
    })

    // We get them all together to hopefully only update the DOM once
    const allGroups = await Promise.all(allCommandGroups)
    this.allCommands = merge({}, ...orderBy(allGroups, 'idx').map((c) => c.commands.default))
  },
  updated() {
    if (Object.entries(this.allCommands).length && !this.hasScrolledToHash && location.hash) {
      this.$nextTick(() => {
        document.getElementById(location.hash.substr(1)).scrollIntoView()
        this.hasScrolledToHash = true
      })
    }
  },
}
</script>
