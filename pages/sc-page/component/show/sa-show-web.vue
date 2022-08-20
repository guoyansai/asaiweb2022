<template>
	<h1 v-if="mShow.tt">{{ mShow.tt }}</h1>
	<dt v-if="mShow.sn||mShow.us||mShow.cd||mShow.rd||mShow.xy">
		{{`
	${mgfShow('sn')} 
	${mgfShow('us')} 
	${mgfShow('cd')} 
	${mgfShow('rd')} 
	${mgfShow('xy')}
	`}}
	</dt>
	<div class="pic" v-if="mShow.ic"><img :src="mShow.ic"></div>
	<article v-html="mShow.co"></article>
	<dd v-if="mShow.mo">{{mShow.mo}}</dd>
	<web-view v-if="mShow.ur" :src="webUrl" :fullscreen="false"></web-view>
</template>

<script>
	export default {
		computed: {
			webUrl() {
				if (this.mShow.ur) {
					if (this.mShow.ur.indexOf('http.') > -1) {
						return `/hybrid/${this.mShow.ur.replace('http.','')}/index.html`
					}
					return this.mShow.ur;
				}
			}
		}
	};
</script>

<style scoped></style>
