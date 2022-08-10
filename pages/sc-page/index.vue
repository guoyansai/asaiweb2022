<template>
	<component :is="curFile"></component>
</template>

<script>
	import test from "./test/index.vue";
	import scInfo from "./sc-info/index.vue";
	import sySetting from "./sy-setting/index.vue";

	export default {
		components: {
			scInfo,
			sySetting,
			test,
		},
		computed: {
			curFile() {
				if (this.mMenu && this.mMenu[this.mGlobal.url.dir]) {
					return this.mMenu[this.mGlobal.url.dir].file
				} else {
					return 'test'
				}
			}
		},
	};
</script>

<style></style>
