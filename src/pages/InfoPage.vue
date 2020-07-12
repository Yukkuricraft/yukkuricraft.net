<template>
	<normal-page :parallax-images="images">
		<vue-headful title="YukkuriCraft"
					 description="Yukkuricraft is the online community that brought you a fully explorable rendition of Gensokyo of Touhou Project fame in Minecraft! Our Gensokyo project is a community-led effort - we welcome all players to join the fun!"
					 :image="require('../favicon_upscaled.png')" url="https://info.yukkuricraft.net/"/>

		<template v-slot:parallax>
			<h1>Yukkuricraft</h1>
			<p>The largest english Touhou Minecraft server.</p>
			<p class="lead">Server IP: mc.yukkuricraft.net</p>
            <p>MC Version: 1.14 or 1.15</p>

			<b-button :to="{'name': 'download_genso'}" variant="primary">Map download</b-button>
			<b-button :to="{'name': 'download_survival'}" variant="primary">Survival download</b-button>
		</template>

		<b-row class="mt-5">
			<b-col md="6">
				<h2>Who are we</h2>
				<p>
					Yukkuricraft is the online community that brought you a fully explorable rendition of Gensokyo of
					Touhou Project fame in Minecraft! Our Gensokyo project is a community-led effort - we welcome all
					players to join the fun!
				</p>
			</b-col>
			<b-col md="6">
				<!-- https://css-tricks.com/lazy-load-embedded-youtube-videos/ -->
				<b-embed type="iframe"
						 aspect="16by9"
						 title="YC trailer"
						 src="https://www.youtube-nocookie.com/embed/L6mD2zj8CGs"
						 srcdoc="<style>*{padding:0;margin:0;overflow:hidden}html,body{height:100%}img,span{position:absolute;width:100%;top:0;bottom:0;margin:auto}span{height:1.5em;text-align:center;font:48px/1.5 sans-serif;color:white;text-shadow:0 0 0.5em black}</style><a href=https://www.youtube-nocookie.com/embed/L6mD2zj8CGs?autoplay=1><img src=https://img.youtube.com/vi/L6mD2zj8CGs/hqdefault.jpg alt='Video 【Trailer】【Touhou Minecraft】Gensokyo ~ The Second Dream v2 Shortened Trailer Edition'><span>▶</span></a>"
						 frameborder="0"
						 allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
						 allowfullscreen
				/>
			</b-col>
		</b-row>

		<h2>Server and Discord</h2>
		<b-row>
			<b-col md="8" v-if="serverPing.description">
				<b-card no-body style="height: 100%">
					<b-card-header>
						<pre style="display: inline">mc.yukkuricraft.net</pre>
						<span class="bg-success dot"></span> Online
					</b-card-header>
					<b-card-body>
						<b-card-title class="h5" v-html="parseMCCodes(serverPing.description).raw"></b-card-title>
						<b-card-text>
							<font-awesome-icon :icon="['fas', 'signal']"/>
							Ping: {{ serverPing.latency }} ms

							<div>
								<br/>
								Players: {{ serverPing.players.online }} / {{ serverPing.players.max }}
								<b-row>
									<b-col md="4" v-for="playerChunk in chunk(serverPing.players.sample, 8)" :key="playerChunk[0].id">
										<ul class="list-unstyled">
											<li v-for="player in playerChunk">
												<img :src="'https://mc-heads.net/avatar/' + player.id + '/32'"
													 :alt="player.name">
												{{ player.name }}
											</li>
										</ul>
									</b-col>
								</b-row>
							</div>
						</b-card-text>
					</b-card-body>
				</b-card>
			</b-col>
			<b-col md="8" v-else>
				<b-card no-body>
					<b-card-header>
						<pre style="display: inline">mc.yukkuricraft.net</pre>
						<span class="bg-danger dot"></span> Offline
					</b-card-header>
				</b-card>
			</b-col>
			<b-col md="4">
				<iframe src="https://discordapp.com/widget?id=201938197171798017&theme=light" width="350" height="500"
						allowtransparency="true" frameborder="0"></iframe>
			</b-col>
		</b-row>

		<h2 id="subdomains">Our Subdomains and Pages</h2>
		<h3>General</h3>
		<ul>
			<li><a href="https://yukkuricraft.net" target="noopener">https://yukkuricraft.net</a> - Our main
				forum and
				page!
			</li>
			<li>
				<router-link :to="{name: 'info'}">https://info.yukkuricraft.net</router-link>
				- You're
				looking at
				it right now!
			</li>
			<li>mc.yukkuricraft.net - Join this IP to play on our server!</li>
			<li><a href="http://mc.yukkuricraft.net:18123" target="noopener">https://mc.yukkuricraft.net:18123</a> -
				Our
				dynmap!
			</li>
			<li><a href="https://bugs.yukkuricraft.net" target="noopener">https://bugs.yukkuricraft.net</a> - This
				will
				take you
				to a page where you can submit a bug report for anything that needs to be fixed! No login
				required!
			</li>
			<li><a href="https://discord.yukkuricraft.net/" target="noopener">https://discord.yukkuricraft.net/</a> -
				Our
				Discord server
			</li>
		</ul>

		<h3>Social media</h3>
		<ul>
			<li><a href="https://www.facebook.com/yukkuricraft"
				   target="noopener">https://www.facebook.com/yukkuricraft</a>
				-
				Facebook Page
			</li>
			<li><a href="https://www.facebook.com/groups/yukkuricraft" target="noopener">https://www.facebook.com/groups/yukkuricraft</a>
				- Facebook Group
			</li>
			<li><a href="https://steamcommunity.com/groups/yukkuricraft" target="noopener">https://steamcommunity.com/groups/yukkuricraft</a>
				- Steam Group
			</li>
		</ul>

		<h3>Other</h3>
		<ul>
			<li><a href="https://forms.gle/gwFiECrDKNiJwLzH8">Ban appeals</a></li>
		</ul>

		<h2 id="contact">Contact Us</h2>
		<p>Honestly, there isn't much to say. This is Remi_Scarlet's contact information. Contact me with your
			preferred
			method.
		</p>
		<ol>
			<li><strong>Email: </strong>remi (@) yukkuricraft.net</li>
			<li><strong>Discord: </strong>Remi#5619</li>
			<li><strong>Steam: </strong>Mr. Bromilia Amatsukaze Scarlet</li>
		</ol>

		<p>Also consider joining our <a href="https://steamcommunity.com/groups/yukkuricraft">Steam Group</a> and
			liking our
			<a href="https://facebook.com/yukkuricraft">Facebook Page</a>!
		</p>
		<br/>
	</normal-page>
</template>

<style lang="scss">
	.dot {
		height: 15px;
		width: 15px;
		background-color: #bbb;
		border-radius: 50%;
		display: inline-block;
	}
</style>

<script>
	import {BButton, BRow, BCol, BEmbed, BCard, BCardHeader, BCardBody, BCardTitle, BCardText} from "bootstrap-vue"

	import NormalPage from "../layout/NormalPage";
	import {autoImage} from "../images";
	import {parseMCCodes} from "../colorFormatter";
	import {mapState} from 'vuex';
	import chunk from "lodash/chunk"

	export default {
		components: {
			NormalPage,
			BButton,
			BRow,
			BCol,
			BEmbed,
			BCard,
			BCardHeader,
			BCardBody,
			BCardTitle,
			BCardText
		},
		computed: {
			images() {
				return autoImage('hakurei')
			},
			...mapState('server', {
				serverPing: 'ping',
			})
		},
		methods: {
			parseMCCodes,
			chunk
		}
	}
</script>
