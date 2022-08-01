<template>
	<div>{{title}}</div>
	<scInput v-model="title" placeholder="请输入一个标题" title="标题" name="title" :style="{width:'200px'}">
	</scInput>

	<h1>表单</h1>
	<div v-for="(item,index) in keys" :key="'info'+index" class="inline">
	{{lists[item].fv}}	<scInput :scitem="lists[item]"></scInput>
	</div>
</template>

<script>
	import MixinForm from '../component/form/mixin-form.js'

	export default {
		mixins: [MixinForm],
		data() {
			return {
				title: 'Info',
			}
		},
		computed: {
			lists() {
				return this.mJson.db.info
			},
			keys() {
				return Object.keys(this.lists)
			}
		},
		mounted() {
			console.log(666.001, this.title)
		},
		methods: {

		}
	}
</script>

<style scoped>
</style>
