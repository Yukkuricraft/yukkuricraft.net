import set from "lodash/set";

const mdPagesResolve = require.context('../pages/markdown', true, /\.md$/);

let acc = {};

//TODO: Do this in one pass someday
for(let page of mdPagesResolve.keys().map(mdPagesResolve)) {
	let attr = page.attributes;
	if(!attr.menuName) {
		continue;
	}

	set(acc, attr.menuName + '.obj.path', attr.path)
	set(acc, attr.menuName + '.obj.name', attr.title)
}

export default [
	{
		to: {
			name: 'info'
		},
		name: 'Home'
	},
	{
		to: {
			name: 'announcements'
		},
		name: 'Announcements'
	},
	{
		to: {
			name: 'ranks'
		},
		name: 'Ranks'
	},
	{
		to: {
			name: 'staff'
		},
		name: 'Staff'
	},
	{
		to: {
			name: 'rules'
		},
		name: 'Rules'
	},
	{
		to: {
			name: 'commands'
		},
		name: 'Commands'
	},
	{
		name: 'Gensokyo',
		id: 'gensokyo',
		subpages: [
			{
				to: {
					name: 'gensokyo'
				},
				name: 'Locations'
			},
			{
				to: {
					name: 'gensokyo_help'
				},
				name: 'Help us build!'
			},
		]
	},
	...Object.entries(acc).map(([menuName, page]) => {
		//Has subpages
		if(Object.keys(page).length > 1) {
			let childPages = {
				...page
			}
			delete childPages['obj'];

			return {
				name: page.obj.name,
				id: menuName,
				subpages: [
					{
						to: {
							path: page.obj.path
						},
						name: page.obj.name
					},
					...Object.values(childPages).map(subpage => {
						return {
							to: {
								path: subpage.obj.path
							},
							name: subpage.obj.name
						}
					})
				]
			}
		}
		else {
			return {
				to: {
					path: page.obj.path
				},
				name: page.obj.name
			}
		}
	})
]