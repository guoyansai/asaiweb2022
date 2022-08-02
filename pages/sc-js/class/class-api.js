export default class {
	constructor(jsonConf) {
		this.jsonConf = jsonConf;
		this.isUni = jsonConf.type === 'uni'
	}
	scApi(vUrl, vParams, vConfig) {
		const [url, params, config] = [this.scUrl(vUrl), this.scParams(vParams), this.scConfig(vConfig)]
		this.scLoadShow({
			title: "数据加载中",
		});
		console.log(666.9, url, params, config)
		return new Promise((resolve, reject) => {
			if (this.isUni) {
				this.uniApi(url, params, config).then(res => {
					this.scMsgShow('加载成功')
					console.log(res.data);
					resolve(res.data);
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
		return this.jsonConf.uni.url + vUrl
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
		duration = duration || 2000
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
	scStr(str) {
		return ((str + '').replace(/[^a-zA-Z0-9]/g, '') || '').substr(-20)
	}
	// uni-app封装
	uniApi(url, params, config) {
		return new Promise((resolve, reject) => {
			uni.request({
				url: url,
				data: params,
				method: config.method || 'POST', // 'GET'||'POST'
				header: config.header,
				timeout: config.timeout || this.jsonConf.timeout,
				success: (res) => {
					resolve(res);
				},
				fail: (err) => {
					reject(err)
				}
			});
		})
	}
	uniLoadShow(obj) {
		uni.showLoading(obj);
	}
	uniLoadClose() {
		uni.hideLoading();
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
