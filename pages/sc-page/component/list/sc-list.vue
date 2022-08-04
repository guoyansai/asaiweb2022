<template>
	<div v-if="provGlobal.params.ty==='list'">
		<saPage></saPage>
		<dl v-for="item in arrData" :key="item[0]">
			<dt>{{item[1]}}</dt>
			<dd>{{item[2]}}</dd>
			<dd>
				<button @click="setParams({ty:'view',sn:item[0]});">预览</button>
				<button @click="setParams({ty:'form',sn:item[0]});">编辑</button>
			</dd>
		</dl>
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
