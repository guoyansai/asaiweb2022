<template>
  <nav class="pos">
    <em @click="$xiMenu(mMenu)">信息</em> /
    <em @click="$setParams({ ty: 'list' })">列表</em> /
    <em @click="$setParams({ ty: 'show' })">预览</em> /
    <em @click="$setParams({ ty: 'form' })">编辑</em> /
    <em @click="$apiJson({reload:1})">刷新</em>
  </nav>
  <scForm></scForm>
  <scList></scList>
  <scShow></scShow>
</template>

<script>
import mixinComponent from "../component/mixin-component.js";

export default {
  mixins: [mixinComponent],
  data() {
    return {
      title: "sc-info",
    };
  },
};
</script>

<style scoped></style>
