import scCo from "../../sc-json/co.json";

export default {
	data() {
		return {
			mParams: {
				...scCo.config.global.url.params
			},
			mCo: scCo,
			mRequest: {
				tasks: {
					cur: "",
					progress: {},
				},
				datas: {},
			},
		};
	},
	computed: {
		mDb() {
			return this.mCo.db;
		},
		mApi() {
			return this.mCo.config.api;
		},
		mGlobal() {
			return this.mCo.config.global;
		},
		mMenus() {
			return this.mCo.config.menu;
		},
		mMenu() {
			return this.mMenus[this.mGlobal.url.dir];
		},
		mMenuArr() {
			return Object.entries(this.mMenus);
		},
		mUrl() {
			return this.mCo.config.api.url.keys[this.mCo.config.api.url.key];
		},
		isUni() {
			return this.mApi.type === "uni";
		},
		mShow() {
			let tmpShows = {};
			const showArr = this.lists[this.mGlobal.url.params.sn] || [];
			Object.keys(this.mDb.info.md).forEach((el) => {
				tmpShows[el] = this.mgfVal(showArr, el);
			});
			return tmpShows;
		},

		mData: {
			get() {
				return this.mGlobal.data;
			},
			set(val) {
				this.mGlobal.data = val;
			}
		},
		mrTasks() {
			return this.mRequest.tasks;
		},
		mrDatas() {
			return this.mRequest.datas;
		},

		lists() {
			if (this.mData && this.mData.ll) {
				return this.mData.ll || {};
			}
			return {};
		},

		mgMds() {
			return (this.mData && this.mData.md) || {};
		},
		mgMdArr() {
			return Object.entries(this.mgMds);
		},
		mgLists() {
			if (this.mData && this.mData.ll) {
				return this.mData.ll || {};
			}
			return {};
		},
		mgListArr() {
			return this.$getList(Object.values(this.mgLists));
		},

		mHeader() {
			if (this.mData.hd) {
				return {
					...this.mGlobal.index.header,
					...this.mData.hd,
				};
			} else {
				return this.mGlobal.index.header;
			}
		},
	},
	methods: {
		mgfIndex(key) {
			return this.mgMdArr.findIndex((el) => el[0] === key);
		},
		mgfVal(item, key) {
			if (this.mgfIndex(key) > -1) {
				return item[this.mgfIndex(key)];
			}
			return "";
		},
	},
};
