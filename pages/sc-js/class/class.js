import json from '../../sc-json/json.js'
import ClassParams from './class-params.js'
import ClassApi from './class-api.js'

const params = new ClassParams()
const api = new ClassApi(json.config.api)

export default {
	params,
	api
}
