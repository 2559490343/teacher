<template>
  <div class="uploadQuestion">
    <el-page-header @back="goBack" content="导入题目"></el-page-header>
    <div class="content">
      <div class="title">
        <label>
          题型：
          <el-select style="margin-right:10px;" v-model="question_type" placeholder="请选择题目类型">
            <el-option label="选择题" value="0"></el-option>
            <el-option label="填空题" value="1"></el-option>
            <el-option label="判断题" value="2"></el-option>
            <el-option label="简答题" value="3"></el-option>
          </el-select>
          <el-button type="primary" @click="addQuestion">添加单题</el-button>
          <!-- <el-button type="primary" @click="upLoadXlsx">批量导入</el-button> -->
        </label>
        <div>
          <el-button type="primary" @click="download">下载文件模板</el-button>
          <el-button type="primary" @click="upLoadXlsx">批量导入</el-button>
        </div>
      </div>
      <el-table
        border
        :data="question_list[0]"
        class="my_table"
        v-if="question_type=='0'"
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
            <el-button type="text" @click="changeQuestion(scope.$index)">修改</el-button>
            <el-button type="text" @click="deleteQuestion(scope.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-table
        border
        :data="question_list[question_type]"
        class="my_table"
        v-show="question_type!='0'"
        style="width: 100%"
      >
        <el-table-column align="center" prop="titleName" label="题目"></el-table-column>
        <el-table-column align="center" prop="titleAnswer" label="答案"></el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="changeQuestion(scope.$index)">修改</el-button>
            <el-button type="text" @click="deleteQuestion(scope.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="form_btn">
        <el-button type="primary" @click="upLoad">上传题库</el-button>
      </div>
    </div>
    <input
      type="file"
      name="excel"
      id="excel"
      accept=".xlsx"
      ref="excel"
      v-show="false"
      @change="beforeUpload"
    />
    <el-dialog
      :title="flag?'添加题目':'修改题目'"
      :visible.sync="dialogVisible"
      width="30%"
      @close="dialogVisible = false"
      :close-on-click-modal="false"
    >
      <div class="inner">
        <el-form :model="form" ref="form" :rules="rules" label-width="80px">
          <el-form-item label="题目" prop="titleName">
            <el-input v-model="form.titleName" class="input_width"></el-input>
          </el-form-item>
          <el-form-item label="选项A" v-if="question_type == '0'">
            <el-input v-model="form.titleA" class="input_width"></el-input>
          </el-form-item>
          <el-form-item label="选项B" v-if="question_type == '0'">
            <el-input v-model="form.titleB" class="input_width"></el-input>
          </el-form-item>
          <el-form-item label="选项C" v-if="question_type == '0'">
            <el-input v-model="form.titleC" class="input_width"></el-input>
          </el-form-item>
          <el-form-item label="选项D" v-if="question_type == '0'">
            <el-input v-model="form.titleD" class="input_width"></el-input>
          </el-form-item>
          <!-- <el-form-item label="答案" v-if="question_type == '3'">
            <el-input type="textarea" v-model="form.titleAnswer" class="input_width"></el-input>
          </el-form-item>-->
          <el-form-item label="答案" v-if="question_type != '3'" prop="titleAnswer">
            <el-input v-model="form.titleAnswer" class="input_width"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('form')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import XLSX from "xlsx";
export default {
  data() {
    return {
      question_type: "0", //题目类型
      question_list: [[], [], [], []], //导入的题目列表
      dialogVisible: false,
      form: {
        titleName: "",
        titleA: "",
        titleB: "",
        titleC: "",
        titleD: "",
        titleAnswer: ""
      },
      rules: {
        titleName: [{ required: true, message: "请输入题目", trigger: "blur" }],
        titleAnswer: [
          { required: true, message: "请输入答案", trigger: "blur" }
        ]
      },
      flag: true, //添加题目或者是修改题目的flag
      index: null,
      importList: [] //上传的题目列表参数
    };
  },
  methods: {
    // 下载模板文件
    download() {
      let a = document.createElement("a");
      a.href = "https://8.129.53.167/upload/title.xlsx";
      a.click();
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.optQuestion();
        } else {
          return false;
        }
      });
    },
    //读取xlsx文件
    readXLSX(file) {
      let files = file.target.files[0];
      let nameSplit = files.name.split(".");
      let format = nameSplit[nameSplit.length - 1];
      if (!["xlsx", "csv"].includes(format)) {
        alert("请上传后缀为xlsx的文件！");
        return false;
      }
      return new Promise((resolve, reject) => {
        let reader = new FileReader();
        reader.readAsBinaryString(files);
        reader.onload = function(evt) {
          let data = evt.target.result; // 读到的数据
          var workbook = XLSX.read(data, { type: "binary" });
          resolve(workbook);
        };
      });
    },
    //把xlsx文件内容转成json格式
    async beforeUpload(file) {
      const workbook = await this.readXLSX(file);
      let worksheet1 = workbook.Sheets["Sheet1"];
      let worksheet2 = workbook.Sheets["Sheet2"];
      let worksheet3 = workbook.Sheets["Sheet3"];
      let worksheet4 = workbook.Sheets["Sheet4"];
      let a = XLSX.utils.sheet_to_json(worksheet1);
      let b = XLSX.utils.sheet_to_json(worksheet2);
      let c = XLSX.utils.sheet_to_json(worksheet3);
      let d = XLSX.utils.sheet_to_json(worksheet4);
      //   console.log(j);
      this.question_list = [a, b, c, d];
      this.importList = [...a, ...b, ...c, ...d];
      // console.log(list);

      return false;
    },
    //触发文件读取
    upLoadXlsx() {
      let exl = this.$refs.excel;
      exl.click();
    },
    //上传题目
    upLoad() {
      if (this.importList.length == 0) {
        this.$message.warning("上传题目列表不能为空");
        return;
      }
      let str = JSON.stringify(this.importList);
      this.api.importQuestions(str).then(res => {
        console.log(res);
        if (res.code !== 0) return;
        this.$message.success("题目上传成功");
        this.question_list = [];
        this.importList = [];
        // this.form = {};
        this.goBack();
      });
    },
    goBack() {
      this.$router.push({ name: "question_list" });
      setTimeout(() => {
        location.reload();
      }, 100);
    },
    // 操作题目
    optQuestion() {
      if (this.flag) {
        let titleType = "";
        switch (this.question_type) {
          case "0":
            titleType = "选择题";
            break;
          case "1":
            titleType = "填空题";
            break;
          case "2":
            titleType = "判断题";
            break;
          case "3":
            titleType = "简答题";
            break;
          default:
            titleType = "选择题";
            break;
        }
        this.question_list[parseInt(this.question_type)].push(
          Object.assign({}, this.form, { titleType })
        );
        this.importList = [];
        this.question_list.forEach(item => {
          this.importList = this.importList.concat(item);
        });
        this.$message.success("题目已添加!");
        this.dialogVisible = false;
        this.form = {};
      } else {
        this.question_list[parseInt(this.question_type)].splice(
          this.index,
          1,
          Object.assign({}, this.form)
        );
        this.dialogVisible = false;
        this.$message.success("修改题目成功");
        this.importList = [];
        this.question_list.forEach(item => {
          this.importList = this.importList.concat(item);
        });
        this.form = {};
      }
    },
    //删除题目
    deleteQuestion(index) {
      //   console.log(index);
      this.$confirm("确定要删除当前题目吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.question_list[parseInt(this.question_type)].splice(index, 1);
          this.importList = [];
          this.question_list.forEach(item => {
            this.importList = this.importList.concat(item);
          });
        })
        .catch(() => {
          return;
        });
    },
    //修改题目
    changeQuestion(index) {
      this.dialogVisible = true;
      this.flag = false;
      this.form = Object.assign(
        {},
        this.question_list[parseInt(this.question_type)][index]
      );
      this.index = index;
    },
    addQuestion() {
      this.dialogVisible = true;
      this.flag = true;
    }
  }
};
</script>
<style lang="scss">
.uploadQuestion {
  .content {
    padding-top: 10px;
    .title {
      padding: 0;
    }
    .form_btn {
      text-align: center;
      padding-top: 30px;
    }
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
}
</style>