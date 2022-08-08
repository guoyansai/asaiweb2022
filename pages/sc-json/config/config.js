import configApi from './configApi.json'
import configGlobal from './configGlobal.json'
import configMenu from './configMenu.json'

export default {
	api: {
		...configApi
	},
	global: {
		...configGlobal
	},
	menu: {
		...configMenu
	},
}
