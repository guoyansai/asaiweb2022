<template>
	<div class="list" v-if="mGlobal.url.params.ty !== 'show' && mGlobal.url.params.ty !== 'edit' && mData.ty">
		<em v-for="item in listTypes" :key="item[0]" @click="mData.ty.ll = item[0]" :class="{ cur: mData.ty.ll === item[0] }">{{ item[1] }}</em>
		<saSearch></saSearch>
		<component :is="curList"></component>
		<saPage></saPage>
	</div>
</template>

<script>
import mixinList from './mixin-list.js';

export default {
	mixins: [mixinList],
	computed: {
		curList() {
			if (this.mData && this.mData.ty && this.mData.ty.ll) {
				return 'saList' + this.mData.ty.ll;
			} else {
				return 'saListart';
			}
		},
		listTypes() {
			if (this.mDb && this.mDb.info && this.mDb.info.ty && this.mDb.info.ty.ll) {
				return Object.entries(this.mDb.info.ty.ll);
			} else {
				return [];
			}
		}
	}
};
</script>

<style scoped></style>
