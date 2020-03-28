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
          <span>{{commitCount||0}}份</span>
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
        <myPage :layerpageinfo="layerpageinfo" @pageChange="pageChange"></myPage>
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
          <el-table-column align="center" label="题目分析">
            <template slot-scope="scope">
              <el-button type="text" @click="showAnalysis(scope.row.titleId)">分析</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-dialog width="40%" title="单题分析" :visible.sync="innerVisible" append-to-body>
        <analysisTitle :titleInfo="titleInfo"></analysisTitle>
      </el-dialog>
      <span slot="footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import myPage from "@/components/myPage.vue";
import analysisTitle from "@/components/analysisTitle.vue";
export default {
  components: {
    myPage,
    analysisTitle
  },
  data() {
    return {
      rate_list: [],
      dialogVisible: false,
      innerVisible: false,
      titleId: null,
      homeworkId: this.$route.query.homeworkId,
      submit_info: {}, //作业详情信息
      layerpageinfo: {
        pageSize: 5,
        pageNum: 1,
        total: 0
      },
      commits: [], //提交作业列表
      commitCount: 0,
      titleInfo: {}
    };
  },
  created() {
    this.getHomeWorkSubmitDetail();
    this.getHomeWorkDetail();
  },
  methods: {
    // 单题分析
    showAnalysis(titleId) {
      this.titleId = titleId;
      let obj = {
        homeworkId: this.homeworkId,
        titleId
      };
      let str = JSON.stringify(obj);
      this.api.analysisTitle(str).then(res => {
        if (res.code !== 0) return;
        let list = res.data || [];
        let len = list.length;
        let titleInfo = {};
        let title = list[0].title;
        titleInfo.title = title.titleName;
        titleInfo.type = title.titleType;
        if (titleInfo.type == "选择题") {
          let arr = [];
          let objA = {
            option: "A、" + title.titleA,
            count: 0,
            rate: "0%"
          };
          let objB = {
            option: "B、" + title.titleB,
            count: 0,
            rate: "0%"
          };
          let objC = {
            option: "C、" + title.titleC,
            count: 0,
            rate: "0%"
          };
          let objD = {
            option: "D、" + title.titleD,
            count: 0,
            rate: "0%"
          };

          list.forEach(item => {
            switch (item.titleAnswer) {
              case "A":
                objA.count++;
                objA.rate = (objA.count / len).toFixed(3) * 100 + "%";
                break;
              case "B":
                objB.count++;
                objB.rate = (objB.count / len).toFixed(3) * 100 + "%";
                break;
              case "C":
                objC.count++;
                objC.rate = (objC.count / len).toFixed(3) * 100 + "%";
                break;
              case "D":
                objD.count++;
                objD.rate = (objD.count / len).toFixed(3) * 100 + "%";
                break;
              default:
                break;
            }
          });
          arr.push(objA, objB, objC);
          if (title.titleD) arr.push(objD);
          titleInfo.answer_list = arr;
        } else if (titleInfo.type == "判断题") {
          let right = {
            option: "对",
            count: 0,
            rate: "0%"
          };
          let error = {
            option: "错",
            count: 0,
            rate: "0%"
          };
          list.forEach(item => {
            switch (item.titleAnswer) {
              case "1":
                right.count++;
                right.rate = ((right.count / len).toFixed(3) * 100) + "%";
                break;
              case "0":
                error.count++;
                error.rate = ((error.count / len).toFixed(3) * 100) + "%";
                break;
              default:
                break;
            }
          });
          titleInfo.answer_list = [right, error];
        } else {
          let arr = [];
          list.forEach(item => {
            let obj = {};
            obj.studentName = item.studentName;
            obj.studentNum = item.studentId;
            obj.titleAnswer = item.titleAnswer;
            arr.push(obj);
          });
          titleInfo.answer_list = arr;
        }
        this.titleInfo = titleInfo;
        this.innerVisible = true;
      });
    },
    pageChange(val) {
      this.layerpageinfo.pageNum = val;
      this.getHomeWorkSubmitDetail();
    },
    goBack() {
      this.$router.push({ name: "correct_list" });
    },
    correctJob(studentId, studentName) {
      this.$router.push({
        name: "correct_page",
        query: {
          homeworkId: this.homeworkId,
          studentId: studentId,
          studentName: studentName
        }
      });
    },
    // 获取作业提交详情
    getHomeWorkSubmitDetail() {
      let obj = {
        homeworkId: this.homeworkId
      };
      obj = Object.assign({}, obj, this.layerpageinfo);
      let str = JSON.stringify(obj);
      this.api.getHomeWorkSubmitDetail(str).then(res => {
        console.log(res);
        if (res.code !== 0) return;
        this.commits = res.data ? res.data.commits : [];
        this.layerpageinfo.total = res.data.commitCount;
        this.commitCount = res.data.commitCount;
      });
    },
    // 获取作业信息
    getHomeWorkDetail() {
      let obj = {
        homeworkId: this.homeworkId
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