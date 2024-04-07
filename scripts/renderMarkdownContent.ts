import fs from 'fs'
import path from 'node:path'
import yaml from 'yaml'
import { glob } from 'glob'
import markdownIt from 'markdown-it'
import markdownItAnchor from 'markdown-it-anchor'
import { JSDOM } from 'jsdom'

const md = markdownIt({ linkify: true, typographer: true }).use(markdownItAnchor, {
  slugify(s) {
    return String(s).trim().toLowerCase().replace(/\s+/g, '-')
  },
  permalink: markdownItAnchor.permalink.ariaHidden({
    placement: 'before',
    symbol: '<i class="fas fa-link" style="font-size: 0.5em"></i>',
  }),
})

function renderMarkdown(str: string | undefined) {
  if (str === undefined) {
    return undefined
  }

  const rendered = md.render(str)
  const frag = JSDOM.fragment(rendered)

  if (frag.children.length === 1) {
    return frag.children[0].innerHTML
  } else {
    return rendered
  }
}

function partsFromFilename(root: string, fileName: string): string[] {
  const relMatch = path.relative(root, fileName)
  const parts = relMatch.split(path.sep)
  const init = parts.slice(0, -1)
  const last = parts.at(-1)
  const lastWithoutExtension = last.indexOf('.') >= 0 ? last.substring(0, last.indexOf('.')) : last

  return [...init, lastWithoutExtension]
}

function fileNameToVarName(root: string, fileName: string): string {
  return partsFromFilename(root, fileName).join('_')
}

function processRanks() {
  const rawContents = fs.readFileSync('./content/ranks.yaml', { encoding: 'utf8' })
  const contents = yaml.parse(rawContents)

  function processRank(rank) {
    return {
      ...rank,
      description: renderMarkdown(rank.description),
    }
  }

  function processRankGroup(group) {
    return {
      ...group,
      description: renderMarkdown(group.description),
      ranks: group.ranks?.map(processRank),
    }
  }

  fs.writeFileSync('./generated/ranks.json', JSON.stringify(contents.map(processRankGroup)))
}

function processCommands() {
  const contentsTuple: [string, string][] = glob.sync('./content/commands/**/*.yaml').map((commandsFile) => {
    const rawContents = fs.readFileSync(commandsFile, { encoding: 'utf8' })
    const contents = yaml.parse(rawContents)

    function processCommand(command) {
      return {
        ...command,
        description: renderMarkdown(command.description),
      }
    }

    function processCommandGroup(group) {
      return {
        ...group,
        description: renderMarkdown(group.description),
        commands: group.commands?.map(processCommand),
        subgroups: processCommandGroups(group.subgroups),
      }
    }

    function processCommandGroups(groups) {
      if (groups === undefined) {
        return undefined
      }

      return Object.fromEntries(Object.entries(groups).map(([k, v]) => [k, processCommandGroup(v)]))
    }

    const varName = fileNameToVarName('./content/commands', commandsFile)

    const varDef = `export const ${varName} = ${JSON.stringify(processCommandGroups(contents))}`

    return [varName, varDef]
  })

  const varDefs = contentsTuple.map((t) => t[1]).join('\n\n')

  const exportDefaultArray = contentsTuple.map((t) => t[0]).join(', ')

  const interfaces = `
export interface Command {
  aliases: string[]
  description: string
  arguments?: string
  tags?: string[]
}

export interface CommandGroupBase {
  displayName: string
  menuName: string
  description?: string
}

export interface CommandGroupWithSubgroups extends CommandGroupBase {
  // eslint-disable-next-line no-use-before-define
  subgroups: CommandGroups
}

export interface CommandGroupWithCommands extends CommandGroupBase {
  commands: Command[]
  // eslint-disable-next-line no-use-before-define
  subgroups?: CommandGroups
}

export type CommandGroup = CommandGroupWithSubgroups | CommandGroupWithCommands
export type CommandGroups = {[k: string]: CommandGroup}`

  fs.mkdirSync('./generated/commands', { recursive: true })
  fs.writeFileSync(
    './generated/commands/commandList.ts',
    `${interfaces}\n\n${varDefs}\n\nexport default [${exportDefaultArray}] as CommandGroups[]`,
  )
}

function processLocations() {
  const contentsTuple: [string, string[], string][] = glob
    .sync('./content/locations/**/*.yaml')
    .map((locationsFile) => {
      const rawContents = fs.readFileSync(locationsFile, { encoding: 'utf8' })
      const contents = yaml.parse(rawContents)

      function processLocation(location) {
        return {
          ...location,
          description: renderMarkdown(location.description),
          sublocations: processLocations(location.sublocations),
        }
      }

      function processLocations(groups) {
        if (groups === undefined) {
          return undefined
        }

        return Object.fromEntries(Object.entries(groups).map(([k, v]) => [k, processLocation(v)]))
      }

      const varName = fileNameToVarName('./content/locations', locationsFile) + 'Internal'
      const parts = partsFromFilename('./content/locations', locationsFile)

      const varDef = `const ${varName}: Locations = ${JSON.stringify(processLocations(contents))}`

      return [varName, parts, varDef]
    })

  const varDefs = contentsTuple.map((t) => t[2]).join('\n\n')

  const exportObj = {}
  for (const [varName, parts] of contentsTuple) {
    const init = parts.slice(0, -1)
    const last = parts.at(-1)

    let objToAssign = exportObj
    for (const pathElem of init) {
      if (objToAssign[pathElem] === undefined) {
        objToAssign[pathElem] = {}
      }

      objToAssign = objToAssign[pathElem]
    }

    objToAssign[last] = `UNESCAPE_START$${varName}$UNESCAPE_END`
  }

  const exports = []
  for (const [varName, rhs] of Object.entries(exportObj)) {
    const rhsUnprocessed = JSON.stringify(rhs)
    const rhsProcessed = rhsUnprocessed.replaceAll(/"UNESCAPE_START\$([^"]+)\$UNESCAPE_END"/g, '$1')
    exports.push(`export const ${varName} = ${rhsProcessed}`)
  }

  const interfaces = `
export interface LocationImage {
  name: string
  title?: string
  description?: string
  image_taken_by?: string
}

export interface Location {
  displayName: string
  menuName: string
  type?: string
  builders?: {
    name: string
    uuid?: string
  }[]
  description?: string
  images?: LocationImage[]
  // eslint-disable-next-line no-use-before-define
  sublocations?: Locations
}
export type Locations = {[k: string]: Location}`

  fs.mkdirSync('./generated/locations', { recursive: true })
  fs.writeFileSync('./generated/locations/locationList.ts', `${interfaces}\n\n${varDefs}\n\n${exports.join('\n')}`)
}

export function processMarkdownFiles() {
  processRanks()
  processCommands()
  processLocations()
}
