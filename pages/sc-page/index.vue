<template>
	<component :is="curFile"></component>
</template>

<script>
	import test from "./test/index.vue";
	import scInfo from "./sc-info/index.vue";
	import sySetting from "./sy-setting/index.vue";

	export default {
		inject: ["provGlobal"],
		computed: {
			curFile() {
				if (this.mMenu && this.mMenu[this.provGlobal.menu]) {
					return this.mMenu[this.provGlobal.menu].file
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
