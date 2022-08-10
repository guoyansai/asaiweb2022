import mixinData from "./mixin-data.js";

export default {
	mixins: [mixinData],
	methods: {
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
					tmpLists = tmpLists.sort((a, b) =>
						a[this.mGlobal.url.params.sp - 1].localeCompare(b[this.mGlobal.url.params.sp - 1])
					)
				}
				tmpLists = tmpLists.slice((this.mGlobal.url.params.pg - 1) * this.mGlobal.url.params.ps,
					this.mGlobal.url.params.pg * this.mGlobal.url.params.ps)
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
