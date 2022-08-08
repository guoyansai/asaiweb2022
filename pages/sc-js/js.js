import scJson from '../sc-json/json.js'
import classFun from './class/class.js'
import mixin from './mixin/mixin.js'

const api = new classFun.ClassApi(scJson.config.api)

export default {
	mixins: [mixin],
	data() {
		return {
			mJson: scJson,
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
			return this.mJson.config.api.url.keys[this.mJson.config.api.url.key]
		}
	},
	methods: {
		$api(vUrl, vParams, vConfig) {
			return api.scApi(vUrl, vParams, vConfig)
		},
		$apiJson(menu) {
			if (this.mMenu[menu].data) {
				return this.$api(this.mUrl + this.mMenu[menu].data + '/co.json', {}, {
					method: 'get'
				})
			} else {
				return Promise.resolve()
			}
		},
	}
}
