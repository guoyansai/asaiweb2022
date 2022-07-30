export default class {
	constructor(jsonConf) {
		this.jsonConf = jsonConf
	}
	scApi(vUrl, vParams, vConfig) {
		this.loadShow({
			title: "数据加载中",
		});
		const [url, params, config] = [this.scUrl(vUrl), this.scParams(vParams), this.scConfig(vConfig)]
		console.log(666.9, url, params, config)
		return new Promise((resolve, reject) => {
			if (this.jsonConf.type === 'uni') {
				uni.request({
					url: url,
					data: params,
					method: config.method || 'POST', // 'GET'||'POST'
					header: config.header,
					timeout: config.timeout || this.jsonConf.timeout,
					success: (res) => {
						this.msgShow('加载成功')
						console.log(res.data);
						resolve(res.data);
					},
					fail: (err) => {
						this.msgShow('失败了')
						reject(err)
					},
					complete: () => {
						this.loadClose()
					}
				});
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

	loadShow(obj) {
		uni.showLoading(obj);
	}
	loadClose() {
		uni.hideLoading();
	}
	msgShow(title, duration = 2000) {
		uni.showToast({
			title,
			duration,
		});
	}
	msgClose() {
		uni.hideToast();
	}
}
