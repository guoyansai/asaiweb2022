import mixinData from "./mixin-data.js";

export default {
	mixins: [mixinData],
	methods: {
		$getList(lists) {
			this.mGlobal.url.params.pa = lists.length
			let tmpLists = []
			if (this.mGlobal.url.params.pa > 0) {
				this.initPage(this.mGlobal.url.params)
				const arrLen = lists[0][1].length + 1
				if (this.mGlobal.url.params.ss) {
					let tmpArr = []
					if (this.mGlobal.url.params.sl == 0) {
						tmpArr = lists.filter(el => el[0].includes(this.mGlobal.url.params.ss))
					} else if (this.mGlobal.url.params.sl) {
						this.mGlobal.url.params.sl = this.mGlobal.url.params.sl < arrLen ? +this.mGlobal.url.params.sl : arrLen - 1
						tmpArr = lists.filter(el => el[1][this.mGlobal.url.params.sl - 1].includes(this.mGlobal.url.params.ss))
					} else {
						tmpArr = lists.filter(el => (el + '').includes(this.mGlobal.url.params.ss))
					}
					this.mGlobal.url.params.pa = tmpArr.length
					this.initPage()
					tmpLists = tmpArr
				} else {
					tmpLists = lists
				}
				if (this.mGlobal.url.params.sp === 0) {
					tmpLists = tmpLists.sort((a, b) => a[0] - b[0])
				} else if (this.mGlobal.url.params.sp) {
					this.mGlobal.url.params.sp = this.mGlobal.url.params.sp < arrLen ? +this.mGlobal.url.params.sp : arrLen - 1

					tmpLists = tmpLists.sort((a, b) => a[1][this.mGlobal.url.params.sp] - b[1][this.mGlobal.url.params.sp])
				}
				tmpLists = tmpLists.slice((this.mGlobal.url.params.pg - 1) * this.mGlobal.url.params.ps, this.mGlobal.url.params
					.pg * this.mGlobal.url.params.ps)
			}
			return tmpLists
		},
		initPage() {
			this.mGlobal.url.params.pg = this.mGlobal.url.params.pg > 1 ? +this.mGlobal.url.params.pg : 1
			this.mGlobal.url.params.ps = this.mGlobal.url.params.ps > 1 ? +this.mGlobal.url.params.ps : 1
			this.mGlobal.url.params.pc = Math.ceil(this.mGlobal.url.params.pa / this.mGlobal.url.params.ps) || 1
			this.mGlobal.url.params.pg = Math.min(this.mGlobal.url.params.pg, this.mGlobal.url.params.pc)
		}
	}
}
