<template>
  <div class="jobDetail">
    <el-page-header @back="goBack" content="作业详情"></el-page-header>
    <div class="content">
      <div class="base_info">
        <h1>基本信息</h1>
        <p>
          <span class="left">作业主题:</span>
          <span>{{job_info.homeworkTitle}}</span>
        </p>
        <p>
          <span class="left">题目数量:</span>
          <span>{{job_info.homeworkCount}}题</span>
        </p>
        <p>
          <span class="left">添加时间:</span>
          <span>{{job_info.homeworkTime}}</span>
        </p>
      </div>

      <div class="signin_list_info">
        <h1>题目列表</h1>

        <el-table border :data="question_list" class="my_table" style="width: 100%">
          <el-table-column align="center" prop="titleName" label="题目"></el-table-column>
          <el-table-column align="center" prop="titleA" label="选项A"></el-table-column>
          <el-table-column align="center" prop="titleB" label="选项B"></el-table-column>
          <el-table-column align="center" prop="titleC" label="选项C"></el-table-column>
          <el-table-column align="center" prop="titleD" label="选项D"></el-table-column>
          <el-table-column align="center" prop="titleAnswer" label="答案"></el-table-column>
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
      job_info: {},
      question_list: [],
      layerpageinfo: {
        pageSize: 5,
        pageNum: 1,
        total: 0
      },
      homeworkId: ""
    };
  },
  created() {
    this.homeworkId = this.$route.query.homeworkId;
    this.getHomeWorkDetail();
  },
  methods: {
    pageChange(val) {
      this.layerpageinfo.pageNum = val;
      this.getHomeWorkDetail();
    },
    goBack() {
      this.$router.push({ name: "job_list" });
    },
    getHomeWorkDetail() {
      let obj = { homeworkId: this.homeworkId };
      obj = Object.assign({}, obj, this.layerpageinfo);
      let str = JSON.stringify(obj);
      this.api.getHomeWorkDetail(str).then(res => {
        console.log(res);
        if (res.code !== 0) return;
        this.job_info = res.data ? res.data : {};
        this.layerpageinfo.total = res.data.homeworkCount;
        this.question_list = this.job_info.titleList;
      });
    }
  }
};
</script>
<style lang="scss">
.jobDetail {
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