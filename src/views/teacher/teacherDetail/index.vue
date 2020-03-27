<template>
  <div class="teacherDetail">
    <el-page-header @back="goBack" content="教师详情"></el-page-header>
    <div class="content">
      <div class="base_info">
        <h1>基本信息</h1>
        <p>
          <span class="left">姓名:</span>
          <span>{{teacher_info.teacherName}}</span>
        </p>
        <p>
          <span class="left">注册时间:</span>
          <span>{{teacher_info.createTime||'-'}}</span>
        </p>
        <p>
          <span class="left">拥有课程数量:</span>
          <span>{{teacher_info.list?teacher_info.list.length:0}}门</span>
        </p>
      </div>

      <div class="signin_list_info">
        <div class="table_header">
          <h1>拥有课程列表</h1>
        </div>

        <el-table border :data="teacher_info.list" class="my_table" style="width: 100%">
          <el-table-column align="center" prop="courseName" label="课程名"></el-table-column>
          <el-table-column align="center" prop="courseIntro" label="课程简介"></el-table-column>
          <el-table-column align="center" prop="courseDetail" label="课程详情"></el-table-column>
        </el-table>
        <myPage :layerpageinfo="layerpageinfo" @pageChange="pageChange"></myPage>
      </div>
    </div>
  </div>
</template>
<script>
import myPage from "@/components/myPage.vue";

export default {
  components: {
    myPage
  },
  data() {
    return {
      teacher_info: {},
      course_list: [], //签到人员列表
      teacherId: "",
      layerpageinfo: {
        pageSize: 5,
        pageNum: 1,
        total: 0
      }
    };
  },
  created() {
    this.teacherId = this.$route.query.id;
    this.getTeacherDetail();
  },
  methods: {
    pageChange(val) {
      this.layerpageinfo.pageNum = val;
      this.getSignDetail();
    },
    goBack() {
      this.$router.push({ name: "teacher_list" });
    },
    // 获取老师详情
    getTeacherDetail() {
      let obj = {
        teacherId: this.teacherId,
        ...this.layerpageinfo
      };
      let str = JSON.stringify(obj);
      this.api.showTeacherDetail(str).then(res => {
        console.log(res);
        if (res.code !== 0) return;
        this.teacher_info = res.data || {};
        this.layerpageinfo.total = this.teacher_info.totalSize;
      });
    }
  }
};
</script>
<style lang="scss">
.teacherDetail {
  .content {
    padding-top: 5px;
    h1 {
      font-size: 20px;
      font-weight: 600;
      line-height: 60px;
    }
    .table_header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      button {
        height: 32px;
      }
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