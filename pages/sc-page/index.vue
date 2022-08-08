<template>
	<component :is="curFile"></component>
</template>

<script>
	import test from "./test/index.vue";
	import scInfo from "./sc-info/index.vue";
	import sySetting from "./sy-setting/index.vue";

	export default {
		computed: {
			curFile() {
				if (this.mMenu && this.mMenu[this.mGlobal.menu]) {
					return this.mMenu[this.mGlobal.menu].file
				} else {
					return 'test'
				}
			}
		},
		components: {
			scInfo,
			sySetting,
			test,
		},
	};
</script>

<style></style>
