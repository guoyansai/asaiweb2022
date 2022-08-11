<template>
	<nav>
		<div v-for="item in mMenuArr" :key="item[0]" @click="$xiMenu(item[1])"
			:class="{ cur: mGlobal.url.dir === item[0] }">
			{{ item[1].title }}
		</div>
	</nav>
</template>

<script>
	export default {};
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
