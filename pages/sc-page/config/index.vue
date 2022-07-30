<template>
	<div>{{title}}</div>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Config'
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
