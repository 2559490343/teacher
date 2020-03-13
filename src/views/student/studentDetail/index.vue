<template>
  <div class="studentDetail">
    <el-page-header @back="goBack" content="学生详情信息"></el-page-header>
    <div class="content">
      <div class="base_info">
        <!-- <h1>基本信息</h1> -->
        <p>
          <span class="left">姓名:</span>
          <span>{{student_info.name}}</span>
        </p>
        <p>
          <span class="left">学号:</span>
          <span>{{studentNum}}</span>
        </p>
        <!-- <p>
          <span class="left">班级:</span>
          <span>{{student_info.class}}</span>
        </p>-->
        <p>
          <span class="left">平时成绩:</span>
          <span>{{student_info.normal_grade}}</span>
        </p>
        <p>
          <span class="left">考试成绩:</span>
          <span>{{student_info.exam_grade}}</span>
        </p>
        <p>
          <span class="left">最终成绩:</span>
          <span>{{student_info.final_grade}}</span>
        </p>
        <p>
          <span class="left">考勤状况:</span>
          <span>
            {{student_info.sign}}次未签到
            <!-- <el-button type="text" @click="dialogVisible1 = true">
              点击查看详情
              <i class="el-icon-arrow-right"></i>
            </el-button>-->
          </span>
        </p>
        <p>
          <span class="left">课堂测试完成情况:</span>
          <span>
            {{student_info.test||0}}次未完成
            <!-- <el-button type="text" @click="dialogVisible2 = true">
              点击查看详情
              <i class="el-icon-arrow-right"></i>
            </el-button>-->
          </span>
        </p>
        <p>
          <span class="left">课后作业完成情况:</span>
          <span>
            {{student_info.homeWork||0}}次未完成
            <!-- <el-button type="text" @click="dialogVisible2 = true">
              点击查看详情
              <i class="el-icon-arrow-right"></i>
            </el-button>-->
          </span>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      student_info: {
        name: "",
        number: null,
        exam_grade: null,
        normal_grade: null,
        final_grade: null,
        sign: null,
        homeWork: null,
        test: null
      },
      dialogVisible1: false,
      dialogVisible2: false,
      studentNum: ""
    };
  },
  computed: {
    courseId() {
      return this.$store.state.courseId;
    }
  },
  created() {
    this.studentNum = this.$route.query.id;
    this.student_info.name = this.$route.query.name;
    this.getSignInfo();
    this.getHomeWorkInfo("课堂测试");
    this.getHomeWorkInfo("课后作业");
  },
  methods: {
    goBack() {
      this.$router.push({ name: "student_list" });
    },
    // 获取学生签到情况信息
    getSignInfo() {
      let obj = {
        studentNum: this.studentNum
      };
      let str = JSON.stringify(obj);
      this.api.getSignInfo(str).then(res => {
        console.log(res);
        if (res.code !== 0) return;
        let list = res.data || [];
        list.forEach(item => {
          if (item.courseId == this.courseId) {
            this.student_info.sign = item.total - (item.summit || 0);
          }
        });
      });
    },
    // 获取学生作业情况
    getHomeWorkInfo(homeworkType) {
      let obj = {
        studentNum: this.studentNum,
        homeworkType
      };
      let str = JSON.stringify(obj);
      this.api.getHomeWorkInfo(str).then(res => {
        console.log(res);
        if (res.code !== 0) return;
        let list = res.data || [];
        list.forEach(item => {
          if (item.courseId == this.courseId) {
            let count = item.total - (item.summit || 0);
            if (homeworkType === "课堂测试") this.student_info.test = count;
            else this.student_info.homeWork = count;
          }
        });
      });
    }
  }
};
</script>
<style lang="scss">
.studentDetail {
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
        button {
          background: 0 0;
          padding-left: 10px;
          padding-right: 0;
          span {
            color: #409eff;
            font-size: 12px;
          }
        }
      }
      p {
        line-height: 34px;
      }
    }
  }
}
</style>