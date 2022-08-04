<template>
	<div v-if="provGlobal.params.ty==='view'">
		<dl>
			<dt>{{curView[1]}}</dt>
			<dd>{{curView[2]}}</dd>
			<button @click="setParams({ty:'form',sn:provGlobal.params.sn});">编辑</button>
		</dl>
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
		methods: {
			setParams(params) {
				Object.assign(this.provGlobal.params, params)
				this.$setUrl(this.provGlobal, this.provGlobal.menu, this.provGlobal.params)
			},
		}
	}
</script>

<style scoped>
</style>
