<template>
	<div>{{title}}</div>
	<saModel label="网址" v-model="mJson.config.api.url.key"></saModel>
	<button @click="showMask()">显示遮罩</button>
</template>

<script>
	import mixinForm from '../component/form/mixin-form.js'

	export default {
		mixins: [mixinForm],
		inject: ["provGlobal"],
		data() {
			return {
				title: '设置'
			}
		},
		methods: {
			showMask() {
				this.provGlobal.index.mask = "我的好玩的东西"
			}
		}
	}
</script>

<style scoped>
</style>
