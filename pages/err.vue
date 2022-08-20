<template>
  <indexHeader></indexHeader>
  <indexMenu></indexMenu>
  <page></page>
  <indexMask></indexMask>
  <indexToast></indexToast>
</template>

<script>
import indexHeader from "./sc-index/header/index.vue";
import indexMenu from "./sc-index/menu/index.vue";
import indexMask from "./sc-index/mask/index.vue";
import indexToast from "./sc-index/toast/index.vue";
import page from "./sc-page/index.vue";

export default {
  components: {
    indexHeader,
    indexMenu,
    indexMask,
    indexToast,
    page,
  },
};
</script>

<style scoped>
nav {
  border: 1px solid #d8d8d8;
  overflow: auto;
  white-space: nowrap;
}
</style>
