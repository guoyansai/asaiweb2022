<template>
	<div v-for="item in mJson.config.menu" :key="item.value" @click="go(item.value)" :class="{cur:provGlobal.url === item.value}">
		{{item.name}}
	</div>
</template>

<script>
	export default {
		inject: ['provGlobal'],
		methods: {
			go(url) {
				this.provGlobal.url = url
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
