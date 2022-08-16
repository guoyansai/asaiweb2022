<template>
	<li>
		<dl v-for="item in mgListArr" :key="item[0]" @click="mgfGo(item)">
			<dt>{{ mgfValue(item, "tt") }}</dt>
			<dd v-html="mgfPic(item, 'co')"></dd>
		</dl>
	</li>
</template>

<script>
	export default {};
</script>

<style scoped></style>
