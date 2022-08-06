<template>
	<div class="list" v-if="provGlobal.params.ty==='list'">
		<saSearch></saSearch>
		<dl v-for="item in arrData" :key="item[0]" @click="$setParams(provGlobal,{ty:'show',sn:item[0]});">
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
		inject: ["provGlobal"],
		computed: {
			lists() {
				if (this.provGlobal.dataModel && this.provGlobal.dataModel.ll) {
					return this.provGlobal.dataModel.ll || {}
				}
				return {}
			},
			arrList() {
				return Object.entries(this.lists).map(el => [el[0], ...el[1]])
			},
			arrData() {
				return this.$getList(this.arrList, this.provGlobal.params)
			},
		},
	}
</script>

<style scoped>
</style>
