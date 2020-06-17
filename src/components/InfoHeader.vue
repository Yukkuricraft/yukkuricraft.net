<template>
	<b-navbar toggleable="lg" type="dark" variant="primary" sticky id="top-navbar">
		<b-container v-if="inContainer">
			<slot name="top"></slot>
			<router-link :to="{name: 'info'}" v-slot="{href, navigate}">
				<b-navbar-brand :href="href" @click="navigate">Yukkuricraft</b-navbar-brand>
			</router-link>
			<b-navbar-toggle target="navbarSupportedContent" />
			<b-collapse is-nav id="navbarSupportedContent">
				<navbar-links></navbar-links>
			</b-collapse>

			<navbar-locale-changer></navbar-locale-changer>
			<slot name="bottom"></slot>
		</b-container>

		<template v-else>
			<slot name="top"></slot>
			<router-link :to="{name: 'info'}" v-slot="{href, navigate}">
				<b-navbar-brand :href="href" @click="navigate">Yukkuricraft</b-navbar-brand>
			</router-link>
			<b-navbar-toggle target="navbarSupportedContent" />
			<b-collapse is-nav id="navbarSupportedContent">
				<navbar-links></navbar-links>
			</b-collapse>

			<navbar-locale-changer></navbar-locale-changer>
			<slot name="bottom"></slot>
		</template>
	</b-navbar>
</template>

<script>
	import {BNavbar, BContainer, BNavbarBrand, BNavbarToggle, BCollapse} from "bootstrap-vue"

	import NavbarLinks from "./NavbarLinks"
	import NavbarLocaleChanger from "./NavbarLocaleChanger"

	export default {
		components: {
			BNavbar,
			BContainer,
			BNavbarBrand,
			BNavbarToggle,
			BCollapse,
			NavbarLinks,
			NavbarLocaleChanger,
		},
		props: {
			inContainer: {
				type: Boolean,
				default: true
			}
		}
	}
</script>
