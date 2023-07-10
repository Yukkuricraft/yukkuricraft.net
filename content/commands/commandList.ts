export interface Command {
  aliases: string[]
  description: string
  arguments?: string
  tags?: string[]
}

export interface CommandGroup {
  displayName: string
  menuName: string
  description?: string
  commands?: Command[]
  // eslint-disable-next-line no-use-before-define
  subgroups?: CommandGroups
}
export type CommandGroups = {[k: string]: CommandGroup}

export const general = () => import('./general.yaml') as unknown as Promise<{default: CommandGroups}>
export const tp = () => import('./tp.yaml') as unknown as Promise<{default: CommandGroups}>
export const chat = () => import('./chat.yaml') as unknown as Promise<{default: CommandGroups}>
export const feelings = () => import('./feelings.yaml') as unknown as Promise<{default: CommandGroups}>
export const nicknames = () => import('./nicknames.yaml') as unknown as Promise<{default: CommandGroups}>
export const lwc = () => import('./lwc.yaml') as unknown as Promise<{default: CommandGroups}>
export const hsh = () => import('./hsh.yaml') as unknown as Promise<{default: CommandGroups}>

export default [general, tp, chat, feelings, nicknames, lwc, hsh]
