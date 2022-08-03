<template>
	<div>{{title}}</div>
	<scModel label="网址" v-model="mJson.config.api.url.key"></scModel>
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
	}
</script>

<style scoped>
</style>
