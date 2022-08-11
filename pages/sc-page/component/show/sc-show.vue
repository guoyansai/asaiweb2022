<template>
	<div class="show" v-if="mGlobal.url.params.ty === 'show'">
		<h1>{{ mView[1] }}</h1>
		<article>{{ mView[2] }}</article>
	</div>
</template>

<script>
	import mixinShow from "./mixin-show.js";

	export default {
		mixins: [mixinShow],
	};
</script>

<style scoped></style>
