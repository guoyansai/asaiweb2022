<template>
	<ul v-for="item in mgListArr" :key="item[0]" @click="mgfGo(item)">
		<li v-if="mgfValue(item, 'ic')"><img :src="mgfValue(item, 'ic')"></li>
		<dl>
			<dt>{{ mgfValue(item, "tt") }}</dt>
			<dd>{{ mgfValue(item, "co") }}</dd>
		</dl>
	</ul>
</template>

<script>
	export default {};
</script>

<style scoped></style>
