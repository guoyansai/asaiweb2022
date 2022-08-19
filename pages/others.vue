<template>
	<index></index>
</template>

<script>
	import index from "./index.vue";

	export default {
		components: {
			index
		},
		onLoad() {
			this.mGlobal.url.dir = 'info';
			this.mGlobal.url.menu = 'c-l-link';
		},
	};
</script>

<style scoped></style>
