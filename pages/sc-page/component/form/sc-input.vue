<template>
	<div class="form-item" v-if="scitem">
		<label :for="scitem.nm">
			{{scitem.mt}}
		</label>
		<input :id="scitem.nm" :name="scitem.nm" :placeholder="scitem.mc" type="text" v-model="scitem.fv" />
	</div>
</template>

<script>
	export default {
		props: {
			scitem: {},
		},
	}
</script>

<style scoped>
</style>
