<template>
	<h1>{{title}}</h1>
	<div class="btn">
		<button @click="downJson();">下载Json</button>
		<button @click="tJsonGet();">歇后语</button>
		<button @click="tJson1Get();">脑筋</button>
	</div>
	<div class="btn">
		<button @click="$setParams({ty:'list'});">获取数据</button>
		<button @click="$setParams({ty:'view',sn:'2'});">预览数据</button>
		<button @click="$setParams({ty:'form',sn:'2'});">编辑数据</button>
	</div>
	<div v-if="mGlobal.url.params.ty==='list'">
		<saPage></saPage>
		<dl v-for="item in arrData" :key="item[0]">
			<dt>{{item[1]}}</dt>
			<dd>{{item[2]}}</dd>
			<dd class="btn">
				<button @click="$setParams({ty:'view',sn:item[0]});">预览</button>
				<button @click="$setParams({ty:'form',sn:item[0]});">编辑</button>
			</dd>
		</dl>
	</div>

	<div v-if="mGlobal.url.params.ty==='view'">
		<dl>
			<dt>{{mView[1]}}</dt>
			<dd>{{mView[2]}}</dd>
			<button @click="$setParams({ty:'form',sn:mGlobal.url.params.sn});">编辑</button>
		</dl>
	</div>

	<div v-if="mGlobal.url.params.ty==='form'">
		<input v-model="mView[1]" />
		<input v-model="mView[2]" />
		<button @click="$setParams({ty:'view',sn:mGlobal.url.params.sn});">预览</button>
	</div>
</template>

<script>
	import mixinList from '../component/list/mixin-list.js'

	export default {
		mixins: [mixinList],
		data() {
			return {
				title: '测试',
				tRes: null
			}
		},
		computed: {
			lists() {
				if (this.tRes && this.tRes.ll) {
					return this.tRes.ll || {}
				}
				return {}
			},
			arrList() {
				return Object.values(this.lists)
			},
			arrData() {
				return this.$getList(this.arrList)
			},
		},
		created() {
			if (!this.tRes || !this.tRes.li) {
				this.tJson1Get();
			}
		},
		methods: {
			downJson() {
				this.mGlobal.index.mask = "数据加载中";
				const downloadTask = uni.downloadFile({
					url: 'http://appdata.fu.asai.cc/data/info/c-g-miyu/co.json', //仅为示例，并非真实的资源
					timeout: 60000000,
					success: (res) => {
						console.log(666.999, '下载成功', res);

						uni.request({
							url: res.tempFilePath,
							method: "GET",
							timeout: 600000000,
							success: (res) => {
								console.log(666.258, '成功', res);
							},
							fail: (err) => {
								reject(err);
							},
						});

						// uni.saveFile({
						// 	tempFilePath: res.tempFilePath,
						// 	success: function(res) {
						// 		console.log(666.222, '保存成功', res);
						// 	}
						// });

						// uni.saveFile({
						// 	tempFilePath: res.tempFilePath,
						// 	success: function(res) {
						// 		console.log(666.222, '保存成功', res);
						// 	}
						// });

						// uni.openDocument({
						// 	filePath: res.tempFilePath,
						// 	showMenu: true,
						// 	success: function(res) {
						// 		console.log(666.333, '打开文档成功', res);
						//  }
						// });

						// let reader = new FileReader(); // 创建读取文件对象
						// this.getImageBlob(res.tempFilePath, function(blob) {
						// 	reader.readAsDataURL(blob);
						// });
						// // reader.readAsDataURL(res.tempFilePath); // 设置读取的数据以及返回的数据类型为utf-8
						// reader.onload = (e)=> {
						// 	// let res = JSON.parse(e.target.result); // 返回的数据
						// 	console.log(666.5566, e, e.target.result, '返回结果') // { name: "小花" }
						// }

						// reader.addEventListener("loadend", function() { // 
						// 	let res = JSON.parse(reader.result); // 返回的数据
						// 	console.log(666.998877, res, '返回结果') // { name: "小花" }
						// });
					},
					complete: () => {
						this.mGlobal.index.mask = "";
					}
				});

				downloadTask.onProgressUpdate((res) => {
					this.mGlobal.index.progress =
						`${res.progress}% ${res.totalBytesWritten}/${res.totalBytesExpectedToWrite}`
					// console.log('下载进度' + res.progress);
					// console.log('已经下载的数据长度' + res.totalBytesWritten);
					// console.log('预期需要下载的数据总长度' + res.totalBytesExpectedToWrite);

					// 满足测试条件，取消下载任务。
					// if (res.progress >= 100) {
					// 	this.mGlobal.index.mask = "";
					// 	console.log(666.789, '下载完成',res)
					// 	// downloadTask.abort();
					// }
				});
			},
			getImageBlob(url, cb) {
				var xhr = new XMLHttpRequest();
				xhr.open("get", url, true);
				xhr.responseType = "text";
				xhr.onload = function(e) {
					console.log(666.987456, e)
					if (this.status == 200) {
						if (cb) cb(this.responseText);
					}
				};
				xhr.send();
			},
			tJsonGet() {
				this.$api('http://appdata.fu.asai.cc/data/info/c-g-xiehouyu/co.json', {}, {
					method: 'get'
				}).then(res => {
					this.tRes = res
					console.log(666.101, this.tRes)
				})
			},
			tJson1Get() {
				this.$api('http://appdata.fu.asai.cc/data/info/co.json', {}, {
					method: 'get'
				}).then(res => {
					this.tRes = res
					console.log(666.102, this.tRes)
				})
			},
		}
	}
</script>

<style scoped>
</style>
