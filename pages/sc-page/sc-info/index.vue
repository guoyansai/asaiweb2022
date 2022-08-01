<template>
	<div>{{title}}</div>
	<div>{{JSON.stringify(provGlobal)}}</div>
	<div class="inline"><button @click="setParams({ty:'list',pg:1,ps:20,ss:'',sl:''});">获取数据</button></div>
	<div class="inline"><button @click="setParams({ty:'view',sn:'2'});">预览数据</button></div>
	<div class="inline"><button @click="setParams({ty:'form',sn:'2'});">编辑数据</button></div>
	<div v-if="provGlobal.params.ty==='list'">
		<dl v-for="item in arrList" :key="item">
			<dt>{{lists[item][1]}}</dt>
			<dd>{{lists[item][2]}}</dd>
			<dd>
				<button @click="setParams({ty:'view',sn:item});">预览</button>
				<button @click="setParams({ty:'form',sn:item});">编辑</button>
			</dd>
		</dl>
	</div>

	<div v-if="provGlobal.params.ty==='view'">
		<dl>
			<dt>{{curView[1]}}</dt>
			<dd>{{curView[2]}}</dd>
			<button @click="setParams({ty:'form',sn:provGlobal.params.sn});">编辑</button>
		</dl>
	</div>

	<div v-if="provGlobal.params.ty==='form'">
		<input v-model="curView[1]" />
		<input v-model="curView[2]" />
		<button @click="setParams({ty:'view',sn:provGlobal.params.sn});">预览</button>
	</div>
</template>

<script>
	export default {
		inject: ["provGlobal"],
		data() {
			return {
				title: 'sc-info',
				tRes: null
			}
		},
		computed: {
			lists() {
				if (this.tRes && this.tRes.li) {
					return this.tRes.li.dt || {}
				}
				return {}
			},
			arrList() {
				return Object.keys(this.lists)
			},
			curView() {
				return this.lists[this.provGlobal.params.sn] || [, ]
			}
		},
		created() {
			console.log(666.98789)
			if (!this.tRes || !this.tRes.li) {
				this.tJson1Get();
			}
		},
		methods: {
			setParams(params) {
				this.$setUrl(this.provGlobal, this.provGlobal.menu, params)
			},
			tJson1Get() {
				this.$api('http://appdata.fu.asai.cc/data/tools/co/study/g-naojing/co.json', {}, {
					method: 'get'
				}).then(res => {
					this.tRes = res
					console.log(666.001, this.tRes)
				})
			},
		}
	}
</script>

<style scoped>
</style>
