<template>
	<dl class="search" v-if="mGlobal.url.params.pa">
		排序:
		<picker @change="setSp" :value="mGlobal.url.params.sp" :range="array">
			<view class="uni-input">{{array[mGlobal.url.params.sp]}}</view>
		</picker>
		搜索项目:<picker @change="setSl" :value="mGlobal.url.params.sl" :range="array">
			<view class="uni-input">{{array[mGlobal.url.params.sl]}}</view>
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
		methods: {
			setUrl() {
				this.$setUrl(this.mGlobal.url.menu, this.mGlobal.url.params)
			},
			setSp(e) {
				this.mGlobal.url.params.sp = e.detail.value
			},
			setSl(e) {
				this.mGlobal.url.params.sl = e.detail.value
			},
		}
	}
</script>

<style scoped>
</style>
