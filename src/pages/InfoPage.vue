<template>
	<normal-page :parallax-images="images">
		<vue-headful title="YukkuriCraft"
					 description="Yukkuricraft is the online community that brought you a fully explorable rendition of Gensokyo of Touhou Project fame in Minecraft! Our Gensokyo project is a community-led effort - we welcome all players to join the fun!"
					 :image="require('../favicon_upscaled.png')" url="https://info.yukkuricraft.net/"/>

		<template v-slot:parallax>
			<h1>Yukkuricraft</h1>
			<p>The largest english Touhou Minecraft server.</p>
			<p class="lead">Server IP: mc.yukkuricraft.net</p>

			<router-link :to="{'name': 'download_genso'}" v-slot="{ href, navigate }">
				<a class="btn btn-primary" :href="href" @click="navigate">Map download</a>
			</router-link>
			<router-link :to="{'name': 'download_survival'}" v-slot="{ href, navigate }">
				<a class="btn btn-primary" :href="href" @click="navigate">Survival download</a>
			</router-link>
		</template>

		<div class="row mt-5">
			<div class="col-md-6">
				<h2>Who are we</h2>
				<p>
					Yukkuricraft is the online community that brought you a fully explorable rendition of Gensokyo of
					Touhou Project fame in Minecraft! Our Gensokyo project is a community-led effort - we welcome all
					players to join the fun!
				</p>
			</div>
			<div class="col-md-6">
				<div class="embed-responsive embed-responsive-16by9">
					<!-- https://css-tricks.com/lazy-load-embedded-youtube-videos/ -->
					<iframe title="YC trailer" class="embed-responsive-item"
							src="https://www.youtube-nocookie.com/embed/L6mD2zj8CGs"
							srcdoc="<style>*{padding:0;margin:0;overflow:hidden}html,body{height:100%}img,span{position:absolute;width:100%;top:0;bottom:0;margin:auto}span{height:1.5em;text-align:center;font:48px/1.5 sans-serif;color:white;text-shadow:0 0 0.5em black}</style><a href=https://www.youtube-nocookie.com/embed/L6mD2zj8CGs?autoplay=1><img src=https://img.youtube.com/vi/L6mD2zj8CGs/hqdefault.jpg alt='Video 【Trailer】【Touhou Minecraft】Gensokyo ~ The Second Dream v2 Shortened Trailer Edition'><span>▶</span></a>"
							frameborder="0"
							allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
							allowfullscreen></iframe>
				</div>
			</div>
		</div>

		<h2>Server and Discord</h2>
		<div class="row">
			<div v-if="serverPing.description" class="col-md-8">
				<div class="card" style="height: 100%">
					<div class="card-header">
						<pre style="display: inline">mc.yukkuricraft.net</pre>
						<span class="bg-success dot"></span> Online
					</div>
					<div class="card-body">
						<h3 class="card-title h5" v-html="parseMCCodes(serverPing.description).raw"></h3>
						<div class="card-text">
							<font-awesome-icon :icon="['fas', 'signal']"/>
							Ping: {{ serverPing.latency }} ms

							<div>
								<br/>
								Players: {{ serverPing.players.online }} / {{ serverPing.players.max }}
								<div class="row">
									<div class="col-md-4" v-for="playerChunk in chunk(serverPing.players.sample, 8)">
										<ul class="list-unstyled">
											<li v-for="player in playerChunk">
												<img :src="'https://mc-heads.net/avatar/' + player.id + '/32'"
													 :alt="player.name">
												{{ player.name }}
											</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div v-else class="col-md-8">
				<div class="card">
					<div class="card-header">
						<pre style="display: inline">mc.yukkuricraft.net</pre>
						<span class="bg-danger dot"></span> Offline
					</div>
				</div>
			</div>
			<div class="col-md-4">
				<iframe src="https://discordapp.com/widget?id=201938197171798017&theme=light" width="350" height="500"
						allowtransparency="true" frameborder="0"></iframe>
			</div>
		</div>

		<h2 id="subdomains">Our Subdomains and Pages</h2>
		<h3>General</h3>
		<ul>
			<li><a href="https://yukkuricraft.net" target="noopener">https://yukkuricraft.net</a> - Our main
				forum and
				page!
			</li>
			<li>
				<router-link :to="{name: 'info'}">http://info.yukkuricraft.net</router-link>
				- You're
				looking at
				it right now!
			</li>
			<li>mc.yukkuricraft.net - Join this IP to play on our server!</li>
			<li><a href="http://mc.yukkuricraft.net:18123" target="noopener">http://mc.yukkuricraft.net:18123</a> -
				Our
				dynmap!
			</li>
			<li><a href="http://bugs.yukkuricraft.net" target="noopener">http://bugs.yukkuricraft.net</a> - This
				will
				take you
				to a page where you can submit a bug report for anything that needs to be fixed! No login
				required!
			</li>
			<li><a href="http://discord.yukkuricraft.net/" target="noopener">http://discord.yukkuricraft.net/</a> -
				Our
				Discord server
			</li>
		</ul>

		<h3>Social media</h3>
		<ul>
			<li><a href="http://www.facebook.com/yukkuricraft"
				   target="noopener">http://www.facebook.com/yukkuricraft</a>
				-
				Facebook Page
			</li>
			<li><a href="http://www.facebook.com/groups/yukkuricraft" target="noopener">http://www.facebook.com/groups/yukkuricraft</a>
				- Facebook Group
			</li>
			<li><a href="http://steamcommunity.com/groups/yukkuricraft" target="noopener">http://steamcommunity.com/groups/yukkuricraft</a>
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
			<li><strong>Email: </strong>scarletjaeger (@) gmail.com</li>
			<li><strong>Discord: </strong>Remi#5619</li>
			<li><strong>Steam: </strong>Mr. Bromilia Amatsukaze Scarlet</li>
		</ol>

		<p>Also consider joining our <a href="http://steamcommunity.com/groups/yukkuricraft">Steam Group</a> and
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
	import NormalPage from "../layout/NormalPage";
	import {makeImage} from "../images";
	import {parseMCCodes} from "../colorFormatter";
	import {mapState} from 'vuex';
	import chunk from "lodash/chunk"

	export default {
		components: {
			NormalPage,
		},
		data() {
			return {
				showEmbed: false
			}
		},
		computed: {
			images() {
				return makeImage(
					require('../images/hakurei.png'),
					require('../images/hakurei.webp'),
					require('../images/hakurei_small.jpg'),
					require('../images/hakurei_small.webp'),
				)
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