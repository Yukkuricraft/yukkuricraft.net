import general from './general.yaml'
import tp from './tp.yaml'
import chat from './chat.yaml'
import feelings from './feelings.yaml'
import nicknames from './nicknames.yaml'
import lwc from './lwc.yaml'
import hsh from './hsh.yaml'

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
export type CommandGroups = {[k: string]: CommandGroup}

export default [general, tp, chat, feelings, nicknames, lwc, hsh] as CommandGroups[]
