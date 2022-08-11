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
				if (this.mMenus && this.mMenus[this.mGlobal.url.dir]) {
					return this.mMenus[this.mGlobal.url.dir].file
				} else {
					this.mGlobal.url.dir = 'test'
					return this.mGlobal.url.dir
				}
			}
		},
	};
</script>

<style></style>
