<template>
  <nav>
    <div
      v-for="item in mMenuArr"
      :key="item[0]"
      @click="go(item)"
      :class="{ cur: mGlobal.url.dir === item[0] }"
    >
      {{ item[1].title }}
    </div>
  </nav>
</template>

<script>
export default {
  methods: {
    go(item) {
      console.log(666.888, item);
      const { dir, menu, params } = item[1].url;
      this.$setUrl(dir, menu, params);
    },
  },
};
</script>

<style scoped>
div {
  display: inline-block;
  background-color: #f5f5f5;
  padding: 6px 12px;
  cursor: pointer;
}

.cur {
  background-color: #d8d8d8;
}
</style>
