<template>
	<div class="inline"><button @click="setParams({ty:'list'});">获取数据</button></div>
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
			setParams(params) {
				Object.assign(this.provGlobal.params, params)
				this.$setUrl(this.provGlobal, this.provGlobal.menu, this.provGlobal.params)
			},
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
