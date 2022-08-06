export default class {
	constructor(jsonConf) {
		this.jsonConf = jsonConf;
		this.isUni = jsonConf.type === 'uni';
		this.dataObj = {};
		this.loadDom = null
	}
	scApi(vUrl, vParams, vConfig) {
		const [url, params, config] = [this.scUrl(vUrl), this.scParams(vParams), this.scConfig(vConfig)]
		return new Promise((resolve, reject) => {
			if (this.isUni) {
				this.scLoadShow({
					title: "数据加载中",
				});
				this.uniApi(url, params, config).then(res => {
					this.scMsgShow('加载成功')
					resolve(res);
				}).catch(err => {
					this.scMsgShow('失败了')
					reject(err)
				}).finally(() => {
					this.scLoadClose()
				})
			} else {
				// axois
			}
		})
	}
	scUrl(vUrl) {
		if (vUrl.startsWith('http')) {
			return vUrl
		}
		return this.jsonConf.url.keys[this.jsonConf.url.key] + vUrl
	}
	scParams(vParams) {
		return vParams
	}
	scConfig(vConfig) {
		// vConfig.header['Content-Type']='application/json'
		return vConfig
	}
	scLoadShow(obj) {
		if (this.isUni) {
			this.uniLoadShow(obj);
		} else {

		}
	}
	scLoadClose() {
		if (this.isUni) {
			this.uniLoadClose();
		} else {

		}
	}
	scMsgShow(title, duration) {
		duration = duration || 200
		if (this.isUni) {
			this.uniMsgShow(title, duration)
		} else {

		}
	}
	scMsgClose() {
		if (this.isUni) {
			this.uniMsgClose()
		} else {

		}
	}
	scGetData(dataKey) {
		return this.dataObj[dataKey] || null
	}
	scSetData(dataKey, objRes) {
		this.dataObj[dataKey] = objRes
	}
	scToKey(str) {
		return this.jsonConf.dataStart + this.scStr(str)
	}
	scToObj(val) {
		if (val && typeof val === 'string') {
			return JSON.parse(val)
		}
		return val
	}
	scStr(str) {
		return ((str + '').replace(/[^a-zA-Z0-9]/g, '') || '').substr(-20)
	}
	// uni-app封装
	uniApi(url, params, config) {
		return new Promise((resolve, reject) => {
			const dataKey = this.scToKey(url)
			let objRes = this.scGetData(dataKey)
			if (objRes) {
				console.log(666.001, objRes);
				resolve(objRes)
			} else {
				uni.getStorage({
					key: dataKey,
					success: (resSto) => {
						objRes = this.scToObj(resSto)
						objRes = objRes.data
						console.log(666.002, objRes);
						this.scGetData(dataKey, objRes)
						resolve(objRes)
					},
					fail: (errSto) => {
						uni.request({
							url: url,
							data: params,
							method: config.method || 'POST', // 'GET'||'POST'
							header: config.header,
							timeout: config.timeout || this.jsonConf.timeout,
							success: (res) => {
								objRes = this.scToObj(res)
								objRes = objRes.data
								console.log(666.003, objRes);
								uni.setStorage({
									key: dataKey,
									data: objRes,
									success: () => {},
									complete: () => {
										this.scGetData(dataKey, objRes)
										resolve(objRes);
									}
								});
							},
							fail: (err) => {
								reject(err)
							}
						});
					}
				});


			}
		})
	}
	uniLoadShow(obj) {
		this.loadDom = uni.showLoading({
			mask: true,
			...obj
		});
	}
	uniLoadClose() {
		if (this.loadDom) {
			uni.hideLoading();
			this.loadDom = null
		}
	}
	uniMsgShow(title, duration) {
		uni.showToast({
			title,
			duration,
		});
	}
	uniMsgClose() {
		uni.hideToast();
	}
}
