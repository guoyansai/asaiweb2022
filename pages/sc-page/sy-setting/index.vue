<template>
	<h1>{{ title }}</h1>
	<div class="form">
		<li>
			<label>数据源：</label>
			<picker @change="setUrl" :value="urlIndex" :range="urlVals">
				<view class="uni-input">{{urlVals[urlIndex]||urlVals[0]}}</view>
			</picker>
		</li>
		<li>
			<label>数据源：</label>
			<radio value="0" :checked="mApi.typeUni===0" @click="mApi.typeUni=0" />下载模式 　
			<radio value="1" :checked="mApi.typeUni===1" @click="mApi.typeUni=1" />接口请求
		</li>
		<li>
			<label>自动更新：</label>
			<radio value="0" :checked="mApi.typeFetch===0" @click="mApi.typeFetch=0" />关闭更新 　
			<radio value="1" :checked="mApi.typeFetch===1" @click="mApi.typeFetch=1" />打开更新
		</li>
		<li>
			<saInput label="超时" v-model="mApi.timeout"></saInput>
		</li>
		<li>
			<saInput label="缓存前缀" v-model="mApi.dataStart"></saInput>
		</li>
		<li>
			<saInput label="项目类型" v-model="mApi.type"></saInput>
		</li>
		<li>
			<saInput label="导航高度" v-model="mGlobal.index.header.height"></saInput>
		</li>
		<li>
			<saInput label="背景图片" v-model="mGlobal.index.header.backgroundImage"></saInput>
		</li>
	</div>
	<div class="btn">
		<button @click="showMask()">显示遮罩</button>
		<button @click="showToast()">显示提示信息</button>
	</div>
</template>

<script>
	import mixinForm from "../component/form/mixin-form.js";

	export default {
		mixins: [mixinForm],
		data() {
			return {
				title: "设置",
				urlIndex: 0,
			};
		},
		computed: {
			urlVals() {
				return ['请选择数据源'].concat(Object.values(this.mApi.url.keys))
			},
			urlKeys() {
				return [''].concat(Object.keys(this.mApi.url.keys))
			},
		},
		created() {
			this.urlIndex = this.urlKeys.findIndex(el => el === this.mApi.url.key) || 0
		},
		methods: {
			showMask() {
				this.mGlobal.index.mask = "我的好玩的东西";
			},
			showToast() {
				this.mGlobal.index.toast = "提示信息喜欢就来吧";
			},
			setUrl(e) {
				this.urlIndex = e.detail.value
				this.mApi.url.key = this.urlKeys[this.urlIndex]
			}
		},
	};
</script>

<style scoped></style>
