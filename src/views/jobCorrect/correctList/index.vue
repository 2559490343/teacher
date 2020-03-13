<template>
  <div class="correctList">
    <div class="title">
      <label>
        类型：
        <el-select v-model="job_type" placeholder="请选择作业类型" @change="getHomeWorkList">
          <el-option label="课后作业" value="0"></el-option>
          <el-option label="课堂测试" value="1"></el-option>
        </el-select>
      </label>
    </div>
    <div class="content">
      <el-table border :data="correct_list" class="my_table" style="width: 100%">
        <el-table-column align="center" prop="homeworkTitle" label="主题"></el-table-column>
        <el-table-column align="center" prop="homeworkCount" label="题目数量"></el-table-column>
        <el-table-column align="center" prop="commitCount" label="提交数量">
          <template slot-scope="scope">
            <span>{{scope.row.commitCount||0}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="toDetail(scope.row.homeworkId)">查看作业</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      job_type: "0",
      correct_list: [
        // {
        //   title: "周三上午第一节课课后作业",
        //   question_counts: "10题",
        //   upload_counts: "3份",
        //   id: 1
        // }
      ]
    };
  },
  computed: {
    courseId() {
      return this.$store.state.courseId;
    }
  },
  created() {
    this.getHomeWorkList();
  },
  methods: {
    toDetail(id) {
      this.$router.push({ name: "correct_detail", query: { homeworkId: id } });
    },
    // 获取作业列表
    getHomeWorkList() {
      let obj = {
        courseId: this.courseId,
        homeworkType: this.job_type == "0" ? "课后作业" : "课堂测试"
      };
      let str = JSON.stringify(obj);
      this.api.getHomeWorkList(str).then(res => {
        console.log(res);
        if (res.code !== 0) return;
        let list = res.data;
        this.correct_list = list ? list : [];
      });
    }
  }
};
</script>
<style lang="scss">
.correctList {
  .title {
  }
}
</style>