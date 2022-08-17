import mixinData from "./mixin-data.js";

export default {
	mixins: [mixinData],
	methods: {
		mgfGo(item) {
			const ur = this.mgfVal(item, "ur");
			if (ur && ur.indexOf('http') === -1) {
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
		mgfShow(key) {
			if (this.mShow[key]) {
				return `${this.mgMds[key]}:${this.mShow[key]}`;
			}
			return '';
		},
		mgfValue(item, key) {
			let tmpVal = this.mgfVal(item, key)
			if (tmpVal) {
				tmpVal = tmpVal.replace(/<[^>]*>/g, '')
				if (tmpVal && tmpVal.length > 200) {
					tmpVal = tmpVal.substr(0, 198) + '...'
				}
			}
			return tmpVal
		},
		mgfPic(item, key) {
			let tmpVal = this.mgfValue(item, key);
			tmpVal = tmpVal.replace(/[^\u4e00-\u9fa5]/g, '<Br>')
			tmpVal = tmpVal.replace(/(<Br>)+/g, '<Br>')
			return tmpVal;
		}
	}
}
