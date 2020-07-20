<template>
	<sidebar-page :parallax-images="images">
		<vue-headful title="YukkuriCraft - Commands" description="Search through the commands found on YukkuriCraft."
					 :image="require('../../favicon_upscaled.png')" url="https://yukkuricraft.net/commands/"/>

		<template v-slot:sidebar>
			<div class="sidebar-header">
				<h2>Commands</h2>
			</div>

			<sidebar-entries class="sidebar-components" href-prefix="commands" :subgroups="commands" subgroup-children-name="subgroups" />
		</template>

		<template v-slot:parallax>
			<h1>Commands</h1>
			<p>Find commonly used commands here</p>
		</template>

		<h2 id="commands">Command List</h2>
		<div id="commandsSection">
			<p style="font-size:18px;color:#aaafad">
				Arguments in "[" and "]" are optional. Arguments in "&lt;" and "&gt;" are required for the
				command
				to
				work!
			</p>
			<p style="font-size:12px;color:#aaafad">
				This is nowhere near a complete list of commands, just some of the basics!
			</p>

			<b-form-group>
				<label for="commandsSearch">Search:</label>
				<b-form-input id="commandsSearch" type="text" placeholder="Search commands..." v-model="filter"/>
			</b-form-group>

			<div id="commandGroups">
				<command-group v-for="(commandGroup, commandGroupId) in commands" :depth="0"
							   :command-group-id="commandGroupId" :command-group="commandGroup"
							   :key="commandGroupId"  />
			</div>
		</div>
	</sidebar-page>
</template>

<script>
	import {BFormGroup, BFormInput} from "bootstrap-vue"

	import CommandGroup from "./CommandGroup";
	import SidebarEntries from "../../components/SidebarEntries";
	import SidebarPage from "../../layout/SidebarPage";

	import queryString from "query-string";

	import {autoImage} from "../../images";
	import {removeExtension} from "../../files";

	import commandList from "../../../content/commands/commandList.yaml";

	export default {
		components: {
			SidebarPage,
			SidebarEntries,
			CommandGroup,
			BFormGroup,
			BFormInput
		},
		data() {
			return {
				filter: "",
				allCommands: [],
				hasScrolledToHash: false
			}
		},
		created() {
			Object.entries(queryString.parse(location.search)).forEach(([key, value]) => this.$set(this, key, value));

			let allCommandGroups = commandList.commands.map((entry, idx) => {
				let name = removeExtension(entry, '.yaml');
				return import(/* webpackMode: "eager" */ `../../../content/commands/${name}.yaml`).then(commands => ({
					commands,
					idx
				}))
			});

			//We get them all together to hopefully only update the DOM once
			Promise.all(allCommandGroups).then(allGroups => {
				allGroups.forEach(({commands, idx}) => {
					this.$set(this.allCommands, idx, commands.default);
				})
			})
		},
		updated() {
			if (this.allCommands.length === commandList.commands.length && !this.hasScrolledToHash && location.hash) {
				this.$nextTick(() => {
					document.getElementById(location.hash.substr(1)).scrollIntoView();
					this.hasScrolledToHash = true;
				})
			}
		},
		computed: {
			images() {
				return autoImage('commands')
			},
			commands() {
				let filter = this.filter;

				function matchesQuery(str) {
					return str.toLowerCase().includes(filter.toLowerCase())
				}

				function commandAliases(command) {
					return Array.isArray(command.aliases) ? command.aliases : [command.aliases];
				}

				function commandMatchesQuery(command) {
					return commandAliases(command).some(matchesQuery) ||
						command.tags.some(matchesQuery) ||
						matchesQuery(command.description)
				}

				function filterSubgroup(subgroup) {
					if (typeof subgroup.subgroups !== 'undefined' && Object.entries(subgroup.subgroups).length) {
						let subsubgroups = filterSubgroups(subgroup.subgroups);

						if (Object.entries(subsubgroups).length) {
							subgroup.subgroups = subsubgroups
							return subgroup
						} else {
							return null
						}
					} else {
						let validCommands = subgroup.commands.filter(commandMatchesQuery);

						if (validCommands.length) {
							subgroup.commands = validCommands
							return subgroup
						} else {
							return null
						}
					}

				}

				function filterSubgroups(subgroups) {
					Object.entries(subgroups).forEach(([id, subgroup]) => {
						let newSubgroup = filterSubgroup(subgroup)
						if (newSubgroup === null) {
							delete subgroups[id]
						} else {
							subgroups[id] = newSubgroup
						}
					});

					return subgroups
				}

				//We throw out all the getters and such
				let commandsCopy = JSON.parse(JSON.stringify(Object.fromEntries(this.allCommands.flatMap(Object.entries))));

				return this.filter.length ? filterSubgroups(commandsCopy) : commandsCopy
			}
		},
		watch: {
			filter(oldVal, val) {
				if (oldVal !== val) {
					let query = queryString.stringify({filter: this.filter ? this.filter : undefined});
					let full = query !== "" ? "?" + query : "/commands/";
					window.history.replaceState(null, null, full);
				}
			}
		}
	}
</script>
