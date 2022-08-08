<template>
	<div class="list" v-if="mGlobal.params.ty==='list'">
		<saSearch></saSearch>
		<dl v-for="item in arrData" :key="item[0]" @click="$setParams(mGlobal,{ty:'show',sn:item[0]});">
			<dt>{{item[1]}}</dt>
			<dd>{{item[2]}}</dd>
		</dl>
		<saPage></saPage>
	</div>
</template>

<script>
	import mixinList from './mixin-list.js'

	export default {
		mixins: [mixinList],
		computed: {
			lists() {
				if (this.mGlobal.dataModel && this.mGlobal.dataModel.ll) {
					return this.mGlobal.dataModel.ll || {}
				}
				return {}
			},
			arrList() {
				return Object.entries(this.lists).map(el => [el[0], ...el[1]])
			},
			arrData() {
				return this.$getList(this.arrList, this.mGlobal.params)
			},
		},
	}
</script>

<style scoped>
</style>
