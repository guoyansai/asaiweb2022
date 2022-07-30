import configApi from './configApi.json'
import configMenu from './configMenu.json'

export default {
	api: {
		...configApi
	},
	menu: configMenu.menus,
}
