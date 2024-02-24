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
        v-for="(commandGroup, commandGroupId) in refineType(commands)"
        :key="commandGroupId"
        :depth="0"
        :command-group-id="commandGroupId"
        :command-group-arg="commandGroup"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { BFormGroup, BFormInput } from 'bootstrap-vue-next'
import { computed, onMounted, onServerPrefetch, ref, watch } from 'vue'
import queryString from 'query-string'
import { useHead } from '@unhead/vue'

import {
  type CommandGroups,
  type CommandGroup as CommandGroupTpe,
  type Command,
} from '@cont/commands/commandList'

import CommandGroup from './CommandGroup.vue'

import { makeMeta } from '@/pageHelpers'

function refineType<V>(sources: { [k: string]: V }): Record<string, V> {
  return sources
}

const filter = ref('')
const allCommands = ref<CommandGroups>({})


async function loadCommands() {
  const allCommandGroups = await import('@cont/commands/commandList').then(res => res.default.map((commands,idx) => ({commands, idx})))
  allCommands.value = mergeWithSub<'subgroups', CommandGroupTpe>(allCommandGroups.sort((a, b) => a.idx - b.idx).map((c) => c.commands), 'subgroups')
}

function mergeWithSub<Sub extends string, A extends {[key in Sub]?: {[name: string]: A}}>(ass: ({[name: string]: A} | undefined)[], sub: Sub): {[name: string]: A} {
  const res: {[name: string]: A} = {}

  for (const as of ass) {
    if (!as) {
      continue
    }

    for (const [name, a] of Object.entries(as)) {
      if (!res[name]) {
        res[name] = a
      } else {
        const previousSub = res[name][sub]
        const currentSub = a[sub]

        res[name] = {...[res[name]], ...a}
        res[name][sub] = mergeWithSub([previousSub, currentSub], sub) as A[Sub]
      }
    }
  }

  return res
}

const commands = computed<CommandGroups>(() => {
  function matchesQuery(str: string): boolean {
    return str.toLowerCase().includes(filter.value.toLowerCase())
  }

  function commandMatchesQuery(command: Command): boolean {
    return command.aliases.some(matchesQuery) || command.tags?.some(matchesQuery) || matchesQuery(command.description)
  }

  function filterSubgroup(subgroup: CommandGroupTpe): CommandGroupTpe | null {
    function handleSubgroups(subgroup: CommandGroupTpe | null): CommandGroupTpe | null {
      if (subgroup && 'subgroups' in subgroup) {
        const subsubgroups = filterSubgroups(subgroup.subgroups)

        if (Object.entries(subsubgroups).length) {
          return { ...subgroup, subgroups: subsubgroups }
        } else {
          return null
        }
      } else {
        return subgroup
      }
    }

    function handleCommands(subgroup: CommandGroupTpe | null): CommandGroupTpe | null {
      if (subgroup && 'commands' in subgroup) {
        const validCommands = subgroup.commands.filter(commandMatchesQuery)

        if (validCommands.length) {
          return { ...subgroup, commands: validCommands }
        } else {
          return null
        }
      } else {
        return subgroup
      }
    }

    return handleCommands(handleSubgroups(subgroup))
  }

  function filterSubgroups(subgroups: CommandGroups) {
    const copy = { ...subgroups }
    Object.entries(copy).forEach(([id, subgroup]) => {
      const newSubgroup = filterSubgroup(subgroup)
      if (newSubgroup === null) {
        delete copy[id]
      } else {
        copy[id] = newSubgroup
      }
    })

    return copy
  }

  return filter.value.length ? filterSubgroups(allCommands.value) : allCommands.value
})

onMounted(async () => {
  if (!import.meta.env.SSR) {
    Object.entries(queryString.parse(location.search)).forEach(([key, value]) => {
      if (value && !Array.isArray(value)) {
        if (key === 'filter') {
          filter.value = value
        }
      }
    })
  }

  if (Object.entries(allCommands.value).length === 0) {
    await loadCommands()
  }
})

watch(filter, (oldVal, val) => {
  if (oldVal !== val) {
    const query = queryString.stringify({ filter: filter.value ? filter.value : undefined })
    const full = query !== '' ? '?' + query : '/commands/'
    window.history.replaceState(null, '', full)
  }
})

onServerPrefetch(() => loadCommands())

useHead(
  makeMeta({
    title: 'YukkuriCraft - Commands',
    description: 'Search through the commands found on YukkuriCraft.',
    url: 'commands/',
  }),
)
</script>
