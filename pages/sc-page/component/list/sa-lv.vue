<template>
	<i :class="`lv${getLv}`"></i>
</template>

<script>
	export default {
		props: ['sn'],
		computed: {
			getLv() {
				return this.mrDatas[this.sn] ? 2 : 3
			}
		}
	}
</script>

<style scoped>
</style>
