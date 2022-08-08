<template>
	<nav>
		<indexMenu></indexMenu>
	</nav>
	<page></page>
	<indexMask></indexMask>
	<indexToast></indexToast>
</template>

<script>
	import indexMenu from './sc-index/menu/index.vue'
	import indexMask from './sc-index/mask/index.vue'
	import indexToast from './sc-index/toast/index.vue'
	import page from './sc-page/index.vue'

	export default {
		components: {
			indexMenu,
			indexMask,
			indexToast,
			page
		},
		data() {
			return {
				activeIndex: 'index',
				isPath: 'bill',
				isPage: null,
				component: null
			}
		},
		onLoad() {
			this.$getUrl(this.mGlobal)
		},
	}
</script>

<style scoped>
	nav {
		border: 1px solid #d8d8d8;
		overflow: auto;
		white-space: nowrap;
	}
</style>
