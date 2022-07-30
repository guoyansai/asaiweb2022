<template>
	<div>{{title}}</div>飞飞飞
</template>

<script>
	export default {
		data() {
			return {
				title: 'Msg'
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
