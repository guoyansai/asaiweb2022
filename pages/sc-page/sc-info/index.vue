<template>
	<nav class="pos">
		<em @click="$setParams(provGlobal,{ty:'list'});">列表</em> / <em @click="$setParams(provGlobal,{ty:'show'});">预览</em> / <em @click="$setParams(provGlobal,{ty:'form'});">编辑</em>
	</nav>
	<scForm></scForm>
	<scList></scList>
	<scShow></scShow>
</template>

<script>
	import mixinComponent from '../component/mixin-component.js'

	export default {
		mixins: [mixinComponent],
		inject: ["provGlobal"],
		data() {
			return {
				title: 'sc-info',
			}
		},
		created() {
			if (!this.provGlobal.dataModel || !this.provGlobal.dataModel.li) {
				this.fetchJson();
			}
		},
		watch: {
			"provGlobal.menu": {
				handler(newVal, oldVal) {
					this.fetchJson()
				}
			}
		},
		methods: {
			fetchJson() {
				this.$apiJson(this.provGlobal.menu).then(res => {
					this.provGlobal.dataModel = res
				})
			},
		}
	}
</script>

<style scoped>
</style>
