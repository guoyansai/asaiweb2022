<template>
	<div v-for="item in mMenuArr" :key="item[0]" @click="go(item)" :class="{cur:provGlobal.menu === item[0]}">
		{{item[1].title}}
	</div>
</template>

<script>
	export default {
		inject: ['provGlobal'],
		methods: {
			go(item) {
				this.provGlobal.params = item[1].params
				this.$setUrl(this.provGlobal, item[0], {})
			}
		}
	}
</script>

<style scoped>
	div {
		display: inline-block;
		background-color: #f5f5f5;
		padding: 6px 12px;
		cursor: pointer;
	}

	.cur {
		background-color: #d8d8d8;
	}
</style>
