<template>
	<div class="toast" v-if="mGlobal.index.toast" @click="close()">
		<span>{{ mGlobal.index.toast }}</span>
	</div>
</template>

<script>
	export default {
		watch: {
			'mGlobal.index.toast': {
				handler(newVal, oldVal) {
					console.log(666.1005, newVal, oldVal)
					if (newVal) {
						let timeFun = null;
						timeFun = setTimeout(() => {
							this.close();
							timeFun = null
						}, 3000)
					}
				},
				immediate: true
			}
		},
		methods: {
			close() {
				this.mGlobal.index.toast = "";
			},
		},
	};
</script>

<style scoped></style>
