<template>
	<div id="page" v-if="params.pa">
		搜索类型:<input v-model="params.sl" @input="setUrl()">
		关键词:<input v-model="params.ss" @input="setUrl()">
		<span @click="toPage(1)" v-if="params.pg>3">首页</span>
		<span @click="toPage(params.pg-1)" v-if="params.pg>1">上一页</span>
		<span v-for="i in arrPage" :key="'page'+i" @click="toPage(i)" :class="{curPage:i===+params.pg}">
			{{i}}
		</span>
		<span @click="toPage(params.pg+1)" v-if="params.pg<params.pc">下一页</span>
		<span @click="toPage(params.pc)" v-if="params.pg<params.pc-2">尾页</span>
		第<input v-model="params.pg" @input="setUrl()">页，每页<input v-model="params.ps" @input="setUrl()">条
	</div>
</template>

<script>
	export default {
		inject: ["provGlobal"],
		computed: {
			params() {
				return this.provGlobal.params
			},
			pageStart() {
				return 0
			},
			arrPage() {
				if (this.params.pc < 7) {
					return [1, 2, 3, 4, 5, 6]
				} else if (this.params.pg < 4) {
					return [1, 2, 3, 4, 5]
				} else if (this.params.pg > this.params.pc - 3) {
					return [this.params.pc - 4, this.params.pc - 3, this.params.pc - 2, this.params.pc - 1, this.params.pc]
				} else {
					return [this.params.pg - 2, this.params.pg - 1, this.params.pg, this.params.pg + 1, this.params.pg + 2]
				}
			}
		},
		methods: {
			toPage(i) {
				Object.assign(this.provGlobal.params, {
					pg: i
				})
				this.setUrl()
			},
			setUrl() {
				console.log(666.999)
				this.$setUrl(this.provGlobal, this.provGlobal.menu, this.provGlobal.params)
			}
		}
	}
</script>

<style scoped>
	#page {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
	}

	#page span {
		border: 1px solid #d8d8d8;
		display: inline-block;
		padding: 3px 6px;
		margin: 3px 6px;
		cursor: pointer;
	}

	#page input {
		display: inline-block;
		width: 58px;
		text-align: center;
		border: 1px solid #d8d8d8;
	}

	.curPage {
		font-weight: bold;
		background-color: #f5f5f5;
	}
</style>
