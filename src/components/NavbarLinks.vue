<template>
	<div class="collapse navbar-collapse">
		<ul class="navbar-nav mr-auto">
			<router-link :to="{name: 'info'}" v-slot="{ href, navigate, isExactActive }">
				<li class="nav-item" :class="[isExactActive && 'active']">
					<a class="nav-link" :href="href" @click="navigate">Info</a>
				</li>
			</router-link>
			<router-link :to="{name: 'ranks_staff'}" v-slot="{ href, navigate, isExactActive }">
				<li class="nav-item" :class="[isExactActive && 'active']">
					<a class="nav-link" :href="href" @click="navigate">Ranks and Staff</a>
				</li>
			</router-link>
			<router-link :to="{name: 'rules'}" v-slot="{ href, navigate, isExactActive }">
				<li class="nav-item" :class="[isExactActive && 'active']">
					<a class="nav-link" :href="href" @click="navigate">Rules</a>
				</li>
			</router-link>
			<router-link :to="{name: 'commands'}" v-slot="{ href, navigate, isExactActive }">
				<li class="nav-item" :class="[isExactActive && 'active']">
					<a class="nav-link" :href="href" @click="navigate">Commands</a>
				</li>
			</router-link>
			<template v-for="(page, menuName) in groupedMdPages">
				<template v-if="hasDropdown(page)">
					<router-link :to="{path: page.obj.path}" v-slot="{ href, navigate, isExactActive, isActive }">
						<li class="nav-item dropdown" :class="[isActive && 'active']">
							<a class="nav-link dropdown-toggle" href="#" :id="'md-navbarlink-' + page.obj.path"
							   data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{{ menuName }}</a>

							<div class="dropdown-menu" :aria-labelledby="'md-navbarlink-' + page.obj.path">
								<a class="dropdown-item" :class="[isExactActive && 'active']" :href="href"
								   @click="navigate">{{ menuName }}</a>
								<router-link v-for="(page, menuName) in childMdPages(page)" :to="{path: page.obj.path}"
											 v-slot="{ href, navigate, isExactActive }" :key="page.obj.path">
									<a class="dropdown-item" :class="[isExactActive && 'active']" :href="href"
									   @click="navigate">{{ menuName }}</a>
								</router-link>
							</div>
						</li>
					</router-link>
				</template>
				<router-link v-else :to="{path: page.obj.path}" v-slot="{ href, navigate, isExactActive }">
					<li class="nav-item" :class="[isExactActive && 'active']">
						<a class="nav-link" :href="href" @click="navigate">{{ menuName }}</a>
					</li>
				</router-link>
			</template>
			<li class="nav-item"><a class="nav-link" href="https://yukkuricraft.net">Forums</a></li>
		</ul>
	</div>
</template>

<script>
	import mdPages from "../pages/markdown/pages"
	import set from "lodash/set"

	export default {
		computed: {
			groupedMdPages() {
				function group(pages) {
					let acc = {};

					for (let page of pages) {
						set(acc, page.menuName.join('.') + '.obj.path', page.path)
					}

					return acc;
				}

				return group(mdPages)
			}
		},
		methods: {
			hasDropdown(page) {
				return Object.keys(page).length > 1;
			},
			childMdPages(page) {
				let obj = {
					...page
				}
				delete obj.obj;

				return obj;
			}
		}
	}
</script>