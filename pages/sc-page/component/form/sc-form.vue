<template>
	<div class="form" v-if="mGlobal.url.params.ty === 'form'">
		<li v-for="item in mgMdArr" :key="item[0]">
			<saTextarea v-if="item[0]==='co'" :label="item[1]" v-model="mShow[item[0]]"></saTextarea>
			<saInput v-else :label="item[1]" v-model="mShow[item[0]]"></saInput>
		</li>
	</div>
</template>

<script>
	import mixinForm from "./mixin-form.js";

	export default {
		mixins: [mixinForm],
	};
</script>

<style scoped></style>
