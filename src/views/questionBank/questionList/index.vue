<template>
  <div class="questionList">
    <div class="title">
      <label>
        题型：
        <el-select v-model="question_type" placeholder="请选择题目类型" @change="typeChange">
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
            <el-button type="text" @click="showEdit(scope.row)">编辑</el-button>
            <el-button type="text" @click="deleteTitle(scope.row.titleId)" style="color:#f56c6c">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <myPage :layerpageinfo="layerpageinfo" @pageChange="pageChange" v-show="type"></myPage>
      <el-table border :data="question_list" class="my_table" v-show="!type" style="width: 100%">
        <el-table-column align="center" prop="titleName" label="题目"></el-table-column>
        <el-table-column align="center" prop="titleAnswer" label="答案"></el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="showEdit(scope.row)">编辑</el-button>
            <el-button type="text" @click="deleteTitle(scope.row.titleId)" style="color:#f56c6c">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <myPage :layerpageinfo="layerpageinfo1" @pageChange="pageChange1" v-show="!type"></myPage>
    </div>
    <el-dialog
      title="题目修改"
      :visible.sync="dialogVisible"
      width="30%"
      @close="dialogVisible = false"
    >
      <div class="inner">
        <el-form :model="form" ref="form" label-width="80px">
          <el-form-item label="题目">
            <el-input v-model="form.titleName" class="input_width"></el-input>
          </el-form-item>
          <el-form-item label="选项A" v-if="question_type == '选择题'">
            <el-input v-model="form.titleA" class="input_width"></el-input>
          </el-form-item>
          <el-form-item label="选项B" v-if="question_type == '选择题'">
            <el-input v-model="form.titleB" class="input_width"></el-input>
          </el-form-item>
          <el-form-item label="选项C" v-if="question_type == '选择题'">
            <el-input v-model="form.titleC" class="input_width"></el-input>
          </el-form-item>
          <el-form-item label="选项D" v-if="question_type == '选择题'">
            <el-input v-model="form.titleD" class="input_width"></el-input>
          </el-form-item>
          <el-form-item label="答案" v-if="question_type == '简答题'">
            <el-input type="textarea" v-model="form.titleAnswer" class="input_width"></el-input>
          </el-form-item>
          <el-form-item label="答案" v-else>
            <el-input v-model="form.titleAnswer" class="input_width"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editTitle">确 定</el-button>
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
      question_list: [],
      question_type: "选择题",
      dialogVisible: false,
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
      type: true, //切换是否为选择题类型
      form: {}
    };
  },
  created() {
    this.getQuestions();
  },
  methods: {
    typeChange() {
      if (this.question_type == "选择题") this.type = true;
      else {
        this.type = false;
        this.layerpageinfo1.pageNum = 1;
      }
      this.getQuestions();
    },
    pageChange(val) {
      this.layerpageinfo.pageNum = val;
      this.getQuestions();
    },
    pageChange1(val) {
      this.layerpageinfo1.pageNum = val;
      this.getQuestions();
    },
    // 显示修改题目的弹窗
    showEdit(title) {
      this.form = Object.assign({}, title);
      this.dialogVisible = true;
    },
    // 提交修改
    editTitle() {
      let str = JSON.stringify(this.form);
      this.api.editTitle(str).then(res => {
        if (res.code !== 0) return;
        this.$message.success("题目修改成功!");
        this.dialogVisible = false;
        this.getQuestions();
      });
    },
    // 删除题目
    deleteTitle(titleId) {
      this.$confirm("确定要删除此题目吗？", "提示", {
        type: "warning"
      })
        .then(() => {
          let obj = { titleId };
          let str = JSON.stringify(obj);
          this.api.delTitle(str).then(res => {
            if (res.code !== 0) return;
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            this.getQuestions();
          });
        })
        .catch(() => {
          return;
        });
    },
    // 按类型获取题目列表
    getQuestions() {
      let obj = { titleType: this.question_type };
      if (this.type) {
        obj = Object.assign({}, obj, this.layerpageinfo);
      } else {
        obj = Object.assign({}, obj, this.layerpageinfo1);
      }
      let str = JSON.stringify(obj);
      this.api.getQuestions(str).then(res => {
        console.log(res);
        if (res.code !== 0) return;
        let list = res.data;
        this.question_list = list ? list : [];
        this.layerpageinfo.total = res.totalSize;
        this.layerpageinfo1.total = res.totalSize;
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