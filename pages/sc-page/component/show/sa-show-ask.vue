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
	<template v-if="mShow.mo">
		<dd v-if="!showMo">
			<button @click="showMo=!showMo">显示{{mgMds.mo}}</button>
		</dd>
		<dd v-if="showMo">
			<button @click="showMo=!showMo">隐藏{{mgMds.mo}}</button>
		</dd>
		<dd v-if="showMo">{{mShow.mo}}</dd>
	</template>
</template>

<script>
	export default {
		data() {
			return {
				showMo: false,
			}
		}
	};
</script>

<style scoped></style>
