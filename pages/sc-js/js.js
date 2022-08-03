import jsons from '../sc-json/json.js'
import classFun from './class/class.js'
import mixin from './mixin/mixin.js'

export default {
	mixins: [mixin],
	data() {
		return {
			mJson: jsons,
			mClass: classFun,
		}
	},
	computed: {
		mMenu() {
			return this.mJson.config.menu
		},
		mMenuArr() {
			return Object.entries(this.mMenu)
		},
		mUrl() {
			return this.mJson.config.api.urls[this.mJson.config.api.type]
		}
	},
	methods: {
		$api(vUrl, vParams, vConfig) {
			return this.mClass.api.scApi(vUrl, vParams, vConfig)
		},
		$apiJson(vUrl) {
			return this.$api(vUrl, {}, {
				method: 'get'
			})
		},
		$infoUrl(menu) {
			return this.mUrl + this.mMenu[menu].data + '/co.json'
		}
	}
}
