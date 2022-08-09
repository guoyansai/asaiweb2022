<template>
  <div class="show" v-if="mGlobal.url.params.ty === 'show'">
    <h1>{{ curView[1] }}</h1>
    <article>{{ curView[2] }}</article>
  </div>
</template>

<script>
import mixinShow from "./mixin-show.js";

export default {
  mixins: [mixinShow],
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
