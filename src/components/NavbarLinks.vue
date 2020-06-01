<template>
	<div class="collapse navbar-collapse">
		<ul class="navbar-nav mr-auto">
			<router-link v-for="navlink in navlinks" :key="navlink.id || navlink.name" :to="navlink.to || navlink.subpages[0].to" v-slot="{ href, navigate, isExactActive, isActive }">
				<li v-if="navlink.subpages" class="nav-item dropdown" :class="[isActive && 'active']">
					<a class="nav-link dropdown-toggle" href="#" :id="'navbarlink-' + navlink.id"
					   data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{{ navlink.name }}</a>

					<div class="dropdown-menu" :aria-labelledby="'navbarlink-' + navlink.id">
						<a class="dropdown-item" :class="[isExactActive && 'active']" :href="href"
						   @click="navigate">{{ navlink.subpages[0].name }}</a>
						<router-link v-for="subpage in navlink.subpages.slice(1)" :key="navlink.id || navlink.name" :to="subpage.to" v-slot="{ href, navigate, isExactActive }">
							<a class="dropdown-item" :class="[isExactActive && 'active']" :href="href"
							   @click="navigate">{{ subpage.name }}</a>
						</router-link>
					</div>
				</li>
				<li v-else class="nav-item" :class="[isExactActive && 'active']">
					<a class="nav-link" :href="href" @click="navigate">{{ navlink.name }}</a>
				</li>
			</router-link>
			<li class="nav-item"><a class="nav-link" href="https://yukkuricraft.net">Forums</a></li>
		</ul>
	</div>
</template>

<script>
	import navlinks from "./navlinks";
	console.log(navlinks)

	export default {
		computed: {
			navlinks() {
				return navlinks
			}
		}
	}
</script>