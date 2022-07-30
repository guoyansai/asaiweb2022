import dbMain from './dbMain.json'
import dbClass from './dbClass.json'

const dbInit = () => {
	let dbTmp = {}
	Object.keys(dbMain).forEach(el => {
		if (el !== 'system') {
			dbTmp[el] = {}
			Object.keys(dbMain[el]).forEach(elc => {
				const tmpStart = elc.substring(0, 2)
				// 将系统中dbMain以template为模板补齐
				dbTmp[el][elc] = {
					nm: elc,
					...dbMain.system.template[tmpStart],
					...dbMain[el][elc]
				}
				// 将class中的默认fc选项赋值到dbMain中
				const tmpClass = dbClass[dbMain[el][elc].fy]
				if (tmpClass) {
					dbTmp[el][elc].fs = tmpClass
				}
			})
		}
	})
	return dbTmp
}

export default {
	...dbInit()
};