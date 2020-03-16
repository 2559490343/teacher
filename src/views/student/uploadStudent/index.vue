<template>
  <div class="uploadStudent">
    <el-page-header @back="goBack" content="导入学生"></el-page-header>
    <div class="content">
      <div class="title">
        <el-button type="primary" @click="upLoadXlsx">上传文件</el-button>
        <el-button type="primary" @click="submitUpload" v-show="student_list.length">导入名单</el-button>
      </div>
      <el-table border :data="student_list.slice((layerpageinfo.pageNum-1)*layerpageinfo.pageSize,layerpageinfo.pageNum*layerpageinfo.pageSize)" class="my_table" style="width: 100%">
        <el-table-column align="center" prop="studentName" label="姓名"></el-table-column>
        <el-table-column align="center" prop="studentNum" label="学号"></el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="changeStudent(scope.$index)">修改</el-button>
            <el-button type="text" @click="deleteStudent(scope.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <myPage :layerpageinfo="layerpageinfo" @pageChange="pageChange"></myPage>
      <!-- <div class="btns" v-show="student_list.length">
        <el-button type="primary" @click="submitUpload">导入名单</el-button>
      </div>-->
    </div>
    <el-dialog
      title="修改"
      :visible.sync="dialogVisible"
      width="30%"
      @close="dialogVisible = false"
      :close-on-click-modal="false"
    >
      <div class="add">
        <el-form :model="form" ref="form" label-width="80px">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="form.name" class="input_width"></el-input>
          </el-form-item>
          <el-form-item label="学号" prop="number">
            <el-input v-model.number="form.number" class="input_width"></el-input>
          </el-form-item>
          <el-form-item label="班级" prop="class">
            <el-input v-model.number="form.class" class="input_width"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitChange">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 上传文件input -->
    <input
      type="file"
      name="excel"
      id="excel"
      accept=".xlsx"
      ref="excel"
      v-show="false"
      @change="beforeUpload"
    />
  </div>
</template>
<script>
import XLSX from "xlsx";
import myPage from "@/components/myPage.vue";

export default {
  components: {
    myPage
  },
  data() {
    return {
      student_list: [],
      dialogVisible: false,
      layerpageinfo: {
        pageSize: 5,
        pageNum: 1,
        total: 0
      },
      form: {
        name: "",
        class: null,
        number: null
      }
    };
  },
  computed: {
    courseId() {
      return this.$store.state.courseId;
    }
  },
  methods: {
    pageChange(val) {
      this.layerpageinfo.pageNum = val;
    },
    //   修改
    changeStudent(index) {
      this.index = index;
      this.dialogVisible = true;
      this.form = Object.assign({}, this.student_list[index]);
    },
    // 提交修改
    submitChange() {
      this.dialogVisible = false;
      this.student_list.splice(this.index, 1, Object.assign({}, this.form));
    },
    // 删除
    deleteStudent(index) {
      this.$confirm("确定删除此条学生信息吗？", "提示", {
        type: "warning"
      })
        .then(() => {
          this.student_list.splice(index, 1);
          this.$message.success("删除成功!");
        })
        .catch(() => {
          return;
        });
    },
    goBack() {
      this.$router.push({ name: "student_list" });
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
      let worksheet1 = workbook.Sheets["Sheet5"];
      let a = XLSX.utils.sheet_to_json(worksheet1);
      //   console.log(j);
      this.student_list = [...a];
      this.layerpageinfo.total = this.student_list.length || 0;
      // console.log(list);

      return false;
    },
    //触发文件读取
    upLoadXlsx() {
      let exl = this.$refs.excel;
      exl.click();
    },
    // 提交导入学生名单
    submitUpload() {
      // console.log(this.student_list);
      let obj = {
        courseId: this.courseId,
        list: this.student_list
      };
      let str = JSON.stringify(obj);
      this.api.addStudentList(str).then(res => {
        console.log(res);
        if (res.code !== 0) return;
        this.$message.success("导入学生成功！");
        this.goBack();
      });
    }
  }
};
</script>
<style lang="scss">
.uploadStudent {
  .content {
    padding-top: 10px;
    .title {
      padding: 0;
    }
    .btns {
      text-align: center;
      line-height: 60px;
    }
  }
}
</style>