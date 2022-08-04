import mixinForm from './form/mixin-form.js'
import mixinList from './list/mixin-list.js'
import mixinShow from './show/mixin-show.js'
import scForm from './form/sc-form.vue'
import scList from './list/sc-list.vue'
import scShow from './show/sc-show.vue'

export default {
	mixins: [mixinForm, mixinList, mixinShow],
	components: {
		scForm,
		scList,
		scShow
	}
}
