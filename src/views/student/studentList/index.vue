<template>
  <div class="studentList">
    <div class="title">
      <div>
        <el-button type="primary" @click="uploadStudent">批量导入</el-button>
        <el-button type="primary" @click="addStudent">添加单个学生</el-button>
      </div>
      <el-button type="primary" @click="exportList">导出学生信息表</el-button>
    </div>
    <div class="content">
      <el-table :data="student_list" border stripe>
        <el-table-column align="center" prop="studentName" label="姓名"></el-table-column>
        <el-table-column align="center" prop="studentNum" label="学号"></el-table-column>
        <el-table-column align="center" prop="grade.regularGrade" label="平时成绩">
          <template slot-scope="scope">{{scope.row.grade?scope.row.grade.regularGrade:'未打分'}}</template>
        </el-table-column>
        <el-table-column align="center" prop="grade.examGrade" label="考试成绩">
          <template slot-scope="scope">{{scope.row.grade?scope.row.grade.examGrade:'未打分'}}</template>
        </el-table-column>
        <el-table-column align="center" prop="grade.finalGrade" label="最终成绩">
          <template slot-scope="scope">{{scope.row.grade?scope.row.grade.finalGrade:'未打分'}}</template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <!-- <el-button
              type="text"
              @click="studentDetail(scope.row.studentId,scope.row.studentName)"
            >查看详情</el-button>-->
            <el-button type="text" @click="editStudent(scope.$index)">查看详情</el-button>
            <!-- <el-button type="text" @click="deleteStudent(scope.row.id)">删除</el-button> -->
          </template>
        </el-table-column>
      </el-table>
      <myPage :layerpageinfo="layerpageinfo" @pageChange="pageChange"></myPage>
    </div>
    <!-- 编辑学生信息 -->
    <el-dialog
      title="学生信息"
      :visible.sync="dialogVisible"
      width="30%"
      @close="dialogVisible = false"
      :close-on-click-modal="false"
      top="10vh"
    >
      <div class="edit">
        <el-form :model="form" ref="form" label-width="100px">
          <el-form-item label="姓名">
            <!-- <el-input v-model="form.studentName" class="input_width" disabled></el-input> -->
            {{form.studentName}}
          </el-form-item>
          <el-form-item label="学号">
            <!-- <el-input v-model="form.studentId" class="input_width" disabled></el-input> -->
            {{form.studentNum}}
          </el-form-item>
          <el-form-item label="签到情况">
            <!-- <el-input v-model="form.sign" class="input_width" disabled></el-input> -->
            {{form.sign||0}}次未签到
          </el-form-item>
          <el-form-item label="作业情况">
            <!-- <el-input v-model="form.homeWork" class="input_width" disabled></el-input> -->
            {{form.homeWork||0}}次未提交
          </el-form-item>
          <el-form-item label="测试情况">
            <!-- <el-input v-model="form.test" class="input_width" disabled></el-input> -->
            {{form.test||0}}次未提交
          </el-form-item>
          <el-form-item label="平时成绩">
            <el-input v-model.number="form.regularGrade" @input="change" class="input_width">
              <template slot="append">分</template>
            </el-input>
          </el-form-item>
          <el-form-item label="考试成绩">
            <el-input v-model.number="form.examGrade" @input="change" class="input_width">
              <template slot="append">分</template>
            </el-input>
          </el-form-item>
          <el-form-item label="最终成绩">
            <el-input v-model.number="form.finalGrade" @input="change" class="input_width">
              <template slot="append">分</template>
            </el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitEdit">提交打分</el-button>
      </span>
    </el-dialog>
    <!-- 添加学生 -->
    <el-dialog
      title="添加学生"
      :visible.sync="dialogVisible2"
      width="30%"
      @close="closeAdd"
      :close-on-click-modal="false"
    >
      <div class="add">
        <el-form :model="form2" ref="form2" :rules="rules2" label-width="80px">
          <el-form-item label="姓名" prop="studentName">
            <el-input v-model="form2.studentName" class="input_width"></el-input>
          </el-form-item>
          <el-form-item label="学号" prop="studentNum">
            <el-input v-model.number="form2.studentNum" class="input_width"></el-input>
          </el-form-item>
          <!-- <el-form-item label="班级" prop="class">
            <el-input v-model.number="form2.class" class="input_width"></el-input>
          </el-form-item>-->
        </el-form>
      </div>
      <span slot="footer">
        <el-button @click="closeAdd">取 消</el-button>
        <el-button type="primary" @click="submitForm('form2')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import myPage from "@/components/myPage.vue";
import XLSX from "xlsx";
export default {
  components: {
    myPage
  },
  data() {
    return {
      dialogVisible: false,
      dialogVisible2: false,
      layerpageinfo: {
        pageSize: 6,
        pageNum: 1,
        total: 0
      },
      student_list: [],
      form: {
        name: "",
        number: "",
        regularGrade: null,
        finalGrade: null,
        examGrade: null
      },
      form2: {
        studentName: "",
        studentNum: ""
      },
      index: 0,
      rules2: {
        studentName: [
          { required: true, message: "请输入姓名", trigger: "blur" }
        ],
        studentNum: [
          { required: true, message: "请输入学号", trigger: "blur" },
          { type: "number", message: "学号必须为数字" }
        ]
      }
    };
  },
  computed: {
    courseId() {
      return this.$store.state.courseId;
    }
  },
  created() {
    this.getStudentList();
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.submitUpload();
        } else {
          return false;
        }
      });
    },
    // 提交导入学生名单
    submitUpload() {
      // console.log(this.student_list);
      let obj = {
        courseId: this.courseId,
        list: [this.form2]
      };
      let str = JSON.stringify(obj);
      this.api.addStudentList(str).then(res => {
        console.log(res);
        if (res.code !== 0) return;
        this.$message.success("导入学生成功！");
        this.form2 = {};
        this.dialogVisible2 = false;
        this.getStudentList();
      });
    },
    closeAdd() {
      this.dialogVisible2 = false;
    },
    pageChange(val) {
      this.layerpageinfo.pageNum = val;
      this.getStudentList();
    },
    // 修改成绩表单时强制渲染保证页面更新
    change() {
      this.$forceUpdate();
    },
    // 获取学生列表
    getStudentList() {
      let obj = {
        courseId: this.courseId
      };
      obj = Object.assign({}, obj, this.layerpageinfo);
      let str = JSON.stringify(obj);
      this.api.getCourseInfo(str).then(res => {
        console.log(res);
        if (res.code !== 0) return;
        let list = res.data.list || [];
        this.student_list = list;
        this.layerpageinfo.total = res.data.courseCount;
      });
    },
    //   添加一个学生
    addStudent() {
      this.dialogVisible2 = true;
    },
    // 查看学生详情
    studentDetail(id, name) {
      //   console.log(id);
      this.$router.push({
        name: "student_detail",
        query: {
          id,
          name
        }
      });
    },
    // 批量导入学生名单
    uploadStudent() {
      this.$router.push({ name: "upload_student" });
    },
    // 编辑学生信息
    async editStudent(index) {
      this.index = index;
      this.form = Object.assign({}, this.student_list[index]);
      let grade = Object.assign({}, this.form.grade || {});
      this.form.regularGrade = grade.regularGrade || 0;
      this.form.examGrade = grade.examGrade || 0;
      this.form.finalGrade = grade.finalGrade || 0;
      console.log(this.form);
      await this.getSignInfo();
      await this.getHomeWorkInfo("课后作业");
      await this.getTestInfo("课堂测试");
    },
    // 保存编辑
    submitEdit() {
      // console.log(this.form);
      this.form.courseId = this.courseId;
      let obj = Object.assign({}, this.form);
      let str = JSON.stringify(obj);
      this.api.editGrade(str).then(res => {
        // console.log(res);
        if (res.code !== 0) return;
        this.$message.success("已修改学生成绩");
        this.dialogVisible = false;
        this.getStudentList();
      });
    },
    // 获取学生签到情况信息
    getSignInfo() {
      let obj = {
        studentId: this.form.studentId
      };
      let str = JSON.stringify(obj);
      return new Promise((resolve, reject) => {
        this.api.getSignInfo(str).then(res => {
          // console.log(res);
          if (res.code !== 0) return;
          let list = res.data || [];
          list.forEach(item => {
            if (item.courseId == this.courseId) {
              this.form.sign = (item.total || 0) - (item.summit || 0);
            }
          });
          resolve(res);
        });
      });
    },
    // 获取学生作业情况
    getHomeWorkInfo() {
      let obj = {
        studentId: this.form.studentId,
        homeworkType: "课后作业"
      };
      let str = JSON.stringify(obj);
      return new Promise((resolve, reject) => {
        this.api.getHomeWorkInfo(str).then(res => {
          console.log(res);
          if (res.code !== 0) return;
          let list = res.data || [];
          list.forEach(item => {
            if (item.courseId == this.courseId) {
              let count = (item.total || 0) - (item.summit || 0);
              this.form.homeWork = count;
            }
          });
          resolve(res);
        });
      });
    },
    // 获取学生测试情况
    getTestInfo() {
      let obj = {
        studentId: this.form.studentId,
        homeworkType: "课堂测试"
      };
      let str = JSON.stringify(obj);
      return new Promise((resolve, reject) => {
        this.api.getHomeWorkInfo(str).then(res => {
          if (res.code !== 0) return;
          let list = res.data || [];
          list.forEach(item => {
            if (item.courseId == this.courseId) {
              let count = (item.total || 0) - (item.summit || 0);
              this.form.test = count;
            }
          });
          this.dialogVisible = true;
          resolve(res);
        });
      });
    },
    // 导出学生信息表xlsx
    exportList() {
      let obj = {
        courseId: this.courseId
      };
      let str = JSON.stringify(obj);
      this.api.getAllStudentInfo(str).then(res => {
        console.log(res);
        if (res.code !== 0) return;
        let list = res.data || [];
        let json = list.map(item => {
          let obj = {};
          obj["姓名"] = item.studentName;
          obj["学号"] = item.studentNum;
          obj["未签到次数"] = item.cid || 0;
          obj["作业未提交次数"] = item.pageNum || 0;
          obj["测试未提交次数"] = item.pageSize || 0;
          let grade = item.grade || {};
          if (!item.grade) {
            obj["平时成绩"] = "未打分";
            obj["考试成绩"] = "未打分";
            obj["最终成绩"] = "未打分";
          } else {
            let grade = item.grade;
            obj["平时成绩"] = grade.regularGrade;
            obj["考试成绩"] = grade.examGrade;
            obj["最终成绩"] = grade.finalGrade;
          }
          return obj;
        });
         this.common.jsonToXlsx(json, "学生信息表.xlsx");
      });
    }
  }
};
</script>