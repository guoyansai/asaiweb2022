<template>
	<component :is="curFile"></component>
</template>

<script>
	import test1 from "./test1/index.vue";
	import test2 from "./test2/index.vue";
	import scInfo from "./sc-info/index.vue";
	import bill from "./bill/index.vue";
	import config from "./config/index.vue";
	import home from "./home/index.vue";
	import info from "./info/index.vue";
	import infolog from "./infoLog/index.vue";
	import msg from "./msg/index.vue";
	import user from "./user/index.vue";

	export default {
		inject: ["provGlobal"],
		computed: {
			curFile() {
				if (this.mMenu && this.mMenu[this.provGlobal.menu]) {
					return this.mMenu[this.provGlobal.menu].file
				} else {
					return 'test1'
				}
			}
		},
		components: {
			test1,
			test2,
			scInfo,
			bill,
			config,
			home,
			info,
			infolog,
			msg,
			user,
		},
	};
</script>

<style></style>
