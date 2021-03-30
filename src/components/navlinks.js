import set from 'lodash/set'
import mdPages from '../../content/pages/pages.yaml'

const acc = {}

// TODO: Do this in one pass someday
for (const page of mdPages) {
  if (!page.menuName) {
    continue
  }

  set(acc, page.menuName + '.obj.path', page.path)
  set(acc, page.menuName + '.obj.name', page.title)
}

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
          name: 'survival_farms_towns',
        },
        name: 'Farms and Towns',
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
  ...Object.entries(acc).map(([menuName, page]) => {
    // Has subpages
    if (Object.keys(page).length > 1) {
      const childPages = {
        ...page,
      }
      delete childPages.obj

      return {
        name: page.obj.name,
        id: menuName,
        subpages: [
          {
            to: {
              path: page.obj.path,
            },
            name: page.obj.name,
          },
          ...Object.values(childPages).map((subpage) => ({
            to: {
              path: subpage.obj.path,
            },
            name: subpage.obj.name,
          })),
        ],
      }
    } else {
      return {
        to: {
          path: page.obj.path,
        },
        name: page.obj.name,
      }
    }
  }),
]
