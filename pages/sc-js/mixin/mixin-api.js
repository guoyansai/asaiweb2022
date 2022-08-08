import mixinData from "./mixin-data.js";

export default {
	mixins: [mixinData],
	methods: {
		$api(vUrl, vParams, vConfig) {
			return this.scApi(vUrl, vParams, vConfig);
		},
		$apiJson(menu) {
			if (this.mMenu[menu].data) {
				return this.$api(
					this.mUrl + this.mMenu[menu].data + "/co.json", {}, {
						method: "get",
					}
				);
			} else {
				return Promise.resolve();
			}
		},
		scApi(vUrl, vParams, vConfig) {
			const [url, params, config] = [
				this.scUrl(vUrl),
				this.scParams(vParams),
				this.scConfig(vConfig),
			];
			return new Promise((resolve, reject) => {
				if (this.isUni) {
					this.mGlobal.index.mask = "数据加载中";
					this.uniApi(url, params, config)
						.then((res) => {
							this.mGlobal.index.toast = "加载成功";
							resolve(res);
						})
						.catch((err) => {
							this.mGlobal.index.toast = "失败了";
							reject(err);
						})
						.finally(() => {
							this.mGlobal.index.mask = "";
						});
				} else {
					// axois
				}
			});
		},
		scUrl(vUrl) {
			if (vUrl.startsWith("http")) {
				return vUrl;
			}
			return this.mApi.url.keys[this.mApi.url.key] + vUrl;
		},
		scParams(vParams) {
			return vParams;
		},
		scConfig(vConfig) {
			// vConfig.header['Content-Type']='application/json'
			return vConfig;
		},
		scGetData(dataKey) {
			return this.dataObj[dataKey] || null;
		},
		scSetData(dataKey, objRes) {
			this.dataObj[dataKey] = objRes;
		},
		scToKey(str) {
			return this.mApi.dataStart + this.scStr(str);
		},
		scToObj(val) {
			if (val && typeof val === "string") {
				return JSON.parse(val);
			}
			return val;
		},
		scStr(str) {
			return ((str + "").replace(/[^a-zA-Z0-9]/g, "") || "").substr(-20);
		},
		// uni-app封装
		uniApi(url, params, config) {
			return new Promise((resolve, reject) => {
				const dataKey = this.scToKey(url);
				let objRes = this.scGetData(dataKey);
				if (objRes) {
					console.log(666.001, objRes);
					objRes.lv = 1
					resolve(objRes);
				} else {
					uni.getStorage({
						key: dataKey,
						success: (resSto) => {
							objRes = this.scToObj(resSto);
							objRes = objRes.data;
							console.log(666.002, objRes);
							this.scGetData(dataKey, objRes);
							objRes.lv = 2
							resolve(objRes);
						},
						fail: (errSto) => {
							uni.request({
								url: url,
								data: params,
								method: config.method || "POST", // 'GET'||'POST'
								header: config.header,
								timeout: config.timeout || this.mApi.timeout,
								success: (res) => {
									objRes = this.scToObj(res);
									objRes = objRes.data;
									console.log(666.003, objRes);
									uni.setStorage({
										key: dataKey,
										data: objRes,
										success: () => {},
										complete: () => {
											this.scGetData(dataKey, objRes);
											objRes.lv = 3
											resolve(objRes);
										},
									});
								},
								fail: (err) => {
									reject(err);
								},
							});
						},
					});
				}
			});
		},
	},
};
