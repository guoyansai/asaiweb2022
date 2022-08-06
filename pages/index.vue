<template>
	<nav>
		<indexMenu></indexMenu>
	</nav>
	<page></page>
</template>

<script>
	import indexMenu from './sc-index/menu/index.vue'
	import page from './sc-page/index.vue'

	export default {
		components: {
			indexMenu,
			page
		},
		data() {
			return {
				activeIndex: 'index',
				isPath: 'bill',
				isPage: null,
				provGlobal: {
					haha: '试试看 ',
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
