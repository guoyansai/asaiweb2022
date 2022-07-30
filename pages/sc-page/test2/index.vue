<template>
	test222222222222222模板{{provGlobal.haha}}
	<input v-model="provGlobal.haha">
</template>

<script>
	export default {
		inject: ['provGlobal'],
	}
</script>

<style>
</style>
