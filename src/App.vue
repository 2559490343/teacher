<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import "./style/style.scss";
export default {
  name: "app",
  components: {},
  mounted() {
    // this.api.getNavList().then(res => {
    //   console.log(res);
    // });
  }
};
</script>

<style lang="scss">
</style>
