export default {
	methods: {
		$getUrl(provGlobal) {
			const locations = (window.location.hash.substring(2) + '/').split('/')
			provGlobal.menu = locations[0]
			Object.assign(provGlobal.params, this.paramsUrl(locations[1]))
		},
		$setUrl(provGlobal, menu, params) {
			provGlobal.menu = menu;
			Object.assign(provGlobal.params, params)
			if (location) {
				location.href = '/#/' + menu + '/' + this.paramsObj(provGlobal.params);
			}
		},
		paramsObj(obj) {
			let tmpStr = ''
			const arr = Object.entries(obj || {})
			arr.forEach(el => {
				if (el) {
					const val = this.paramsCode(el[1], 0)
					if (val) {
						if (tmpStr) {
							tmpStr += '_'
						}
						tmpStr += el[0] + '=' + val
					}
				}
			})
			return this.paramsSafe(tmpStr)
		},
		paramsUrl(str) {
			const tmpObj = {}
			const arr = this.paramsSafe(str).split('_')
			const len = arr.length
			if (len > 1) {
				for (let i = 0; i < len; i++) {
					const tmpArr = (arr[i] + '=').split("=")
					if (tmpArr[0]) {
						tmpObj[tmpArr[0]] = this.paramsCode(tmpArr[1], 1) || ''
					}
				}
			} else {
				tmpObj.sn = this.paramsCode(str, 1)
			}
			return tmpObj || ''
		},
		paramsCode(str, type) {
			let tmpStr = this.paramsSafe(str)
			if (tmpStr) {
				if (type === 1) {
					tmpStr = decodeURI(tmpStr)
					tmpStr = tmpStr.replace(/G\%/g, '_')
					tmpStr = tmpStr.replace(/D\%/g, '=')
				} else {
					tmpStr = encodeURI(tmpStr)
					tmpStr = tmpStr.replace(/_/g, 'G%')
					tmpStr = tmpStr.replace(/\=/g, 'D%')
				}
			}
			return tmpStr
		},
		paramsSafe(str) {
			return str
		}
	}
}
