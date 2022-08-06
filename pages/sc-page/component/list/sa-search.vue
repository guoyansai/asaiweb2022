<template>
	<dl class="search" v-if="provGlobal.params.pa">
		排序:
		<picker @change="setSp" :value="provGlobal.params.sp" :range="array">
			<view class="uni-input">{{array[provGlobal.params.sp]}}</view>
		</picker>
		搜索项目:<picker @change="setSl" :value="provGlobal.params.sl" :range="array">
			<view class="uni-input">{{array[provGlobal.params.sl]}}</view>
		</picker>
		关键词:<input v-model="provGlobal.params.ss" @input="setUrl()">
	</dl>
</template>

<script>
	export default {
		inject: ["provGlobal"],
		data() {
			return {
				array: ['中国', '美国', '巴西', '日本'],
			}
		},
		methods: {
			setUrl() {
				this.$setUrl(this.provGlobal, this.provGlobal.menu, this.provGlobal.params)
			},
			setSp(e) {
				this.provGlobal.params.sp = e.detail.value
			},
			setSl(e) {
				this.provGlobal.params.sl = e.detail.value
			},
		}
	}
</script>

<style scoped>
</style>
