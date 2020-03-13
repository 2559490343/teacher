<template>
  <div class="correctDetail">
    <el-page-header @back="goBack" content="作业提交详情"></el-page-header>
    <div class="content">
      <div class="base_info">
        <h1>作业信息</h1>
        <p>
          <span class="left">作业主题:</span>
          <span>{{submit_info.homeworkTitle}}</span>
        </p>
        <p>
          <span class="left">题目数量:</span>
          <span>{{rate_list.length}}题</span>
        </p>
        <p>
          <span class="left">提交数量:</span>
          <span>{{commits.length||0}}份</span>
        </p>
        <p>
          <span class="left">题目正确率:</span>
          <span>
            <el-button type="text" @click="dialogVisible = true">
              点击查看
              <i class="el-icon-arrow-right"></i>
            </el-button>
          </span>
        </p>
      </div>
      <div class="upload_list_info">
        <h1>提交列表</h1>

        <el-table border :data="commits" class="my_table" style="width: 100%">
          <el-table-column align="center" label="学号">
            <template slot-scope="scope">
              <span>{{scope.row.student.studentNum}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="姓名">
            <template slot-scope="scope">
              <span>{{scope.row.student.studentName}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="commitTime" label="提交时间"></el-table-column>
          <!-- <el-table-column align="center" prop="correct_counts" label="待批改"></el-table-column> -->
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-button
                type="text"
                @click="correctJob(scope.row.student.studentId,scope.row.student.studentName)"
              >批改</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <el-dialog title="题目正确率" :visible.sync="dialogVisible" @close="dialogVisible = false">
      <div class="rate">
        <el-table :data="rate_list" border stripe>
          <el-table-column align="center" type="index" label="序号"></el-table-column>
          <el-table-column align="center" prop="titleName" label="题目"></el-table-column>
          <el-table-column align="center" label="正确率">
            <template
              slot-scope="scope"
            >{{commits.length?(parseInt(scope.row.count?scope.row.count:0) / parseInt(commits.length))*100:0}}%</template>
          </el-table-column>
        </el-table>
      </div>
      <span slot="footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      rate_list: [],
      dialogVisible: false,
      submit_info: {}, //作业详情信息
      commits: [] //提交作业列表
    };
  },
  created() {
    this.getHomeWorkSubmitDetail();
    this.getHomeWorkDetail();
  },
  methods: {
    goBack() {
      this.$router.push({ name: "correct_list" });
    },
    correctJob(studentId, studentName) {
      this.$router.push({
        name: "correct_page",
        query: {
          homeworkId: this.$route.query.homeworkId,
          studentId: studentId,
          studentName: studentName
        }
      });
    },
    // 获取作业提交详情
    getHomeWorkSubmitDetail() {
      let obj = {
        homeworkId: this.$route.query.homeworkId
      };
      let str = JSON.stringify(obj);
      this.api.getHomeWorkSubmitDetail(str).then(res => {
        console.log(res);
        if (res.code !== 0) return;
        this.commits = res.data ? res.data.commits : [];
      });
    },
    // 获取作业信息
    getHomeWorkDetail() {
      let obj = {
        homeworkId: this.$route.query.homeworkId
      };
      let str = JSON.stringify(obj);
      this.api.getHomeWorkDetail(str).then(res => {
        console.log(res);
        if (res.code !== 0) return;
        this.submit_info = res.data || {};
        let list = res.data ? res.data.titleList : [];
        this.rate_list = list.length ? list : [];
      });
    }
  }
};
</script>
<style lang="scss">
.correctDetail {
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
          padding-left: 10px;
          span {
            font-size: 12px;
            color: #409eff;
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