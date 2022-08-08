<template>
	<dl class="search" v-if="mGlobal.params.pa">
		排序:
		<picker @change="setSp" :value="mGlobal.params.sp" :range="array">
			<view class="uni-input">{{array[mGlobal.params.sp]}}</view>
		</picker>
		搜索项目:<picker @change="setSl" :value="mGlobal.params.sl" :range="array">
			<view class="uni-input">{{array[mGlobal.params.sl]}}</view>
		</picker>
		关键词:<input v-model="mGlobal.params.ss" @input="setUrl()">
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
				this.$setUrl(this.mGlobal, this.mGlobal.menu, this.mGlobal.params)
			},
			setSp(e) {
				this.mGlobal.params.sp = e.detail.value
			},
			setSl(e) {
				this.mGlobal.params.sl = e.detail.value
			},
		}
	}
</script>

<style scoped>
</style>
