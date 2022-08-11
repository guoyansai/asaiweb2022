import mixinData from "./mixin-data.js";

export default {
	mixins: [mixinData],
	methods: {
		// $对外函数体--------
		$api(vUrl, vParams, vConfig) {
			return this.scApi(vUrl, vParams, vConfig);
		},
		$apiJson(vConfig) {
			const config = vConfig ? vConfig : {}
			if (
				this.mMenus &&
				this.mMenus[this.mGlobal.url.dir] &&
				+this.mMenus[this.mGlobal.url.dir].type > 10
			) {
				this.$api(
					`${this.mUrl}/${this.mGlobal.url.dir}${this.mGlobal.url.menu?'/'+this.mGlobal.url.menu:''}/co.json`, {}, {
						method: "get",
						...config
					}
				).then((res) => {
					this.mGlobal.dataModel = res;
				});
			}
		},
		$getUrl() {
			const locations = (location.hash.substring(2) + "//").split("/");
			this.mGlobal.url.dir = this.paramsCode(locations[0], 1);
			this.mGlobal.url.menu = this.paramsCode(locations[1], 1);
			Object.assign(this.mGlobal.url.params, this.paramsUrl(locations[2]));
			if (this.mGlobal.url.dir) {
				this.$apiJson();
			}
		},
		$setUrl(dir, menu, params) {
			Object.assign(this.mGlobal.url.params, params);
			if (this.mGlobal.url.menu !== menu || this.mGlobal.url.dir !== dir) {
				this.mGlobal.url.dir = dir;
				this.mGlobal.url.menu = menu;
				this.$apiJson();
			}
			if (location) {
				location.href =
					"/#/" +
					this.paramsCode(dir, 0) +
					"/" +
					this.paramsCode(menu, 0) +
					"/" +
					this.paramsObj(this.mGlobal.url.params);
			}
		},
		$setParams(params) {
			this.$setUrl(this.mGlobal.url.dir, this.mGlobal.url.menu, params);
		},
		$getList(lists) {
			this.mGlobal.url.params.pa = lists.length
			let tmpLists = []
			if (this.mGlobal.url.params.pa > 0) {
				this.initPage(this.mGlobal.url.params)
				const arrLen = lists[0].length
				if (this.mGlobal.url.params.ss) {
					let tmpArr = []
					if (this.mGlobal.url.params.sl > 0) {
						this.mGlobal.url.params.sl = this.mGlobal.url.params.sl < arrLen ?
							+this.mGlobal.url.params.sl :
							arrLen
						tmpArr = lists.filter(el =>
							el[+this.mGlobal.url.params.sl - 1].search(this.mGlobal.url.params.ss) > -1)
					} else {
						tmpArr = lists.filter(el =>
							(el + '').search(this.mGlobal.url.params.ss) > -1)
					}
					this.mGlobal.url.params.pa = tmpArr.length
					this.initPage()
					tmpLists = tmpArr
				} else {
					tmpLists = lists
				}
				if (this.mGlobal.url.params.sp > 0) {
					this.mGlobal.url.params.sp = this.mGlobal.url.params.sp < arrLen ?
						+this.mGlobal.url.params.sp :
						arrLen
					if (this.mGlobal.url.params.st) {
						tmpLists = tmpLists.sort((a, b) =>
							b[this.mGlobal.url.params.sp - 1].localeCompare(a[this.mGlobal.url.params.sp - 1]))
					} else {
						tmpLists = tmpLists.sort((a, b) =>
							a[this.mGlobal.url.params.sp - 1].localeCompare(b[this.mGlobal.url.params.sp - 1]))
					}
				}
				tmpLists = tmpLists.slice((this.mGlobal.url.params.pg - 1) * this.mGlobal.url.params.ps,
					this.mGlobal.url.params.pg * this.mGlobal.url.params.ps)
			}
			return tmpLists
		},
		// 接口请求综合部分--------
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
		scRes(res) {
			Object.keys(res.ll).forEach(key => {
				res.ll[key].unshift(key)
			})
			return res
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
		// 接口请求uni-app封装--------
		uniApi(url, params, config) {
			return new Promise((resolve, reject) => {
				const dataKey = this.scToKey(url);
				let objRes = '';
				if (config.reload) {
					this.scSetData(dataKey, null);
					uni.removeStorage({
						key: dataKey,
					})
					console.log(666.0011, this.scGetData(dataKey));
				} else {
					objRes = this.scGetData(dataKey);
				}
				if (objRes) {
					console.log(666.001, objRes);
					objRes.lv = 1;
					resolve(objRes);
				} else {
					uni.getStorage({
						key: dataKey,
						success: (resSto) => {
							objRes = this.scToObj(resSto);
							objRes = objRes.data;
							console.log(666.002, objRes);
							this.scSetData(dataKey, objRes);
							objRes.lv = 2;
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
									objRes = this.scRes(objRes.data);
									console.log(666.003, objRes);
									uni.setStorage({
										key: dataKey,
										data: objRes,
										success: () => {},
										complete: () => {
											this.scSetData(dataKey, objRes);
											objRes.lv = 3;
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
		// 处理url及obj的参数--------
		paramsObj(obj) {
			let tmpStr = "";
			const arr = Object.entries(obj || {});
			arr.forEach((el) => {
				if (el) {
					const val = this.paramsCode(el[1], 0);
					if (val) {
						if (tmpStr) {
							tmpStr += "_";
						}
						tmpStr += el[0] + "=" + val;
					}
				}
			});
			return this.paramsSafe(tmpStr);
		},
		paramsUrl(str) {
			const tmpObj = {};
			const arr = this.paramsSafe(str).split("_");
			const len = arr.length;
			if (len > 1) {
				for (let i = 0; i < len; i++) {
					const tmpArr = (arr[i] + "=").split("=");
					if (tmpArr[0]) {
						tmpObj[tmpArr[0]] = this.paramsCode(tmpArr[1], 1) || "";
					}
				}
			} else {
				tmpObj.sn = this.paramsCode(str, 1);
			}
			return tmpObj || "";
		},
		paramsCode(str, type) {
			let tmpStr = this.paramsSafe(str);
			if (tmpStr) {
				if (type === 1) {
					tmpStr = decodeURI(tmpStr);
					tmpStr = tmpStr.replace(/HuA/g, "/");
					tmpStr = tmpStr.replace(/DiX/g, "_");
					tmpStr = tmpStr.replace(/YuD/g, "=");
				} else {
					tmpStr = encodeURI(tmpStr);
					tmpStr = tmpStr.replace(/\//g, "HuA");
					tmpStr = tmpStr.replace(/_/g, "DiX");
					tmpStr = tmpStr.replace(/\=/g, "YuD");
				}
			}
			return tmpStr;
		},
		paramsSafe(str) {
			return str;
		},
		// 初始化list页面--------
		initPage() {
			this.mGlobal.url.params.pg = this.mGlobal.url.params.pg > 1 ? +this.mGlobal.url.params.pg : 1
			this.mGlobal.url.params.ps = this.mGlobal.url.params.ps > 1 ? +this.mGlobal.url.params.ps : 1
			this.mGlobal.url.params.pc = Math.ceil(this.mGlobal.url.params.pa / this.mGlobal.url.params.ps) || 1
			this.mGlobal.url.params.pg = Math.min(this.mGlobal.url.params.pg, this.mGlobal.url.params.pc)
		}
	},
};
