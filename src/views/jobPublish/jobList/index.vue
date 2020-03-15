<template>
  <div class="jobList">
    <div class="title">
      <label>
        类型：
        <el-select v-model="job_type" placeholder="请选择作业类型" @change="getHomeWorkList">
          <el-option label="课后作业" value="0"></el-option>
          <el-option label="课堂测试" value="1"></el-option>
        </el-select>
      </label>
      <el-button type="primary" @click="toAddJob">添加作业</el-button>
    </div>
    <div class="content">
      <el-table border :data="job_list" class="my_table" style="width: 100%">
        <el-table-column align="center" prop="homeworkTitle" label="主题"></el-table-column>
        <el-table-column align="center" prop="homeworkCount" label="题目数量"></el-table-column>
        <!-- <el-table-column align="center" prop="counts" label="选课人数"></el-table-column> -->
        <el-table-column align="center" label="上线状态">
          <template slot-scope="scope">{{scope.row.homeworkStatus=='发布'?'已发布':'未发布'}}</template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="toDetail(scope.row.homeworkId)">查看详情</el-button>
            <el-button
              type="text"
              v-if="scope.row.homeworkStatus!=='发布'"
              @click="changeStatus(scope.row.homeworkId,'发布')"
            >发布</el-button>
            <el-button type="text" v-else @click="changeStatus(scope.row.homeworkId,'下线')">下线</el-button>
            <el-button
              type="text"
              @click="deleteHomework(scope.row.homeworkId)"
              style="color:#f56c6c"
            >删除</el-button>
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
      job_list: []
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
    deleteHomework(homeworkId) {
      this.$confirm("确定要删除此作业吗？", "提示", {
        type: "warning"
      })
        .then(() => {
          let obj = { homeworkId };
          let str = JSON.stringify(obj);
          this.api.delHomework(str).then(res => {
            if (res.code !== 0) return;
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            this.getHomeWorkList();
          });
        })
        .catch(() => {
          return;
        });
    },
    toDetail(id) {
      this.$router.push({ name: "job_detail", query: { homeworkId: id } });
    },
    toAddJob() {
      this.$router.push({ name: "add_job", query: { type: this.job_type } });
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
        this.job_list = list ? list : [];
      });
    },
    // 修改作业发布状态
    changeStatus(homeworkId, flag) {
      let obj = {
        homeworkId,
        homeworkStatus: flag
      };
      let str = JSON.stringify(obj);
      this.api.changeHomeWorkStatus(str).then(res => {
        console.log(res);
        if (res.code !== 0) return;
        this.$message.success(`作业已${flag}`);
        this.getHomeWorkList();
      });
    }
  }
};
</script>
<style lang="scss">
.jobList {
  .title {
  }
}
</style>