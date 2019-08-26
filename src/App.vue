<template>
  <div id="app">
  <keep-alive>
    <router-view></router-view>
  </keep-alive>
  </div>
</template>

<script>
import ContentT from "./components/index";
import Info from "./components/info.vue";
export default {
  name: "app",
  components: {
    ContentT,
    Info
  }
};
</script>

<style lang="less">
@import "~vux/src/styles/reset.less";

body {
  background-color: #fbf9fe;
}
</style>
