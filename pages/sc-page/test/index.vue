<template>
	<div>{{title}}</div>
	<div>{{JSON.stringify(mGlobal)}}</div>
	<button @click="tJsonGet();">获取歇后语数据</button>
	<button @click="tJson1Get();">获取脑筋急转弯数据</button>
	<div class="inline"><button @click="$setParams({ty:'list'});">获取数据</button></div>
	<div class="inline"><button @click="$setParams({ty:'view',sn:'2'});">预览数据</button></div>
	<div class="inline"><button @click="$setParams({ty:'form',sn:'2'});">编辑数据</button></div>
	<div v-if="mGlobal.url.params.ty==='list'">
		<saPage></saPage>
		<dl v-for="item in arrData" :key="item[0]">
			<dt>{{item[1]}}</dt>
			<dd>{{item[2]}}</dd>
			<dd>
				<button @click="$setParams({ty:'view',sn:item[0]});">预览</button>
				<button @click="$setParams({ty:'form',sn:item[0]});">编辑</button>
			</dd>
		</dl>
	</div>

	<div v-if="mGlobal.url.params.ty==='view'">
		<dl>
			<dt>{{curView[1]}}</dt>
			<dd>{{curView[2]}}</dd>
			<button @click="$setParams({ty:'form',sn:mGlobal.url.params.sn});">编辑</button>
		</dl>
	</div>

	<div v-if="mGlobal.url.params.ty==='form'">
		<input v-model="curView[1]" />
		<input v-model="curView[2]" />
		<button @click="$setParams({ty:'view',sn:mGlobal.url.params.sn});">预览</button>
	</div>
</template>

<script>
	import mixinList from '../component/list/mixin-list.js'

	export default {
		mixins: [mixinList],
		data() {
			return {
				title: 'sc-info',
				tRes: null
			}
		},
		computed: {
			lists() {
				if (this.tRes && this.tRes.ll) {
					return this.tRes.ll || {}
				}
				return {}
			},
			arrList() {
				return Object.entries(this.lists).map(el => [el[0], ...el[1]])
			},
			arrData() {
				return this.$getList(this.arrList)
			},
			curView() {
				return [this.mGlobal.url.params.sn, ...(this.lists[this.mGlobal.url.params.sn]||[])]
			}
		},
		created() {
			if (!this.tRes || !this.tRes.li) {
				this.tJson1Get();
			}
		},
		methods: {
			tJsonGet() {
				this.$api('http://appdata.fu.asai.cc/data/info/c-g-xiehouyu/co.json', {}, {
					method: 'get'
				}).then(res => {
					this.tRes = res
					console.log(666.101, this.tRes)
				})
			},
			tJson1Get() {
				this.$api('http://appdata.fu.asai.cc/data/info/c-g-naojin/co.json', {}, {
					method: 'get'
				}).then(res => {
					this.tRes = res
					console.log(666.102, this.tRes)
				})
			},
		}
	}
</script>

<style scoped>
</style>
