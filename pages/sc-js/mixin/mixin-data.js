import scJson from "../../sc-json/json.js";

export default {
	data() {
		return {
			downTask: {
				cur: '',
				progress: {}
			},
			dataObj: {},
			mJson: scJson,
		};
	},
	computed: {
		mDb() {
			return this.mJson.db;
		},
		mApi() {
			return this.mJson.config.api;
		},
		mGlobal() {
			return this.mJson.config.global;
		},
		mMenus() {
			return this.mJson.config.menu;
		},
		mMenu() {
			return this.mMenus[this.mGlobal.url.dir];
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
		mData() {
			return this.mGlobal.dataModel;
		},
		mShow() {
			let tmpShows = {};
			const showArr = this.lists[this.mGlobal.url.params.sn] || [];
			Object.keys(this.mDb.info.md).forEach(el => {
				tmpShows[el] = this.mgfVal(showArr, el)
			});
			return tmpShows;
		},
		lists() {
			if (this.mGlobal.dataModel && this.mGlobal.dataModel.ll) {
				return this.mGlobal.dataModel.ll || {};
			}
			return {};
		},


		mgMds() {
			return (this.mGlobal.dataModel && this.mGlobal.dataModel.md) || {};
		},
		mgMdArr() {
			return Object.entries(this.mgMds);
		},
		mgLists() {
			if (this.mGlobal.dataModel && this.mGlobal.dataModel.ll) {
				return this.mGlobal.dataModel.ll || {};
			}
			return {};
		},
		mgListArr() {
			return this.$getList(Object.values(this.mgLists));
		},
	},
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
	},
};
