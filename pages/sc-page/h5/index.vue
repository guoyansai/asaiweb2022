<template>
	<view class="s-area">
		<view class="s-index index-h5">
			<bar :item="topBar"></bar>
			<template v-if="h5app">
				<htmlvue v-if="h5app.startsWith('html')" :htmlsrc="h5app"></htmlvue>
				<component v-else :is="h5app"></component>
			</template>
			<template v-else>
				<web-view v-if="viewUr" :src="viewUr"></web-view>
				<show v-else-if="viewSn" gsn="h5" :gli="listSn" :gur="listUr" :psearch="listSearch" :gindex="indexCur"
					:glist="listCur">
				</show>
				<list v-else :ppage="listPage" :psearch="listSearch" :gindex="indexCur" :apiUrl="apiUrl"
					:glist="listCur"></list>
			</template>
		</view>
	</view>
</template>

<script>
	import mixinMain from '../../components/base/mixin-main.js';
	import mixinMainLoad from '../../components/base/mixin-main-load.js';
	import htmlvue from '../../components/app/html.vue';
	import gpintu from '../../components/app/g-pintu.vue';

	export default {
		mixins: [mixinMain, mixinMainLoad],
		components: {
			gpintu,
			htmlvue
		},
		data() {
			return {
				h5app: ''
			};
		},
		onLoad: function(e) {
			this.initH5(e, 'h5', 0);
		},
		methods: {
			initH5(e, sn, type = 0) {
				try {
					if (e.ur && e.ur.startsWith('h5.')) {
						this.h5app = e.ur.substr(3);
						this.setTopBar('index', {
							tt: 'H5合集',
							ur: '/pages/h5/index'
						});
						this.setTopBar('show', {
							tt: '展示',
							ur: ''
						});
					} else if (e.ur && (e.ur.indexOf('//') !== -1 || e.ur.startsWith('http'))) {
						this.viewSn = '';
						this.viewUr = e.ur;
						this.setTopBar('show', {
							tt: '网页',
							ur: ''
						});
					} else {
						this.listUr = e.ur;
						this.viewUr = '';
						// 获取index信息
						this.indexSn = sn;
						if (this.indexSn) {
							this.apiUrl = '/h5/li';
							this.$asaidata
								.get(this.apiUrl, type)
								.then((resIndex) => {
									this.indexCur = resIndex;
									this.setTopBar('index', {
										tt: this.indexCur.tt,
										ur: 'index'
									});
									this.saiInit(resIndex);
									this.saiPage(resIndex, e);
									this.saiSearch(resIndex, e);
								});
						}
					}
				} catch (err) {
					this.goTab();
				}

			},
		}
	};
</script>

<style scoped>
	.index-h5 {
		height: 100%;
		width: 100%;
	}
</style>
