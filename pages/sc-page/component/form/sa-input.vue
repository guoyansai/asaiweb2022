<template>
	<label>{{label}}</label>
	<input type="text" v-model="customText" />
</template>

<script>
	export default {
		props: {
			label: '',
			modelValue: '',
		},
		emits: ['update:modelValue'],
		computed: {
			customText: {
				get() {
					return this.modelValue
				},
				set(value) {
					this.$emit('update:modelValue', value)
				}
			}
		}
	}
</script>

<style scoped>
</style>
