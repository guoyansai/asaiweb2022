export default class {
	constructor() {

	}
	paramsObj(obj) {
		let tmpStr = ''
		const arr = Object.entries(obj || {})
		arr.forEach(el => {
			if (el) {
				if (tmpStr) {
					tmpStr += '_'
				}
				tmpStr += el[0] + '-' + this.paramsCode(el[1], 0)
			}
		})
		return this.paramsSafe(tmpStr)
	}
	paramsUrl(str) {
		const tmpObj = {}
		const arr = this.paramsSafe(str).split('_')
		const len = arr.length
		if (len > 1) {
			for (let i = 0; i < len; i++) {
				const tmpArr = (arr[i] + '-').split("-")
				if (tmpArr[0]) {
					tmpObj[tmpArr[0]] = this.paramsCode(tmpArr[1], 1) || ''
				}
			}
		} else {
			tmpObj.id = this.paramsCode(str, 1)
		}
		return tmpObj
	}
	paramsCode(str, type) {
		let tmpStr = this.paramsSafe(str)
		if (tmpStr) {
			if (type === 1) {
				tmpStr = tmpStr.replaceAll('G%', '_')
				tmpStr = tmpStr.replaceAll('D%', '-')
			} else {
				tmpStr = tmpStr.replaceAll('_', 'G%')
				tmpStr = tmpStr.replaceAll('-', 'D%')
			}
		}
		return tmpStr
	}
	paramsSafe(str) {
		return str
	}
}
