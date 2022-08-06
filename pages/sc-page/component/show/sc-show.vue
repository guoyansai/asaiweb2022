<template>
	<div class="show" v-if="provGlobal.params.ty==='show'">
		<h1>{{curView[1]}}</h1>
		<article>{{curView[2]}}</article>
	</div>
</template>

<script>
	import mixinShow from './mixin-show.js'

	export default {
		mixins: [mixinShow],
		inject: ["provGlobal"],
		computed: {
			lists() {
				if (this.provGlobal.dataModel && this.provGlobal.dataModel.ll) {
					return this.provGlobal.dataModel.ll || {}
				}
				return {}
			},
			curView() {
				return [this.provGlobal.params.sn, ...(this.lists[this.provGlobal.params.sn] || [])]
			}
		},
	}
</script>

<style scoped>
</style>
