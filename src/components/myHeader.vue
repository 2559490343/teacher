<template>
  <div class="myHeader">
    <div class="left">
      <router-link to="/" class="link">
        <img src="@/assets/img/logo.jpg" alt />
      </router-link>
    </div>
    <div class="right">
      <div class="courseSelect">
        <label>
          当前课程：
          {{courseName?courseName:'待选择'}}
          <el-button type="primary" @click="showChangeCourse" style="margin-left:10px">切换</el-button>
        </label>
      </div>
      <div class="title">{{title}}</div>
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          {{teacherName}}老师，欢迎您
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="edit">修改信息</el-dropdown-item>
          <el-dropdown-item command="exit">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  name: "myHeader",
  data() {
    return {
      title: "",
      teacherName: "",
      courseList: [],
      termList: [],
      dialogVisible: false,
      termId: "",
      courseId: ""
    };
  },

  watch: {
    $route(to, from) {
      this.title = to.meta.title ? to.meta.title : "课堂辅助系统";
      console.log(to.meta.title);
    }
  },
  computed: {
    courseName() {
      return this.$store.state.courseName;
    }
  },
  created() {
    this.title = this.$route.meta.title
      ? this.$route.meta.title
      : "课堂辅助系统";
    this.teacherName = sessionStorage.getItem('teacherName')
  },
  methods: {
    showChangeCourse() {
      this.$store.dispatch("setChangeCourse", true);
    },
    handleCommand(command) {
      if (command === "exit") {
        this.$router.push({ name: "login" });
        sessionStorage.clear();
        // this.$store.dispatch("setLoginStatus", false); // 设置isRouterAlive为false
        location.reload(); // 为了重新实例化vue-router对象 避免bug
      }else if(command ==='edit'){
        this.$store.dispatch("setEditInfo", true);
      }
    }
  }
};
</script>

<style lang="scss">
.myHeader {
  padding: 0;
  /*box-shadow: 0 3px 3px rgba(0, 0, 0, 0.05);*/
  border-bottom: 2px solid #eaecef;
  height: 60px;
  width: 100%;
  display: flex;
  /*align-items: center;*/
  /*justify-content: space-between;*/
  box-sizing: border-box;
  .left {
    width: 180px;
    height: 100%;
    background: #333333;
    .link {
      display: flex;
      width: 100%;
      height: 100%;
      justify-content: center;
      align-items: center;
      img {
        width: 58px;
        height: 58px;
      }
    }
  }
  .right {
    display: flex;
    flex: 2;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    .courseSelect {
      // margin-left: 20px;
      font-size: 14px;
      color: #606266;
    }
    .title {
      font-size: 16px;
      color: #666666;
      // margin-left: 40px;
      // margin: 0 auto;
      margin-right: 180px;
    }

    .el-dropdown {
      // margin-right: 30px;
    }
    .el-dropdown-link {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 14px;
      color: #666666;
    }
    .el-dropdown-link img {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      margin-right: 10px;
    }
  }
}
</style>
