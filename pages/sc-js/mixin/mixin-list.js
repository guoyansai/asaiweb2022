export default {
	methods: {
		$getList(lists, params) {
			params.pa = lists.length
			let tmpLists = []
			if (params.pa > 0) {
				this.initPage(params)
				if (params.ss) {
					let tmpArr = []
					if (params.sl || params.sl == 0) {
						const tmpLen = lists[0].length
						params.sl = params.sl < tmpLen ? +params.sl : tmpLen - 1
						tmpArr = lists.filter(el => el[params.sl].includes(params.ss))
					} else {
						tmpArr = lists.filter(el => (el + '').includes(params.ss))
					}
					params.pa = tmpArr.length
					this.initPage(params)
					tmpLists = tmpArr
				} else {
					tmpLists = lists
				}
				if (params.sp) {
					tmpLists = tmpLists.sort((a, b) => a[params.sp] - b[params.sp])
				}
				tmpLists = tmpLists.slice((params.pg - 1) * params.ps, params.pg * params.ps)
			}
			return tmpLists
		},
		initPage(params) {
			params.pg = params.pg > 1 ? +params.pg : 1
			params.ps = params.ps > 1 ? +params.ps : 1
			params.pc = Math.ceil(params.pa / params.ps) || 1
			params.pg = Math.min(params.pg, params.pc)
		}
	}
}
