<template>
	<dl v-for="item in mgListArr" :key="item[0]" @click="mgfGo(item)">
		<dt>{{ mgfValue(item, "tt") }}</dt>
		<dd>{{ mgfValue(item, "co") }}</dd>
	</dl>
</template>

<script>
	export default {};
</script>

<style scoped></style>
