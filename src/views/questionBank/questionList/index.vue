<template>
  <div class="questionList">
    <div class="title">
      <label>
        题型：
        <el-select v-model="question_type" placeholder="请选择题目类型" @change="getQuestions">
          <el-option label="选择题" value="选择题"></el-option>
          <el-option label="填空题" value="填空题"></el-option>
          <el-option label="判断题" value="判断题"></el-option>
          <el-option label="简答题" value="简答题"></el-option>
        </el-select>
      </label>
      <el-button type="primary" @click="toUpload">导入题目</el-button>
    </div>
    <div class="content">
      <el-table border :data="question_list" class="my_table" v-show="type" style="width: 100%">
        <el-table-column align="center" prop="titleName" label="题目"></el-table-column>
        <el-table-column align="center" prop="titleA" label="选项A"></el-table-column>
        <el-table-column align="center" prop="titleB" label="选项B"></el-table-column>
        <el-table-column align="center" prop="titleC" label="选项C"></el-table-column>
        <el-table-column align="center" prop="titleD" label="选项D"></el-table-column>
        <el-table-column align="center" prop="titleAnswer" label="答案"></el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="editTitle(scope.row.titleId)">编辑</el-button>
            <el-button type="text" @click="deleteTitle(scope.row.titleId)" style="color:#f56c6c">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-table border :data="question_list" class="my_table" v-show="!type" style="width: 100%">
        <el-table-column align="center" prop="titleName" label="题目"></el-table-column>
        <el-table-column align="center" prop="titleAnswer" label="答案"></el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="editTitle(scope.row.titleId)">编辑</el-button>
            <el-button type="text" @click="deleteTitle(scope.row.titleId)" style="color:#f56c6c">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      title="题目修改"
      :visible.sync="dialogVisible"
      width="30%"
      @close="dialogVisible = false"
    >
      <span slot="footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = true">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      question_list: [],
      question_type: "选择题",
      dialogVisible: false,
      type: true //切换是否为选择题类型
    };
  },
  created() {
    this.getQuestions();
  },
  methods: {
    editTitle(titleId) {},
    deleteTitle(titleId) {
       this.$confirm("确定要删除此题目吗？", "提示", {
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          return;
        });
    },
    // 按类型获取题目列表
    getQuestions() {
      let obj = { titleType: this.question_type };
      let str = JSON.stringify(obj);
      this.api.getQuestions(str).then(res => {
        console.log(res);
        if (res.code !== 0) return;
        if (this.question_type == "选择题") this.type = true;
        else this.type = false;
        let list = res.data;
        this.question_list = list ? list : [];
      });
    },
    //跳转导入题目页面
    toUpload() {
      this.$router.push({ name: "upload_question" });
    }
  }
};
</script>
<style lang="scss">
.questionList {
  .my_table {
    border: 1px solid #e5e8ed;
    border-bottom: 0;
    table {
      tr {
        :first-child {
          div {
            text-align: left;
          }
        }
        td {
          .cell {
            max-height: none;
          }
        }
      }
    }

    //预览图片的样式
  }
}
</style>