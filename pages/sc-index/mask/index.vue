<template>
	<div class="mask" v-if="mGlobal.index.mask">
		<dt>{{mGlobal.index.mask}}</dt>
		<dd><button @click="close()">关闭</button></dd>
	</div>
</template>

<script>
	export default {
		methods: {
			close() {
				this.mGlobal.index.mask = ""
			}
		}
	}
</script>

<style scoped>
</style>
