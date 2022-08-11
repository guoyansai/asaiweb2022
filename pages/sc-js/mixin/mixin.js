import mixinApi from "./mixin-api.js";
import mixinFun from "./mixin-fun.js";

export default {
	mixins: [mixinApi, mixinFun],
	methods: {
		$xiMenu(item) {
			const {
				dir,
				menu,
				params
			} = item.url;
			this.$setUrl(dir, menu, params);
		},
	}
};
