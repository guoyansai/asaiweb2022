<template>
	<header>
		<indexMenu></indexMenu>
	</header>
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
					menu: 'test1',
					haha: '试试看 ',
					params: {}
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
			const locations = (window.location.hash.substring(2) + '/').split('/')
			this.provGlobal.menu = locations[0]
			this.provGlobal.params = this.classParams.paramsUrl(locations[1])
			console.log(666.001, locations, this.provGlobal)
		},
	}
</script>

<style scoped>
	header {
		border: 1px solid #d8d8d8;
		overflow: auto;
		white-space: nowrap;
	}
</style>
