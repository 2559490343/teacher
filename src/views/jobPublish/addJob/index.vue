<template>
  <div class="addJob">
    <!-- <div class="title"></div> -->
    <el-page-header @back="goBack" :content="content"></el-page-header>
    <div class="content">
      <el-form :model="form" ref="form" :rules="rules" label-width="100px">
        <el-form-item label="标题:" prop="homeworkTitle">
          <el-input class="input_width" v-model="form.homeworkTitle"></el-input>
        </el-form-item>
        <el-form-item label="添加题目:">
          <el-button type="text" @click="dialogVisible = true">
            点击选择题目
            <i class="el-icon-arrow-right"></i>
          </el-button>
        </el-form-item>
      </el-form>

      <el-table
        border
        :data="question_list.slice((layerpageinfo.pageNum-1)*layerpageinfo.pageSize,layerpageinfo.pageNum*layerpageinfo.pageSize)"
        class="my_table"
        style="width: 100%"
      >
        <el-table-column align="center" prop="titleName" label="题目"></el-table-column>
        <el-table-column align="center" prop="titleA" label="选项A"></el-table-column>
        <el-table-column align="center" prop="titleB" label="选项B"></el-table-column>
        <el-table-column align="center" prop="titleC" label="选项C"></el-table-column>
        <el-table-column align="center" prop="titleD" label="选项D"></el-table-column>
        <el-table-column align="center" prop="titleAnswer" label="答案"></el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="deleteTitle(scope.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <myPage :layerpageinfo="layerpageinfo" @pageChange="pageChange"></myPage>
      <div class="form_btn">
        <el-button type="primary" @click="submitJob('form')">添加作业</el-button>
      </div>
    </div>
    <el-dialog
      title="选择题目"
      :visible.sync="dialogVisible"
      width="30%"
      :close-on-click-modal="false"
      @close="dialogVisible = false"
    >
      <div class="chose_question">
        <div class="title">
          <label>
            题型：
            <el-select v-model="question_type" placeholder="请选择题目类型">
              <el-option label="选择题" value="0"></el-option>
              <el-option label="填空题" value="1"></el-option>
              <el-option label="判断题" value="2"></el-option>
              <el-option label="简答题" value="3"></el-option>
            </el-select>
          </label>
          <span>当前已选{{select_list.length?select_list.length:0}}道题</span>
        </div>
        <el-table
          border
          :data="question_bank[0]"
          class="my_table"
          v-show="question_type=='0'"
          style="width: 100%"
          @selection-change="handleSelectionChange1"
          :row-key="getRowKey1"
          ref="multipleTable1"
        >
          <el-table-column align="center" type="selection" :reserve-selection="true" width="55"></el-table-column>
          <el-table-column align="center" prop="titleName" label="题目"></el-table-column>
          <el-table-column align="center" prop="titleA" label="选项A"></el-table-column>
          <el-table-column align="center" prop="titleB" label="选项B"></el-table-column>
          <el-table-column align="center" prop="titleC" label="选项C"></el-table-column>
          <el-table-column align="center" prop="titleD" label="选项D"></el-table-column>
          <el-table-column align="center" prop="titleAnswer" label="答案"></el-table-column>
        </el-table>
        <myPage
          :layerpageinfo="layerpageinfo1"
          @pageChange="pageChange1"
          v-show="question_type=='0'"
        ></myPage>
        <el-table
          border
          :data="question_bank[1]"
          class="my_table"
          v-show="question_type=='1'"
          style="width: 100%"
          @selection-change="handleSelectionChange2"
          :row-key="getRowKey2"
          ref="multipleTable2"
        >
          <el-table-column align="center" type="selection" :reserve-selection="true" width="55"></el-table-column>
          <el-table-column align="center" prop="titleName" label="题目"></el-table-column>
          <el-table-column align="center" prop="titleAnswer" label="答案"></el-table-column>
        </el-table>
        <myPage
          :layerpageinfo="layerpageinfo2"
          @pageChange="pageChange2"
          v-show="question_type=='1'"
        ></myPage>
        <el-table
          border
          :data="question_bank[2]"
          class="my_table"
          v-show="question_type=='2'"
          style="width: 100%"
          @selection-change="handleSelectionChange3"
          :row-key="getRowKey3"
          ref="multipleTable3"
        >
          <el-table-column align="center" type="selection" reserve-selection width="55"></el-table-column>
          <el-table-column align="center" prop="titleName" label="题目"></el-table-column>
          <el-table-column align="center" prop="titleAnswer" label="答案">
            <template slot-scope="scope">{{scope.row.titleAnswer=='1'?'对':'错'}}</template>
          </el-table-column>
        </el-table>
        <myPage
          :layerpageinfo="layerpageinfo3"
          @pageChange="pageChange3"
          v-show="question_type=='2'"
        ></myPage>
        <el-table
          border
          :data="question_bank[3]"
          class="my_table"
          v-show="question_type=='3'"
          style="width: 100%"
          @selection-change="handleSelectionChange4"
          :row-key="getRowKey4"
          ref="multipleTable4"
        >
          <el-table-column align="center" type="selection" reserve-selection width="55"></el-table-column>
          <el-table-column align="center" prop="titleName" label="题目"></el-table-column>
          <el-table-column align="center" prop="titleAnswer" label="答案"></el-table-column>
        </el-table>
        <myPage
          :layerpageinfo="layerpageinfo4"
          @pageChange="pageChange4"
          v-show="question_type=='3'"
        ></myPage>
      </div>
      <span slot="footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="selectQuestion">确 定</el-button>
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
      form: {
        homeworkTitle: ""
      },
      rules: {
        homeworkTitle: [
          { required: true, message: "请填写作业标题", trigger: "blur" }
        ]
      },
      question_list: [],
      dialogVisible: false,
      question_bank: [[], [], [], []],
      question_type: "0",
      select_list: [],
      select_list1: [],
      select_list2: [],
      select_list3: [],
      select_list4: [],
      homeworkType: "",
      layerpageinfo: {
        pageSize: 5,
        pageNum: 1,
        total: 0
      },
      layerpageinfo1: {
        pageSize: 5,
        pageNum: 1,
        total: 0
      },
      layerpageinfo2: {
        pageSize: 5,
        pageNum: 1,
        total: 0
      },
      layerpageinfo3: {
        pageSize: 5,
        pageNum: 1,
        total: 0
      },
      layerpageinfo4: {
        pageSize: 5,
        pageNum: 1,
        total: 0
      },
      content: ""
    };
  },
  computed: {
    courseId() {
      return this.$store.state.courseId;
    }
  },
  created() {
    this.getAllQuestion();
    this.homeworkType = this.$route.query.type == "0" ? "课后作业" : "课堂测试";
    this.content = this.$route.query.type == "0" ? "添加作业" : "添加测试";
  },
  methods: {
    // 删除已选择的题目
    deleteTitle(index) {
      this.$confirm("要移除这道题吗？", "提示", { type: "warning" })
        .then(() => {
          let i =
            index +
            (this.layerpageinfo.pageNum - 1) * this.layerpageinfo.pageSize;
          this.question_list.splice(i, 1);
          this.layerpageinfo.total--;
          if (this.layerpageinfo.total <= this.layerpageinfo.pageSize) {
            this.layerpageinfo.pageNum = 1;
          }
        })
        .catch(() => {
          return;
        });
    },

    getRowKey1(row) {
      return row.titleId;
    },
    getRowKey2(row) {
      return row.titleId;
    },
    getRowKey3(row) {
      return row.titleId;
    },
    getRowKey4(row) {
      return row.titleId;
    },
    pageChange(val) {
      this.layerpageinfo.pageNum = val;
    },
    pageChange1(val) {
      this.layerpageinfo1.pageNum = val;
      this.getQuestions("选择题", 0);
    },
    pageChange2(val) {
      this.layerpageinfo2.pageNum = val;
      this.getQuestions("填空题", 1);
    },
    pageChange3(val) {
      this.layerpageinfo3.pageNum = val;
      this.getQuestions("判断题", 2);
    },
    pageChange4(val) {
      this.layerpageinfo4.pageNum = val;
      this.getQuestions("简答题", 3);
    },
    // 按类型获取题目列表
    getQuestions(titleType, index) {
      let obj = { titleType };
      obj = Object.assign({}, obj, this[`layerpageinfo${index + 1}`]);
      let str = JSON.stringify(obj);
      this.api.getQuestions(str).then(res => {
        console.log(res);
        if (res.code !== 0) return;
        let list = res.data;
        this.question_bank[index] = list ? list : [];
        this.$forceUpdate();
        this[`layerpageinfo${index + 1}`].total = res.totalSize || 0;
      });
    },
    async getAllQuestion() {
      await this.getQuestions("选择题", 0);
      await this.getQuestions("填空题", 1);
      await this.getQuestions("判断题", 2);
      await this.getQuestions("简答题", 3);
    },
    goBack() {
      this.$router.push({
        name: "job_list",
        query: {
          type: this.$route.query.type
        }
      });
    },
    // 提交作业添加
    submitJob(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.addHomeWork();
        } else {
          return false;
        }
      });
    },
    // 提交发布作业
    addHomeWork() {
      let homeworkTime = this.common.formatDateTime(new Date());
      let list = [...this.question_list];
      if (list.length == 0) {
        this.$message.warning("题目数量不能为0！");
        return;
      }
      let obj = {
        courseId: this.courseId,
        homeworkType: this.homeworkType,
        homeworkTitle: this.form.homeworkTitle,
        homeworkTime,
        titleList: list
      };
      let str = JSON.stringify(obj);
      this.api.addHomeWork(str).then(res => {
        console.log(res);
        if (res.code !== 0) return;
        this.$message.success("添加作业成功!");
        this.goBack();
      });
    },
    // 选择题目列表 四种类型的题目
    handleSelectionChange1(val) {
      this.select_list1 = val;
      this.select_list = [
        ...this.select_list1,
        ...this.select_list2,
        ...this.select_list3,
        ...this.select_list4
      ];
    },
    handleSelectionChange2(val) {
      this.select_list2 = val;
      this.select_list = [
        ...this.select_list1,
        ...this.select_list2,
        ...this.select_list3,
        ...this.select_list4
      ];
    },
    handleSelectionChange3(val) {
      this.select_list3 = val;
      this.select_list = [
        ...this.select_list1,
        ...this.select_list2,
        ...this.select_list3,
        ...this.select_list4
      ];
    },
    handleSelectionChange4(val) {
      this.select_list4 = val;
      this.select_list = [
        ...this.select_list1,
        ...this.select_list2,
        ...this.select_list3,
        ...this.select_list4
      ];
    },
    // 确定选择题目
    selectQuestion() {
      this.dialogVisible = false;
      this.question_list = this.select_list.concat([]);
      this.layerpageinfo.total = this.question_list.length;
      //   this.$refs.multipleTable1.clearSelection();
    }
  }
};
</script>
<style lang="scss">
.addJob {
  .content {
    .form_btn {
      text-align: center;
      padding-top: 20px;
    }
    .my_page {
      //分页
      .page {
        text-align: right !important;
      }
    }
  }
  .el-dialog__wrapper {
    .el-dialog {
      width: 80% !important;
      .el-dialog__body {
        padding-top: 10px;
      }
    }
  }
}
</style>