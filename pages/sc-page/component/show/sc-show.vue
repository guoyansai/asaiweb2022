<template>
	<div class="show" v-if="mGlobal.url.params.ty === 'show'&&mData.ty">
		<em v-for="item in showTypes" :key="item[0]" @click="mData.ty.ls=item[0]"
			:class="{cur:mData.ty.ls===item[0]}"> {{item[1]}} </em>
		<component :is="curShow"></component>
	</div>
</template>

<script>
	import mixinShow from "./mixin-show.js";

	export default {
		mixins: [mixinShow],
		computed: {
			curShow() {
				if (this.mData && this.mData.ty && this.mData.ty.ls) {
					return 'saShow' + this.mData.ty.ls
				} else {
					return 'saShowart'
				}
			},
			showTypes() {
				if (this.mDb && this.mDb.info && this.mDb.info.ty && this.mDb.info.ty.ls) {
					return Object.entries(this.mDb.info.ty.ls)
				} else {
					return []
				}
			},
		},
	};
</script>

<style scoped></style>
