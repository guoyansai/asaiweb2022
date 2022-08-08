<template>
  <div>{{ title }}</div>
  <saModel label="网址" v-model="mJson.config.api.url.key"></saModel>
  <button @click="showMask()">显示遮罩</button>
  <button @click="showToast()">显示提示信息</button>
</template>

<script>
import mixinForm from "../component/form/mixin-form.js";

export default {
  mixins: [mixinForm],
  data() {
    return {
      title: "设置",
    };
  },
  methods: {
    showMask() {
      this.mGlobal.index.mask = "我的好玩的东西";
    },
    showToast() {
      this.mGlobal.index.toast = "提示信息喜欢就来吧";
    },
  },
};
</script>

<style scoped></style>
