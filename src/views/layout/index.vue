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
            <editPwd :show="editPwd"></editPwd>
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
import editPwd from "@/components/editPwd.vue";
export default {
  components: {
    Sidebar,
    myHeader,
    changeCourse,
    editInfo,
    editPwd
  },
  data() {
    return {
      menuList: this.$router.options.routes[0].children.filter(item=>{
        return !item.meta.hidden
      })
    };
  },
  computed: {
    changeCourse() {
      return this.$store.state.changeCourse;
    },
    editInfo() {
      return this.$store.state.editInfo;
    },
    editPwd() {
      return this.$store.state.editPwd;
    }
  },
  created() {
    console.log(this.$router.options);
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
