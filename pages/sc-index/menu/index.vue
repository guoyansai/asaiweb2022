<template>
	<div v-for="item in mJson.config.menu" :key="item.url" @click="go(item)" :class="{cur:provGlobal.url === item.url}">
		{{item.title}}
	</div>
</template>

<script>
	export default {
		inject: ['provGlobal'],
		methods: {
			go(item) {
				Object.assign(this.provGlobal, item)
				location.href = '/#/' + url;
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
