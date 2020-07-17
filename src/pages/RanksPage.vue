<template>
	<normal-page :parallax-images="images">
		<vue-headful title="YukkuriCraft - Ranks and Staff"
					 description="The different ranks found on YukkuriCraft."
					 :image="require('../favicon_upscaled.png')"
					 url="https://info.yukkuricraft.net/ranks/"/>

		<template v-slot:parallax>
			<h1>Ranks</h1>
		</template>

		<h2 id="ranks">Ranks</h2>
		<p>
			Yukkuricraft has many different ranks. Here is a brief description of them, and what sets them apart
			from each other.
		</p>

		<h3 id="public-ranks">Public ranks</h3>
		<p>These are ranks most commonly seen on members of the community.</p>

		<b-row tag="dl">
			<b-col sm="3" md="2" tag="dt">Infant:</b-col>
			<b-col sm="9" md="10" tag="dd">
				Just joined the server, has not completed the quiz. This is a new person who has not yet mentally
				involved themselves with the server or the community.
			</b-col>
			<b-col sm="3" md="2" tag="dt">Child:</b-col>
			<b-col sm="9" md="10" tag="dd">
				Someone who's completed the quiz. This is the rank that people will go through during their first
				few days on the server. Children can set up to 3 homes.
			</b-col>
			<b-col sm="3" md="2" tag="dt">Adult:</b-col>
			<b-col sm="9" md="10" tag="dd">
				Someone who has at least a total of 4 days (96 hours) worth of activity on the server. This person
				has devoted a lot of their time on the server and is now considered an active member of the
				community. Adults and up are allowed to use items like fire and lava. Adults can set up to 5 homes.
			</b-col>
			<b-col sm="3" md="2" tag="dt">Senior:</b-col>
			<b-col sm="9" md="10" tag="dd">
				Someone who has at least a total of <strong>10</strong> days (240 hours) worth of activity. Can set
				up to 10 homes at once.
			</b-col>
			<b-col sm="3" md="2" tag="dt">Elder:</b-col>
			<b-col sm="9" md="10" tag="dd">
				This rank represents dedication and big positive involvement with the community and staff. Elders
				are specifically chosen and voted on by the staff. If you are an Elder, that means you're a positive
				force within the community, and have been noticed for your actions. You're one of the community
				leaders. Inactive and troublesome elders can be demoted. This is mostly just a pretty title! Elders
				can set up to 15 homes.
			</b-col>
		</b-row>

		<h3 id="staff-ranks">Staff ranks</h3>
		<p>The staff are the ones that make all the decisions on the server, and name new staff and elders.</p>
		
		<h4>Titles</h4>
		<p>
			There are also special "Titles" within the staff ranks. "Titles" are just that. Titles. They're a way to
			differentiate slightly different purposes within the same overall rank.
		</p>
		<b-row tag="dl">
			<b-col sm="3" md="2" tag="dt"><i>The [Lead] Title</i>:</b-col>
			<b-col sm="9" md="10" tag="dd">
				Staff with this title are designated as the "heads" of their respective rank.
				They're the gold standard for their teams and dedicate the most time.
				While equal to other staff, their efforts definitely do not go without recognition.
			</b-col>
			<b-col sm="3" md="2" tag="dt"><i> The [Owner] Title</i>:</b-col>
			<b-col sm="9" md="10" tag="dd">
				These people have access to the serverbox and have complete control over the
				server's existence.
			</b-col>
		</b-row>
		<br />

		<h4>Ranks</h4>
		<p>
			The following list consists of the main permission-tampering ranks that are most regularly seen. These
			ranks are also allowed to hack their games so as long as they do not use the hacks for cheating in
			survival mode.
		</p>

		<b-row tag="dl">
			<b-col sm="3" md="2" tag="dt">Mediator:</b-col>
			<b-col sm="9" md="10" tag="dd">
				Someone who has been assigned the privilege of moderating the server community. Their duty is to
				look after everyone and make sure they're on their best behavior. They are capable of building in
				Gensokyo but are not assigned to.
			</b-col>
			<b-col sm="3" md="2" tag="dt">Youkai Builder:</b-col>
			<b-col sm="9" md="10" tag="dd">
				Someone who has been assigned the privilege of building in Gensokyo, allowing them to modify and
				change what they deem necessary. These peeps have some real building talent, and are responsible for
				many of Gensokyo's structures.
			</b-col>
			<b-col sm="3" md="2" tag="dt">Sysadmin:</b-col>
			<b-col sm="9" md="10" tag="dd">
				These staff are responsible for the technology side of Yukkuricraft. Think server, plugins, discord
				bots, etc. While sysadmin have access to all commands and are effectively similar to admins, they do
				not outrank Yukkuri Admins in regards to the community.
			</b-col>
			<b-col sm="3" md="2" tag="dt">Yukkuri Admin:</b-col>
			<b-col sm="9" md="10" tag="dd">
				Yukkuri Admins are the highest roles on the server, they have access to every command and have the
				final say in decisions. These admins are entrusted to handle or oversee almost any major issue
				within the community overall and see it resolved amicably.
			</b-col>
		</b-row>

		<h3>Special ranks</h3>
		<p>
			The following ranks are special ranks that you don't see as often, but serve a purpose for specific
			circumstances.
		</p>

		<b-row tag="dl">
			<b-col sm="3" md="2" tag="dt">Probation:</b-col>
			<b-col sm="9" md="10" tag="dd">
				People who have been previously permanently banned, but are being given another chance to redeem
				their self. If this person screws up even once, they will most likely go back to being permanently
				banned and will no longer receive any chances for redemption in the future. It takes a lot to get
				this rank, you'd have to basically try to get it in order to get it.
			</b-col>
			<b-col sm="3" md="2" tag="dt">Temp. Youkai:</b-col>
			<b-col sm="9" md="10" tag="dd">
				Someone who has been temporarily granted permission to build in Gensokyo in order to give focus to
				specific projects without actually being a full-fledged builder.
			</b-col>
			<b-col sm="3" md="2" tag="dt">Retired:</b-col>
			<b-col sm="9" md="10" tag="dd">Someone who used to be on the staff team but is no longer.</b-col>
			<b-col sm="3" md="2" tag="dt">Legendary:</b-col>
			<b-col sm="9" md="10" tag="dd">
				Someone who has had a large and positive impact on the server and/or the community, but no longer
				regularly participates, sometimes having left entirely.
			</b-col>
		</b-row>

		<p>
			<strong><span style="font-size: xx-large; color: #ff0000;">DISCLAIMER:</span></strong> Mediators <em>do
			not</em> have authority over builders, they are completely even ranks that do not overpower each other
			unless it's in the category their rank is designed for. If the subject is about building decisions and
			choices, builders have first say. If it's about banning/kicking/rollback/lookups, mediators have first
			say.
		</p>
	</normal-page>
</template>

<script>
	import {BRow, BCol} from "bootstrap-vue"

	import NormalPage from "../layout/NormalPage";
	import {autoImage} from "../images";

	export default {
		components: {
			NormalPage,
			BRow,
			BCol
		},
		computed: {
			images() {
				return autoImage('people')
			}
		}
	}
</script>
