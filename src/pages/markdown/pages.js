import {makeImage} from "../../images";

export default [
	{
		component: require('../RulesEN.md'),
		localizedComponents: {},
		parallaxImages: makeImage(
			require('../../images/rules.png'),
			require('../../images/rules.webp'),
			require('../../images/rules_small.jpg'),
			require('../../images/rules_small.webp'),
		)
	},
	/*
	{
		component: require('./Foobar.md'),
		localizedComponents: {},
		parallaxImages: makeImage(
			require('../../images/rules.png'),
			require('../../images/rules.webp'),
			require('../../images/rules_small.jpg'),
			require('../../images/rules_small.webp'),
		)
	},
	{
		component: require('./Foo.md'),
		localizedComponents: {},
		parallaxImages: makeImage(
			require('../../images/rules.png'),
			require('../../images/rules.webp'),
			require('../../images/rules_small.jpg'),
			require('../../images/rules_small.webp'),
		)
	}
	 */
]