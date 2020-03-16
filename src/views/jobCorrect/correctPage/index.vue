<template>
  <div class="correctPage">
    <el-page-header @back="goBack" content="批改作业"></el-page-header>
    <div class="content">
      <div class="base_info">
        <h1>成绩单</h1>
        <p>
          <span class="left">答题人:</span>
          <span>{{$route.query.studentName}}</span>
        </p>
        <p>
          <span class="left">答对题数:</span>
          <span>{{right_counts}}题</span>
        </p>
      </div>
      <div class="upload_list_info">
        <h1>答题解析</h1>

        <el-table border :data="upload_list" class="my_table" style="width: 100%">
          <el-table-column align="center" type="index" label="序号"></el-table-column>
          <el-table-column align="center" prop="titleName" label="题目"></el-table-column>
          <el-table-column align="center" prop="titleType" label="题目类型"></el-table-column>
          <el-table-column align="center" prop="titleAnswer" label="正确答案">
            <template
              slot-scope="scope"
            >{{scope.row.titleType=='判断题'?scope.row.titleAnswer=='1'?'对':'错' :scope.row.titleAnswer}}</template>
          </el-table-column>
          <el-table-column align="center" prop="submitAnswer" label="提交答案">
            <template
              slot-scope="scope"
            >{{scope.row.titleType=='判断题'?scope.row.submitAnswer=='1'?'对':'错' :scope.row.submitAnswer}}</template>
          </el-table-column>
          <el-table-column align="center" prop="titleTrue" label="是否正确">
            <template slot-scope="scope">{{scope.row.titleTrue=='true'?'正确':'错误'}}</template>
          </el-table-column>
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-button type="text" @click="correctJob(scope.row.titleId)">批改</el-button>
            </template>
          </el-table-column>
        </el-table>
        <myPage :layerpageinfo="layerpageinfo" @pageChange="pageChange"></myPage>
      </div>
      <div class="btns">
        <!-- <el-button type="primary" @click="submitCorrect">提交批改</el-button> -->
      </div>
    </div>
    <el-dialog
      title="批改"
      :close-on-click-modal="false"
      :visible.sync="dialogVisible"
      width="30%"
      @close="dialogVisible = false"
    >
      <div class="correct">
        <el-form ref="form" label-width="100px">
          <el-form-item label="本题是否正确">
            <el-radio-group v-model="titleTrue">
              <el-radio label="正确"></el-radio>
              <el-radio label="错误"></el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="correctHomeWork">确 定</el-button>
      </span>
    </el-dialog>
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
      upload_list: [],
      titleTrue: "",
      titleId: "",
      dialogVisible: false,
      qusetion_list: [],
      answer_list: [],
      right_counts: 0,
      studentId: "",
      studentName: "",
      layerpageinfo: {
        pageSize: 5,
        pageNum: 1,
        total: 0
      },
      homeworkId: ""
    };
  },
  created() {
    this.studentId = this.$route.query.studentId;
    this.studentName = this.$route.query.studentName;
    this.homeworkId = this.$route.query.homeworkId;
    this.getHomeWorkDetail();
    // this.getStudentSubmitDetail();
  },
  methods: {
    pageChange(val) {
      this.layerpageinfo.pageNum = val;
      this.getHomeWorkDetail();
    },
    correctJob(id) {
      this.titleId = id;
      this.dialogVisible = true;
    },
    submitCorrect() {},
    goBack() {
      // this.$router.push({ name: "correct_detail" });
      this.$router.go(-1);
    },
    // 获取作业的题目列表
    getHomeWorkDetail() {
      let obj = {
        homeworkId: this.$route.query.homeworkId
      };
      obj = Object.assign({}, obj, this.layerpageinfo);
      let str = JSON.stringify(obj);
      this.api.getHomeWorkDetail(str).then(res => {
        console.log(res);
        if (res.code !== 0) return;
        let list = res.data.titleList || [];
        this.getStudentSubmitDetail(list);
      });
    },
    // 获取学生提交的作业信息
    getStudentSubmitDetail(arr) {
      let list = arr;
      let obj = {
        studentId: this.studentId,
        homeworkId: this.homeworkId
      };
      obj = Object.assign({}, obj, this.layerpageinfo);
      let str = JSON.stringify(obj);
      this.api.getStudentSubmitDetail(str).then(res => {
        console.log(res);

        if (res.code !== 0) return;
        let answer_list = res.data || [];
        this.layerpageinfo.total = res.totalSize;
        if (answer_list.length) {
          this.right_counts = 0;
          for (let i = 0; i < answer_list.length; i++) {
            list[i].titleTrue = answer_list[i].titleTrue;
            list[i].submitAnswer = answer_list[i].titleAnswer;
            // list[i].titleAnswer = list[i].titleAnswer.toUpperCase();
            if (answer_list[i].titleTrue == "true") this.right_counts++;
          }
        }
        this.upload_list = list;
      });
    },
    // 修改某一题的正确与否
    correctHomeWork() {
      let obj = {
        studentId: this.studentId,
        homeworkId: this.homeworkId,
        titleId: this.titleId,
        titleTrue: this.titleTrue == "正确" ? "true" : "false"
      };
      let str = JSON.stringify(obj);
      this.api.correctHomeWork(str).then(res => {
        console.log(res);
        if (res.code !== 0) return;
        this.dialogVisible = false;
        this.titleTrue = "";
        this.$message.success("批改成功！");
        this.getHomeWorkDetail();
      });
    }
  }
};
</script>
<style lang="scss">
.correctPage {
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
    .btns {
      line-height: 60px;
      text-align: center;
    }
  }
}
</style>