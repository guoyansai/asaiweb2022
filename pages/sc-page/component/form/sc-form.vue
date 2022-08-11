<template>
	<div class="form" v-if="mGlobal.url.params.ty === 'form'">
		<li><label>标题：</label><input v-model="mView[1]" /></li>
		<li>
			<label>内容：</label><textarea class="textarea" v-model="mView[2]"></textarea>
		</li>
	</div>
</template>

<script>
	import mixinForm from "./mixin-form.js";

	export default {
		mixins: [mixinForm],
	};
</script>

<style scoped></style>
