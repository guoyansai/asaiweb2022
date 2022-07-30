<template>
	test111111111111111模板{{provGlobal.haha}}
	<input v-model="provGlobal.haha">
	<div @click="show()">这是一个帅气的东西</div>
	<div @click="tJsonGet()">tJson</div>
	<div @click="tJson1Get()">tJson1</div>
	<div @click="tApiGet()">tApi</div>
	<div @click="tApi1Get()">tApi1</div>
	<div>{{tRes}}</div>
	<form>
		<fieldset>
			<legend>Personalia:</legend>
			<label for="nm">Name:</label> <input id="nm" name="nm" type="text">
			Email: <input type="text"><br>
			Date of birth: <input type="text">
		</fieldset>
	</form>
</template>

<script>
	import MixinForm from '../component/form/mixin-form.js'

	export default {
		mixins: [MixinForm],
		inject: ['provGlobal'],
		data() {
			return {
				tRes: {},
			}
		},
		methods: {
			show() {
				console.log(666.111, this.jsonDb)
			},
			tJsonGet() {
				this.$api('http://appdata.fu.asai.cc/data/app.json', {}, {method:'get'}).then(res => {
					this.tRes = res
					console.log(666.001, this.tRes)
				})
			},
			tJson1Get() {
				this.$api('http://appdata.fu.asai.cc/data/tools/co/study/g-naojing/co.json', {}, {method:'get'}).then(res => {
					this.tRes = res
					console.log(666.001, this.tRes)
				})},
			tApiGet() {
				this.$api('http://api.php.asai.cc/api/s.php', {}, {}).then(res => {
					this.tRes = res
					console.log(666.001, this.tRes)
				})},
			tApi1Get() {
				this.$api('http://api.php.asai.cc/api/t.php', {}, {}).then(res => {
					this.tRes = res
					console.log(666.001, this.tRes)
				})},
		}
	}
</script>

<style>
</style>
