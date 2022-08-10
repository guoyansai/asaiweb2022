<template>
	<dl class="search" v-if="mGlobal.url.params.pa">
		<span @click="mGlobal.url.params.st=mGlobal.url.params.st?0:1">排序{{mGlobal.url.params.st}}:</span>
		<picker @change="setSp" :value="mGlobal.url.params.sp" :range="searchArr">
			<view class="uni-input">{{searchArr[mGlobal.url.params.sp]}}</view>
		</picker>
		搜索项目:<picker @change="setSl" :value="mGlobal.url.params.sl" :range="searchArr">
			<view class="uni-input">{{searchArr[mGlobal.url.params.sl]}}</view>
		</picker>
		关键词:<input v-model="mGlobal.url.params.ss" @input="setUrl()">
	</dl>
</template>

<script>
	export default {
		data() {
			return {
				array: ['中国', '美国', '巴西', '日本'],
			}
		},
		computed: {
			searchArr() {
				return ['请选择', ...Object.values(this.mGlobal.dataModel.md)]
			}
		},
		methods: {
			setUrl() {
				this.$setParams(this.mGlobal.url.params)
			},
			setSp(e) {
				this.mGlobal.url.params.sp = e.detail.value
				this.setUrl()
			},
			setSl(e) {
				this.mGlobal.url.params.sl = e.detail.value
				this.setUrl()
			},
		}
	}
</script>

<style scoped>
</style>
