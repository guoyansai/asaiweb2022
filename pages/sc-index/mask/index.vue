<template>
	<div class="mask" v-if="mGlobal.index.mask">
		<dl>
			<dt>{{mGlobal.index.mask}}</dt>
			<dt v-if="mGlobal.index.progress">{{mGlobal.index.progress}}</dt>
			<dd><button @click="close()">关闭</button></dd>
		</dl>
	</div>
</template>

<script>
	export default {
		methods: {
			close() {
				this.mGlobal.index.mask = ""
				if (this.isUni) {
					if (this.mrTasks.cur) {
						this.mrTasks.cur = '';
						this.mGlobal.index.progress = "";
					}
				}
			}
		}
	}
</script>

<style scoped>
</style>
