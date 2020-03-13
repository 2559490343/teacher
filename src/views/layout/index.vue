<template>
  <div class="layout">
    <el-container>
      <!-- 顶部 -->
      <el-header>
        <myHeader></myHeader>
      </el-header>
      <el-container>
        <!-- 菜单 -->
        <el-aside>
          <sidebar :menu-list="menuList" />
        </el-aside>
        <!-- 右边内容 -->
        <el-main>
          <div class="body_content">
            <router-view></router-view>
            <changeCourse :show="changeCourse"></changeCourse>
            <editInfo :show="editInfo"></editInfo>
          </div>
        </el-main>
      </el-container>
    </el-container>

    <!--  返回顶部按钮   -->
    <el-backtop target=".el-main"></el-backtop>
  </div>
</template>

<script>
import Sidebar from "@/components/sidebar/Sidebar";
import myHeader from "@/components/myHeader.vue";
import changeCourse from "@/components/changeCourse.vue";
import editInfo from "@/components/editInfo.vue";
export default {
  components: {
    Sidebar,
    myHeader,
    changeCourse,
    editInfo
  },
  data() {
    return {
      menuList: this.$router.options.routes[0].children
    };
  },
  computed: {
    changeCourse() {
      return this.$store.state.changeCourse;
    },
    editInfo() {
      return this.$store.state.editInfo;
    }
  },
  created() {
    // console.log(this.menuList);
  }
};
</script>

<style lang="scss">
.layout {
  height: 100%;
  .el-container {
    height: 100%;
  }
  .el-header {
  }
  .el-aside {
    width: 180px !important;
    height: 100%;
    background-color: #e8eaec;
  }
  .el-main {
    padding: 20px;
    background: #f5f5f5;

    .body_content {
      border-radius: 6px;
      background-color: #fff;
      overflow: hidden;
      padding: 5px;
    }
  }
}
</style>
