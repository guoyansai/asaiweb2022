<template>
  <dl class="page" v-if="params.pa">
    <span @click="toPage(1)" v-if="params.pg > 3">首页</span>
    <span @click="toPage(params.pg - 1)" v-if="params.pg > 1">上一页</span>
    <span
      v-for="i in arrPage"
      :key="'page' + i"
      @click="toPage(i)"
      :class="{ curPage: i === +params.pg }"
    >
      {{ i }}
    </span>
    <span @click="toPage(params.pg + 1)" v-if="params.pg < params.pc"
      >下一页</span
    >
    <span @click="toPage(params.pc)" v-if="params.pg < params.pc - 2"
      >尾页</span
    >
    第<input v-model="params.pg" @input="setUrl()" />页，每页<input
      v-model="params.ps"
      @input="setUrl()"
    />条
  </dl>
</template>

<script>
export default {
  computed: {
    params() {
      return this.mGlobal.url.params;
    },
    pageStart() {
      return 0;
    },
    arrPage() {
      if (this.params.pc < 7) {
        return [1, 2, 3, 4, 5, 6];
      } else if (this.params.pg < 4) {
        return [1, 2, 3, 4, 5];
      } else if (this.params.pg > this.params.pc - 3) {
        return [
          this.params.pc - 4,
          this.params.pc - 3,
          this.params.pc - 2,
          this.params.pc - 1,
          this.params.pc,
        ];
      } else {
        return [
          this.params.pg - 2,
          this.params.pg - 1,
          this.params.pg,
          this.params.pg + 1,
          this.params.pg + 2,
        ];
      }
    },
  },
  methods: {
    toPage(i) {
      this.$setParams({ pg: i });
    },
  },
};
</script>

<style scoped></style>
