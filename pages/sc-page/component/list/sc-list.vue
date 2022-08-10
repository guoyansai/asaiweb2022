<template>
	<div class="list" v-if="mGlobal.url.params.ty === 'list'">
		<saSearch></saSearch>
		<dl v-for="item in arrLists" :key="item[0]" @click="goTo(item)">
			<dt>{{ getDt(item) }}</dt>
			<dd>{{ getDd(item) }}</dd>
		</dl>
		<saPage></saPage>
	</div>
</template>

<script>
	import mixinList from "./mixin-list.js";

	export default {
		mixins: [mixinList],
		computed: {
			objMd() {
				return (this.mGlobal.dataModel && this.mGlobal.dataModel.md) || {};
			},
			arrMd() {
				return Object.entries(this.objMd);
			},
			objLists() {
				if (this.mGlobal.dataModel && this.mGlobal.dataModel.ll) {
					return this.mGlobal.dataModel.ll || {};
				}
				return {};
			},
			arrLists() {
				return this.$getList(Object.values(this.objLists));
			},
		},
		methods: {
			getDt(item) {
				return this.getUr(item, "tt") || this.getUr(item, "mo");
			},
			getDd(item) {
				return this.getUr(item, "co");
			},
			getUr(item, key) {
				if (this.getIndex(key) > -1) {
					return item[this.getIndex(key)];
				}
				return "";
			},
			getIndex(str) {
				return this.arrMd.findIndex((el) => el[0] === str)
			},
			goTo(item) {
				const ur = this.getUr(item, "ur");
				if (ur) {
					this.$setUrl(
						this.mGlobal.url.dir,
						ur.replace(`/${this.mGlobal.url.dir}/`, "") + item[0], {
							ty: "list",
						}
					);
				} else {
					this.$setParams({
						ty: "show",
						sn: item[0],
					});
				}
			},
		},
	};
</script>

<style scoped></style>
