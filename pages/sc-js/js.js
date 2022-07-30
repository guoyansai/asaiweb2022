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
	methods:{
		$api(vUrl, vParams, vConfig){
			return this.mClass.api.scApi(vUrl, vParams, vConfig)
		}
	}
}
