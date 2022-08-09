<template>
  <div class="form" v-if="mGlobal.url.params.ty === 'form'">
    <li><label>标题：</label><input v-model="curView[1]" /></li>
    <li>
      <label>内容：</label
      ><textarea class="textarea" v-model="curView[2]"></textarea>
    </li>
  </div>
</template>

<script>
import mixinForm from "./mixin-form.js";

export default {
  mixins: [mixinForm],
  computed: {
    lists() {
      if (this.mGlobal.dataModel && this.mGlobal.dataModel.ll) {
        return this.mGlobal.dataModel.ll || {};
      }
      return {};
    },
    curView() {
      return [
        this.mGlobal.url.params.sn,
        ...(this.lists[this.mGlobal.url.params.sn] || []),
      ];
    },
  },
};
</script>

<style scoped></style>
