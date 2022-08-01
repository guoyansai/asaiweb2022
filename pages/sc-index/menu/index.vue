<template>
	<div v-for="item in mMenuKeys" :key="item" @click="go(item)" :class="{cur:provGlobal.menu === item}">
		{{mMenu[item].title}}
	</div>
</template>

<script>
	export default {
		inject: ['provGlobal'],
		methods: {
			go(item) {
				this.$setUrl(this.provGlobal, item, {})
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
