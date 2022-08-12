import scJson from "../../sc-json/json.js";

export default {
	data() {
		return {
			downTask:{cur:''},
			dataObj: {},
			mJson: scJson,
		};
	},
	computed: {
		mApi() {
			return this.mJson.config.api;
		},
		mGlobal() {
			return this.mJson.config.global;
		},
		mMenu() {
			return this.mMenus[this.mGlobal.url.dir];
		},
		mMenus() {
			return this.mJson.config.menu;
		},
		mMenuArr() {
			return Object.entries(this.mMenus);
		},
		mUrl() {
			return this.mJson.config.api.url.keys[this.mJson.config.api.url.key];
		},
		isUni() {
			return this.mApi.type === "uni";
		},
		mView() {
			return this.lists[this.mGlobal.url.params.sn] || [];
		},
		lists() {
			if (this.mGlobal.dataModel && this.mGlobal.dataModel.ll) {
				return this.mGlobal.dataModel.ll || {};
			}
			return {};
		},
	},
};
