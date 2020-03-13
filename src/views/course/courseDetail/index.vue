<template>
  <div class="courseDetail">
    <el-page-header @back="goBack" content="课程详情"></el-page-header>
    <div class="content">
      <div class="base_info">
        <h1>基本信息</h1>
        <p>
          <span class="left">课程名:</span>
          <span>{{courseInfo.courseName}}</span>
        </p>
        <p>
          <span class="left">课程简介:</span>
          <span>{{courseInfo.courseIntro}}</span>
        </p>
        <p>
          <span class="left">课程详细介绍:</span>
          <span>{{courseInfo.courseDetail}}</span>
        </p>
        <p>
          <span class="left">选课人数:</span>
          <span>{{courseInfo.courseCount||0}}人</span>
        </p>
        <p>
          <span class="left">邀请码:</span>
          <span>{{courseInfo.courseCode||'-'}}</span>
        </p>
      </div>

      <div class="signin_list_info">
        <h1>选课学生列表</h1>

        <el-table border :data="courseInfo.list" class="my_table" style="width: 70%">
          <el-table-column align="center" type="index" label="序号"></el-table-column>
          <el-table-column align="center" prop="studentNum" label="学号"></el-table-column>
          <el-table-column align="center" prop="studentName" label="姓名"></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      courseInfo: {},
      student_list: [], //签到人员列表
      courseId: ""
    };
  },
  created() {
    this.courseId = this.$route.query.courseId;
    this.getCourseInfo();
  },
  methods: {
    goBack() {
      this.$router.push({ name: "courseList" });
    },
    getCourseInfo() {
      this.api.getCourseInfo(this.courseId).then(res => {
        console.log(res);
        if (res.code !== 0) return;
        this.courseInfo = res.data || {};
      });
    }
  }
};
</script>
<style lang="scss">
.courseDetail {
  .content {
    padding-top: 5px;
    h1 {
      font-size: 20px;
      font-weight: 600;
      line-height: 60px;
    }

    .base_info {
      border-bottom: 1px solid rgba(236, 240, 245, 1);
      padding-bottom: 20px;
      .left {
        color: #999;
      }
      span {
        font-size: 14px;
        text-align: left;
        margin-right: 5px;
        color: #333;
      }
      p {
        line-height: 34px;
      }
    }
  }
}
</style>