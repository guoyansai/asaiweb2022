<template>
	<component :is="curFile"></component>
</template>

<script>
	import scInfo from "./sc-info/index.vue";
	import sySetting from "./sy-setting/index.vue";

	export default {
		components: {
			scInfo,
			sySetting,
		},
		computed: {
			curFile() {
				if (this.mMenus && this.mMenus[this.mGlobal.url.dir]) {
					return this.mMenus[this.mGlobal.url.dir].file
				} else {
					this.mGlobal.url.dir = 'info'
					return this.mGlobal.url.dir
				}
			}
		},
	};
</script>

<style></style>
