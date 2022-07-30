<template>
	<div>{{title}}</div>{{res}}
	<div @click="api()">测试调用api</div>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Bill',
				res: null
			}
		},
		mounted() {
			console.log(666.001, this.title)
		},
		methods: {
			api() {
				console.log(666.331, 'api')
				this.$api('/t.php', {}, {}).then(res => {
					console.log(666.333, res)
					this.res = res
				}).catch(err => {
					this.res = err
				})
			}
		}
	}
</script>

<style scoped>
</style>
