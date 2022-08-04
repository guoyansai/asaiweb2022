<template>
	<div v-if="provGlobal.params.ty==='form'">
		<input v-model="curView[1]" />
		<input v-model="curView[2]" />
		<button @click="setParams({ty:'view',sn:provGlobal.params.sn});">预览</button>
	</div>
</template>

<script>
	import mixinForm from './mixin-form.js'

	export default {
		mixins: [mixinForm],
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
