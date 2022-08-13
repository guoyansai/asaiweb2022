import mixinData from "./mixin-data.js";

export default {
	mixins: [mixinData],
	methods: {
		mgfIndex(key) {
			return this.mgMdArr.findIndex((el) => el[0] === key)
		},
		mgfVal(item, key) {
			if (this.mgfIndex(key) > -1) {
				return item[this.mgfIndex(key)];
			}
			return "";
		},
		mgfGo(item) {
			const ur = this.mgfVal(item, "ur");
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
	}
}
