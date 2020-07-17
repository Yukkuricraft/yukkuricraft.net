<template>
	<b-navbar-nav class="mr-auto">
		<router-link v-for="navlink in navlinks" :key="navlink.id || navlink.name" :to="navlink.to || navlink.subpages[0].to" v-slot="{ href, navigate, isExactActive, isActive }">
			<b-nav-item-dropdown v-if="navlink.subpages" :class="[isActive && 'active']" :text="navlink.name">
				<b-dropdown-item :class="[isExactActive && 'active']" :href="href" @click="navigate">
					{{ navlink.subpages[0].name }}
				</b-dropdown-item>
				<router-link v-for="subpage in navlink.subpages.slice(1)" :key="navlink.id || navlink.name" :to="subpage.to" v-slot="{ href, navigate, isExactActive }">
					<b-dropdown-item :class="[isExactActive && 'active']" :href="href" @click="navigate">{{ subpage.name }}</b-dropdown-item>
				</router-link>
			</b-nav-item-dropdown>
			<b-nav-item v-else :class="[isExactActive && 'active']" :href="href" @click="navigate">{{ navlink.name }}</b-nav-item>
		</router-link>
		<b-nav-item href="https://yukkuricraft.net">Forums</b-nav-item>
	</b-navbar-nav>
</template>

<script>
	import {BCollapse, BNavbarNav, BNavItem, BNavItemDropdown, BDropdownItem} from "bootstrap-vue";

	import navlinks from "./navlinks";

	export default {
		components: {
			BCollapse,
			BNavbarNav,
			BNavItem,
			BNavItemDropdown,
			BDropdownItem
		},
		computed: {
			navlinks() {
				return navlinks
			}
		}
	}
</script>