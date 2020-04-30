<template>
	<normal-page parallax-class="parallax-info">
		<template v-slot:parallax>
			<h1>Yukkuricraft Info</h1>
			<p>A collection of information so you don't have to go looking for it elsewhere.</p>
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
				<h3>Current events: Hisoutensoku tournament</h3>
				The first YukkuriCraft Touhou 12.3 tournament in over half a decade.

				The tournament will take place on <strong>9th of May, 7:00 PM UTC</strong> and will be streamed by our lovely Yaffy at <a href="https://www.twitch.tv/yaffyfan">https://www.twitch.tv/yaffyfan</a>

				Sign up at <a href="https://challonge.com/YCHisouten2020">Challonge</a>
			</div>
			<div class="col-md-6">
				<div class="embed-responsive embed-responsive-16by9">
					<iframe class="embed-responsive-item" src="https://www.youtube-nocookie.com/embed/L6mD2zj8CGs"
							frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
							allowfullscreen></iframe>
				</div>
			</div>
		</div>

		<div class="row mt-3">
			<div class="col-md-8">
				<span id="subdomains" class="anchor-offset"></span>
				<h2 id="subdomains">Our Subdomains and Pages</h2>
				<h3>General</h3>
				<ul>
					<li><a href="https://yukkuricraft.net" target="_blank">https://yukkuricraft.net</a> - Our main forum and
						page!
					</li>
					<li><a href="http://info.yukkuricraft.net" target="_blank">http://info.yukkuricraft.net</a> - You're
						looking at
						it right now!
					</li>
					<li>mc.yukkuricraft.net - Join this IP to play on our server!</li>
					<li><a href="http://mc.yukkuricraft.net:18123" target="_blank">http://mc.yukkuricraft.net:18123</a> -
						Our
						dynmap!
					</li>
					<li><a href="http://bugs.yukkuricraft.net" target="_blank">http://bugs.yukkuricraft.net</a> - This will
						take you
						to a page where you can submit a bug report for anything that needs to be fixed! No login required!
					</li>
					<li><a href="http://discord.yukkuricraft.net/" target="_blank">http://discord.yukkuricraft.net/</a> -
						Our
						Discord server
					</li>
				</ul>

				<h3>Social media</h3>
				<ul>
					<li><a href="http://www.facebook.com/yukkuricraft" target="_blank">http://www.facebook.com/yukkuricraft</a>
						-
						Facebook Page
					</li>
					<li><a href="http://www.facebook.com/groups/yukkuricraft" target="_blank">http://www.facebook.com/groups/yukkuricraft</a>
						- Facebook Group
					</li>
					<li><a href="http://steamcommunity.com/groups/yukkuricraft" target="_blank">http://steamcommunity.com/groups/yukkuricraft</a>
						- Steam Group
					</li>
				</ul>

				<h3>Other</h3>
				<ul>
					<li><a href="https://forms.gle/gwFiECrDKNiJwLzH8">Ban appeals</a></li>
				</ul>
			</div>
			<div class="col-md-4">
				<iframe src="https://discordapp.com/widget?id=201938197171798017&theme=light"
						width="350" height="500" allowtransparency="true" frameborder="0"></iframe>
			</div>
		</div>

		<span id="contact" class="anchor-offset"></span>
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

<script>
	import ParallaxImage from "../components/ParallaxImage";
	import InfoFooter from "../components/InfoFooter";
	import NormalPage from "../layout/NormalPage";

	export default {
		components: {
			NormalPage,
			ParallaxImage,
			InfoFooter
		}
	}
</script>