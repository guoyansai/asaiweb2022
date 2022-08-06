<template>
	<div class="form" v-if="provGlobal.params.ty==='form'">
		<li><label>标题：</label><input v-model="curView[1]" /></li>
		<li><label>内容：</label><textarea class="textarea" v-model="curView[2]" ></textarea></li>
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
	}
</script>

<style scoped>
</style>
