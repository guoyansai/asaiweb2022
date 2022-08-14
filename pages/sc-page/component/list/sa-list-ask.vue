<template>
	<dl v-for="item in mgListArr" :key="item[0]" @click="showMo[item[0]]=!showMo[item[0]]">
		<dt><span @click="mgfGo(item)">{{ mgfValue(item, "co") }}</span></dt>
		<dd v-if="showMo[item[0]]">{{ mgfValue(item, "co") }}</dd>
	</dl>
</template>

<script>
	export default {
		data() {
			return {
				showMo: {},
			}
		}
	};
</script>

<style scoped></style>
