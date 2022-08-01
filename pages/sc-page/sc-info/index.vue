<template>
	<div>{{title}}</div>
	<div>{{provGlobal}}</div>
</template>

<script>
	export default {
		inject: ["provGlobal"],
		data() {
			return {
				title: 'sc-info'
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
