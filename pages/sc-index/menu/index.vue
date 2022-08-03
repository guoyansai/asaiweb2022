<template>
	<div v-for="item in mMenuArr" :key="item[0]" @click="go(item[0])" :class="{cur:provGlobal.menu === item[0]}">
		{{item[1].title}}
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
