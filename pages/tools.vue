<template>
	<index></index>
</template>

<script>
	import index from "./index.vue";

	export default {
		components: {
			index
		},
		onShow() {
			this.$setUrl('info', 'c-l-link', {});
		},
	};
</script>

<style scoped></style>
