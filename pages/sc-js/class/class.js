import json from '../../sc-json/json.js'
import ClassApi from './class-api.js'

const api = new ClassApi(json.config.api)

export default {
	api
}
