<template>
	<div class="mask" v-if="provGlobal.index.mask">
		<dt>{{provGlobal.index.mask}}</dt>
		<dd><button @click="close()">关闭</button></dd>
	</div>
</template>

<script>
	export default {
		inject: ['provGlobal'],
		methods: {
			close() {
				this.provGlobal.index.mask = ""
			}
		}
	}
</script>

<style scoped>
</style>
