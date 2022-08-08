<template>
	<nav>
		<indexMenu></indexMenu>
	</nav>
	<page></page>
	<indexMask></indexMask>
</template>

<script>
	import indexMenu from './sc-index/menu/index.vue'
	import indexMask from './sc-index/mask/index.vue'
	import page from './sc-page/index.vue'

	export default {
		components: {
			indexMenu,
			indexMask,
			page
		},
		data() {
			return {
				activeIndex: 'index',
				isPath: 'bill',
				isPage: null,
				provGlobal: {
					haha: '试试看 ',
					index: {},
					menu: 'test',
					params: {},
					dataModel: {}
				},
				component: null
			}
		},
		provide() {
			return {
				provGlobal: this.provGlobal
			}
		},
		onLoad() {
			this.$getUrl(this.provGlobal)
			this.$apiInit(this.provGlobal)
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
