<template>
  <h2 id="commands">Command List</h2>
  <div id="commandsSection">
    <p style="font-size: 18px; color: #aaafad">
      Arguments in "[" and "]" are optional. Arguments in "&lt;" and "&gt;" are required for the command to work!
    </p>
    <p style="font-size: 12px; color: #aaafad">
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
</template>

<script setup lang="ts">
import { BFormGroup, BFormInput } from 'bootstrap-vue-next'
import { computed, onMounted, onServerPrefetch, ref, watch } from 'vue'
import queryString from 'query-string'

import { useMeta } from 'vue-meta'

import CommandGroup from './CommandGroup.vue'

import { useCommandsStore } from '@/stores/commands'
import { makeMeta } from '@/pageHelpers'
const commandsStore = useCommandsStore()

const filter = ref('')

const commands = computed(() => {
  function matchesQuery(str: string) {
    return str.toLowerCase().includes(filter.value.toLowerCase())
  }

  function commandMatchesQuery(command) {
    return command.aliases.some(matchesQuery) || command.tags.some(matchesQuery) || matchesQuery(command.description)
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

  return filter.value.length ? filterSubgroups({ ...commandsStore.allCommands }) : commandsStore.allCommands
})

onMounted(async () => {
  // For SSR
  if (typeof location !== 'undefined') {
    Object.entries(queryString.parse(location.search)).forEach(([key, value]) => {
      if (value && !Array.isArray(value)) {
        if (key === 'filter') {
          filter.value = value
        }
      }
    })
  }

  if (Object.entries(commandsStore.allCommands).length === 0) {
    await commandsStore.loadCommands()
  }
})

watch(filter, (oldVal, val) => {
  if (oldVal !== val) {
    const query = queryString.stringify({ filter: filter.value ? filter.value : undefined })
    const full = query !== '' ? '?' + query : '/commands/'
    window.history.replaceState(null, '', full)
  }
})

onServerPrefetch(() => commandsStore.loadCommands())

useMeta(makeMeta({
  title: 'YukkuriCraft - Commands',
  description: 'Search through the commands found on YukkuriCraft.',
  url: 'commands/'
}))
</script>
