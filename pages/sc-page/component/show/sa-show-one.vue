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
	<article>{{mShow.co}}</article>
	<dd v-if="mShow.mo">{{mShow.mo}}</dd>
</template>

<script>
	export default {};
</script>

<style scoped></style>
