import mixinData from "./mixin-data.js";

export default {
	mixins: [mixinData],
	methods: {
		// $对外函数体--------
		$api(vUrl, vParams, vConfig) {
			return this.scApi(vUrl, vParams, vConfig);
		},
		$apiJson(vConfig) {
			const config = vConfig ? vConfig : {};
			this.mGlobal.url.dir = this.mGlobal.url.dir || 'info';
			this.$api(
				`${this.mUrl}
					/
					${this.mGlobal.url.dir}
					${this.mGlobal.url.menu ? "/" + this.mGlobal.url.menu : ""}
		  /co.json`, {}, {
					method: "get",
					...config,
				}
			).then((res) => {
				this.mData = res || {};
			}).finally(() => {
				this.mGlobal.index.mask = "";
			});
		},
		$getUrl() {
			const route = this.vueRoute();
			const dir = this.paramsCode(route.query.dir, 1);
			const menu = this.paramsCode(route.query.menu, 1);
			if (!this.checkSameStr(this.mGlobal.url.path, route.path)) {
				this.mGlobal.url.path = route.path;
				Object.assign(this.mGlobal.url.params, this.mParams, this.paramsUrl(route.query.params));
			} else {
				Object.assign(this.mGlobal.url.params, this.paramsUrl(route.query.params));
			}
			if (this.checkSameStr(this.mGlobal.url.menu, menu) || this.checkSameStr(this.mGlobal.url.dir, dir)) {
				this.mGlobal.url.menu = menu;
				this.mGlobal.url.dir = dir;
				this.$apiJson();
			}
			console.log(666.333, Object.keys(this.mData).length)
			if (Object.keys(this.mData).length < 1) {
				this.$apiJson();
			}
		},
		$setUrl(dir, menu, params) {
			const route = this.vueRoute();
			let canGo = false;
			if (!this.checkSameObj(this.mGlobal.url.params, params)) {
				if (!this.checkSameStr(this.mGlobal.url.path, route.path)) {
					this.mGlobal.url.path = route.path;
					Object.assign(this.mGlobal.url.params, this.mParams, params);
				} else {
					Object.assign(this.mGlobal.url.params, params);
				}
				canGo = true;
			}
			console.log(666.1001, dir, menu, params)
			if (!this.checkSameStr(this.mGlobal.url.menu, menu) || !this.checkSameStr(this.mGlobal.url.dir, dir)) {
				canGo = true;
				this.mGlobal.url.dir = dir;
				this.mGlobal.url.menu = menu;
				this.$apiJson();
			}
			if (Object.keys(this.mData).length < 1) {
				this.$apiJson();
			}
			if (canGo) {
				this.$router.push(
					route.path +
					'?dir=' +
					this.paramsCode(dir, 0) +
					"&menu=" +
					this.paramsCode(menu, 0) +
					"&params=" +
					this.paramsObj(this.mGlobal.url.params)
				)
			}
		},
		$setParams(params) {
			this.$setUrl(this.mGlobal.url.dir, this.mGlobal.url.menu, params);
		},
		$getList(lists) {
			this.mGlobal.url.params.pa = lists.length;
			let tmpLists = [];
			if (this.mGlobal.url.params.pa > 0) {
				this.initPage(this.mGlobal.url.params);
				const arrLen = lists[0].length;
				if (this.mGlobal.url.params.ss) {
					let tmpArr = [];
					if (this.mGlobal.url.params.sl > 0) {
						this.mGlobal.url.params.sl =
							this.mGlobal.url.params.sl < arrLen ?
							+this.mGlobal.url.params.sl :
							arrLen;
						tmpArr = lists.filter(
							(el) =>
							el[+this.mGlobal.url.params.sl - 1].search(
								this.mGlobal.url.params.ss
							) > -1
						);
					} else {
						tmpArr = lists.filter(
							(el) => (el + "").search(this.mGlobal.url.params.ss) > -1
						);
					}
					this.mGlobal.url.params.pa = tmpArr.length;
					this.initPage();
					tmpLists = tmpArr;
				} else {
					tmpLists = lists;
				}
				if (this.mGlobal.url.params.sp > 0) {
					this.mGlobal.url.params.sp =
						this.mGlobal.url.params.sp < arrLen ?
						+this.mGlobal.url.params.sp :
						arrLen;
					if (this.mGlobal.url.params.st) {
						tmpLists = tmpLists.sort((a, b) =>
							b[this.mGlobal.url.params.sp - 1].localeCompare(
								a[this.mGlobal.url.params.sp - 1]
							)
						);
					} else {
						tmpLists = tmpLists.sort((a, b) =>
							a[this.mGlobal.url.params.sp - 1].localeCompare(
								b[this.mGlobal.url.params.sp - 1]
							)
						);
					}
				}
				tmpLists = tmpLists.slice(
					(this.mGlobal.url.params.pg - 1) * this.mGlobal.url.params.ps,
					this.mGlobal.url.params.pg * this.mGlobal.url.params.ps
				);
			}
			return tmpLists;
		},
		vueRoute() {
			return this.$route;
		},
		uniRoute() {
			const routes = getCurrentPages();
			console.log(666.0000001, routes[routes.length - 1].$page)
			return routes[routes.length - 1].$page;
		},
		checkSameObj(p1, p2) {
			let tmp = true
			if (p1 && p2) {
				Object.entries(p2).forEach(el => {
					if (tmp && p1[el[0]] != el[1]) {
						tmp = false;
					}
				})
			}
			return tmp
		},
		checkSameStr(p1, p2) {
			let tmp = true
			if (p1 && p2) {
				return (p1 + '') === (p2 + '')
			}
			return tmp
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
					this.uniApi(url, params, config)
						.then((res) => {
							resolve(res);
						})
						.catch((err) => {
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
			if (res && res.ll) {
				Object.keys(res.ll).forEach((key) => {
					res.ll[key].unshift(key);
				});
			}
			return res;
		},
		scUrl(vUrl) {
			if (vUrl.startsWith("http")) {
				return vUrl;
			}
			return this.mApi.url.keys[this.mApi.url.key] + vUrl;
		},
		scUrlNew(url) {
			return url + `?${Date.now()}`;
		},
		scParams(vParams) {
			return vParams;
		},
		scConfig(vConfig) {
			// vConfig.header['Content-Type']='application/json'
			return vConfig;
		},
		scGetData(dataKey) {
			return this.mrDatas[dataKey] || null;
		},
		scSetData(dataKey, objRes) {
			this.mrDatas[dataKey] = objRes;
		},
		scToKey(str) {
			return this.mApi.datastart + this.scStr(str);
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
				let objRes = "";
				if (config.reload) {
					this.scSetData(dataKey, null);
					uni.removeStorage({
						key: dataKey,
					});
				} else {
					objRes = this.scGetData(dataKey);
				}
				if (objRes) {
					console.log(666.001, objRes);
					objRes.lv = 1;
					this.uniApiRequestVer(url, params, config, dataKey, objRes).then(
						res => {
							resolve(res)
						}).catch(err => {
						reject(err)
					})
				} else {
					uni.getStorage({
						key: dataKey,
						success: (resSto) => {
							objRes = this.scToObj(resSto);
							objRes = objRes.data;
							console.log(666.002, objRes);
							this.scSetData(dataKey, objRes);
							objRes.lv = 2;
							this.uniApiRequestVer(url, params, config, dataKey, objRes)
								.then(
									res => {
										resolve(res)
									}).catch(err => {
									reject(err)
								})
						},
						fail: (errSto) => {
							this.uniApiRequest(url, params, config, dataKey).then(res => {
								resolve(res)
							}).catch(err => {
								reject(err)
							})
						},
					});
				}
			});
		},
		uniApiRequestVer(url, params, config, dataKey, curRes) {
			return new Promise((resolve, reject) => {
				this.uniApiJsonVer(url, params, config).then(res => {
					if (res && res.ver && res.ver > curRes.ver) {
						this.uniApiRequest(url, params, config, dataKey).then(ress => {
							resolve(ress)
						}).catch(err => {
							reject(err)
						})
					} else {
						resolve(curRes)
					}
				}).catch(err => {
					reject(err)
				})
			});
		},
		uniApiRequest(url, params, config, dataKey) {
			return new Promise((resolve, reject) => {
				let objRes;
				this.mGlobal.index.mask = "正在从网络拉取数据...";
				this.uniLight(true);
				let uniRequest;
				if (this.mApi.typeUni) {
					uniRequest = this.uniApiJson(url, params, config);
				} else {
					uniRequest = this.uniDownJson(url, params, config);
				}
				uniRequest
					.then((res) => {
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
					})
					.catch((err) => {
						console.log(666.0012, err);
						reject(err);
					});
			});
		},
		uniApiJsonVer(url, params, config) {
			return new Promise((resolve, reject) => {
				if (this.mApi.typeFetch) {
					this.mGlobal.index.mask = "正在核验数据是否需要升级...";
					this.uniApiJson(url.slice(0, -7) + 'ver.json', params, config).then(res => {
						resolve(this.scRes(this.scToObj(res).data))
					}).catch((err) => {
						reject(err);
					})
				} else {
					resolve({
						ver: 0
					})
				}
			});
		},
		uniApiJson(url, params, config) {
			return new Promise((resolve, reject) => {
				uni.request({
					url: this.scUrlNew(url),
					data: params,
					method: config.method || "POST", // 'GET'||'POST'
					header: config.header,
					timeout: config.timeout || this.mApi.timeout,
					success: (res) => {
						resolve(res);
					},
					fail: (err) => {
						reject(err);
					},
				});
			});
		},
		uniDownJson(url, params, config) {
			return new Promise((resolve, reject) => {
				const dataKey = this.scToKey(url);
				if (
					this.mrTasks.cur &&
					this.mrTasks.cur !== dataKey &&
					this.mrTasks[this.mrTasks.cur]
				) {
					this.mrTasks[this.mrTasks.cur].abort();
				}
				this.mrTasks.cur = dataKey;
				this.mrTasks[dataKey] = uni.downloadFile({
					url: this.scUrlNew(url),
					data: params,
					method: "GET",
					header: config.header,
					timeout: config.timeout || this.mApi.timeout,
					success: (res) => {
						let rUrl = res.tempFilePath;
						let isApp = false;
						// #ifdef APP-PLUS
						isApp = true;
						plus.io.requestFileSystem(
							plus.io.PRIVATE_DOC,
							(fs) => {
								fs.root.getFile(
									rUrl, {
										create: false,
									},
									(fileEntry) => {
										fileEntry.file((file) => {
											const fileReader = new plus.io
												.FileReader();
											fileReader.readAsText(file,
												"utf-8");
											fileReader.onloadend = (e) => {
												const rVal = {
													data: JSON
														.parse(e
															.target
															.result
														),
												};
												resolve(rVal);
											};
										});
									}
								);
							},
							(err) => {
								reject(err);
							}
						);
						// #endif
						if (!isApp) {
							console.log(666.111222, rUrl);
							uni.request({
								url: rUrl,
								method: "GET",
								timeout: config.timeout || this.mApi.timeout,
								sslVerify: false,
								success: (res) => {
									if (res.statusCode === 200) {
										resolve(res);
									}
								},
								fail: (err) => {
									reject(err);
								},
								complete: () => {
									this.mGlobal.index.progress = "";
								},
							});
						}
					},
					fail: (err) => {
						reject(err);
					},
					complete: () => {
						this.mGlobal.index.progress = "";
					},
				});
				this.mrTasks[dataKey].onProgressUpdate((res) => {
					this.mGlobal.index.progress =
						`${res.progress}% ${res.totalBytesWritten}/${res.totalBytesExpectedToWrite}`;
					if (res.progress === 100) {
						this.mGlobal.index.mask = "正在处理数据";
						this.mGlobal.index.progress = "请稍等...";
					}
				});
			});
		},
		uniLight(val) {
			// #ifdef APP-PLUS
			uni.setKeepScreenOn({
				keepScreenOn: val,
			});
			// #endif
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
			const arr = (this.paramsSafe(str) || '').split("_");
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
			this.mGlobal.url.params.pg =
				this.mGlobal.url.params.pg > 1 ? +this.mGlobal.url.params.pg : 1;
			this.mGlobal.url.params.ps =
				this.mGlobal.url.params.ps > 1 ? +this.mGlobal.url.params.ps : 1;
			this.mGlobal.url.params.pc =
				Math.ceil(this.mGlobal.url.params.pa / this.mGlobal.url.params.ps) || 1;
			this.mGlobal.url.params.pg = Math.min(
				this.mGlobal.url.params.pg,
				this.mGlobal.url.params.pc
			);
		},
	},
};
