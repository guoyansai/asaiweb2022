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
			this.mGlobal.url.dir = 'sySetting'
		},
	};
</script>

<style scoped></style>
