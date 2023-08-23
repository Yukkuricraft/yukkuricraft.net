import type {RouteLocationRaw} from 'vue-router'

export interface NavlinkDestination {
  name: string
  to: RouteLocationRaw
}

export interface NavlinkWithSubpages {
  name: string,
  id: string
  subpages: NavlinkDestination[]
}

export type Navlink = NavlinkDestination | NavlinkWithSubpages

export default [
  {
    to: {
      name: 'info',
    },
    name: 'Home',
  },
  {
    to: {
      name: 'announcements',
    },
    name: 'Announcements',
  },
  {
    name: 'Community guide',
    id: 'community_guide',
    subpages: [
      {
        to: {
          name: 'ranks',
        },
        name: 'Ranks',
      },
      {
        to: {
          name: 'staff',
        },
        name: 'Staff',
      },
      {
        to: {
          name: 'rules',
        },
        name: 'Rules',
      },
    ],
  },
  {
    name: 'Server Activities',
    id: 'server_activities',
    subpages: [
      {
        to: {
          name: 'survivalTour',
        },
        name: 'Survival tour',
      },
      {
        to: {
          name: 'paintball',
        },
        name: 'Paintball',
      },
      {
        to: {
          name: 'yukkurikart',
        },
        name: 'YukkuriKart',
      },
      {
        to: {
          name: 'survival_farms',
        },
        name: 'Public Farms',
      },
      {
        to: {
          name: 'survival_towns',
        },
        name: 'Towns',
      },
    ],
  },
  {
    to: {
      name: 'commands',
    },
    name: 'Commands',
  },
  {
    name: 'Gensokyo',
    id: 'gensokyo',
    subpages: [
      {
        to: {
          name: 'gensokyo',
        },
        name: 'Locations',
      },
      {
        to: {
          name: 'gensokyo_help',
        },
        name: 'Help us build!',
      },
    ],
  },
] as Navlink[]
