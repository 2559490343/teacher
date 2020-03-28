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
      <myPage :layerpageinfo="layerpageinfo" @pageChange="pageChange"></myPage>
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
      job_type: "0",
      layerpageinfo: {
        pageSize: 6,
        pageNum: 1,
        total: 0
      },
      correct_list: []
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
    pageChange(val) {
      this.layerpageinfo.pageNum = val;
      this.getHomeWorkList();
    },
    toDetail(id) {
      this.$router.push({ name: "correct_detail", query: { homeworkId: id } });
    },
    // 获取作业列表
    getHomeWorkList() {
      let obj = {
        courseId: this.courseId,
        homeworkType: this.job_type == "0" ? "课后作业" : "课堂测试"
      };
      obj = Object.assign({}, obj, this.layerpageinfo);
      let str = JSON.stringify(obj);
      this.api.getHomeWorkList(str).then(res => {
        console.log(res);
        if (res.code !== 0) return;
        let list = res.data;
        this.correct_list = list ? list : [];
        this.layerpageinfo.total = res.totalSize;
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