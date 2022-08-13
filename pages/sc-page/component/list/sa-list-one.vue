<template>
	<dl v-for="item in mgListArr" :key="item[0]" @click="mgfGo(item)">
		<dt>{{ mgfVal(item, "tt") }}</dt>
		<dd>{{ mgfVal(item, "co") }}</dd>
	</dl>
</template>

<script>
	export default {};
</script>

<style scoped></style>
