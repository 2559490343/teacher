<template>
  <div class="courseList">
    <div class="title">
      <label>
        学期：
        <el-select v-model="term" placeholder="请选择学期" @change="changeTerm">
          <el-option
            v-for="(item, index) in term_list"
            :key="index"
            :label="item.termYear+'-'+item.termNo"
            :value="item.termId"
          >
            <span style="float: left">{{ item.termYear+'-'+item.termNo }}</span>
            <span
              style="float: right; font-size: 13px;margin-top:11px"
              class="el-icon-circle-close"
              @click.stop="deleteTerm(item.termId)"
            ></span>
          </el-option>
        </el-select>
        <el-button type="primary" @click="dialogVisible = true" style="margin-left:10px">添加学期</el-button>
      </label>

      <el-button type="primary" @click="addCourse">添加课程</el-button>
    </div>
    <div class="content">
      <el-table border :data="courseList" class="my_table" style="width: 100%">
        <el-table-column align="center" prop="courseName" label="课程名称"></el-table-column>
        <el-table-column align="center" prop="courseIntro" label="课程简介"></el-table-column>
        <el-table-column align="center" prop="courseCount" label="选课人数">
          <template slot-scope="scope">{{scope.row.courseCount||0}}</template>
        </el-table-column>
        <el-table-column align="center" prop="courseCode" label="发布状态">
          <template slot-scope="scope">{{scope.row.courseCode?'发布中':'未发布'}}</template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="toCourseDetail(scope.row.courseId)">查看详情</el-button>
            <el-button
              type="text"
              v-if="!scope.row.courseCode"
              @click="showPublish(scope.row.courseId)"
            >发布</el-button>
            <el-button type="text" @click="showStatus(scope.row)" v-else>查看发布情况</el-button>
            <el-button
              type="text"
              @click="deleteCourse(scope.row.courseId)"
              style="color:#f56c6c"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 添加学期 -->
    <el-dialog
      title="添加学期"
      :close-on-click-modal="false"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="term">
          <el-form-item prop="year1">
            <el-date-picker v-model="ruleForm.year1" type="year" placeholder="选择学年"></el-date-picker>
          </el-form-item>
          <em>-</em>
          <el-form-item prop="year2">
            <el-date-picker
              @blur="computeTime"
              :disabled="!ruleForm.year1"
              v-model="ruleForm.year2"
              type="year"
              placeholder="选择学年"
            ></el-date-picker>
          </el-form-item>
          <el-form-item prop="termNo" class="term_select">
            <el-select v-model="ruleForm.termNo" placeholder="请选择学期">
              <el-option label="第一学期" value="1"></el-option>
              <el-option label="第二学期" value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 发布详情 -->
    <el-dialog title="发布详情" :visible.sync="dialogVisible2" width="30%" @close="closePublishDetail">
      <div class="status">
        <el-form ref="form" label-width="150px">
          <el-form-item label="课程名">{{courseName}}</el-form-item>
          <el-form-item label="课程邀请码">{{courseCode}}</el-form-item>
          <el-form-item label="过期倒计时">{{countTime>=0?countTime+'秒':'已结束'}}</el-form-item>
        </el-form>
      </div>
      <span slot="footer">
        <el-button @click="closePublishDetail">取 消</el-button>
        <el-button type="primary" @click="closePublishDetail">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 填写发布信息 -->
    <el-dialog
      title="发布课程"
      :visible.sync="dialogVisible3"
      width="30%"
      @close="dialogVisible3 = false"
    >
      <div class="publish">
        <el-form :model="ruleForm1" ref="ruleForm1" label-width="110px">
          <el-form-item
            label="邀请持续时长"
            prop="end"
            :rules="[
      { required: true, message: '请输入邀请持续时长', trigger: 'blur' },
      { type: 'number', message: '请输入数字', trigger: ['blur', 'change'] }
    ]"
          >
            <el-input v-model.number="ruleForm1.end">
              <template slot="append">分钟</template>
            </el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer">
        <el-button @click="dialogVisible3 = false">取 消</el-button>
        <el-button type="primary" @click="getCourseCode">确 定</el-button>
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
      dialogVisible: false,
      dialogVisible2: false,
      dialogVisible3: false,
      courseList: [], //课程列表
      termId: "",
      term: "",
      term_list: [],

      ruleForm: {
        year1: "",
        year2: "",
        termNo: ""
      },
      rules: {
        year1: [{ required: true, message: "请选择学年", trigger: "blur" }],
        year2: [{ required: true, message: "请选择学年", trigger: "blur" }],
        termNo: [{ required: true, message: "请选择学期", trigger: "blur" }]
      },
      ruleForm1: {},
      countTime: "",
      courseName: "",
      courseCode: "",
      timer: null
    };
  },
  created() {
    this.getTerm();
  },
  mounted() {},
  methods: {
    // 删除课程
    deleteCourse(courseId) {
      this.$confirm("确定要删除此课程吗？", "提示", {
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
    // 删除学期
    deleteTerm(termId) {
      // console.log(termId);
      this.$confirm("确定要删除此学期吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
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
    // 关闭发布详情的弹窗
    closePublishDetail() {
      this.dialogVisible2 = false;
      clearInterval(this.timer);
    },
    // 修改当前学期
    changeTerm(termId) {
      this.termId = termId;
      this.getCourse();
    },
    // 获取所有学期
    getTerm() {
      this.api.getTerm().then(res => {
        // console.log(res);
        if (res.code !== 0) return;
        let list = res.data || [];
        this.term_list = list;
        this.term = list.length ?list[0].termId:'';
        this.termId = list.length ? list[0].termId : "";
        this.getCourse();
      });
    },
    // 获取某个学期的课程列表
    getCourse() {
      if(!this.termId) return
      this.api.getCourse(this.termId).then(res => {
        console.log(res);
        if (res.code !== 0) return;
        let list = res.data;
        this.courseList = list ? list : [];
      });
    },
    // 去添加课程
    addCourse() {
      this.$router.push({ name: "addCourse", query: { termId: this.termId } });
    },
    // 点击发布按钮显示表单
    showPublish(courseId) {
      this.dialogVisible3 = true;
      this.courseId = courseId;
    },
    // 确定发布课程
    getCourseCode() {
      let end = this.ruleForm1.end * 60;
      // 将结束时间转化成毫秒数字符串
      let finish = (new Date().getTime() + end * 1000).toString();
      let obj = {
        courseId: this.courseId,
        end,
        finish
      };
      // console.log(obj);
      let str = JSON.stringify(obj);
      this.api.getCourseCode(str).then(res => {
        console.log(res);
        if (res.code !== 0) return;
        this.$message.success("发布课程成功!");
        this.dialogVisible3 = false;
        this.getCourse();
      });
    },
    // 提交学期添加表单
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.dialogVisible = false;
          let year1 = this.ruleForm.year1.getFullYear();
          let year2 = this.ruleForm.year2.getFullYear();
          let termYear = `${year1}-${year2}`;
          let termNo = this.ruleForm.termNo;
          let obj = {
            termYear,
            termNo
          };
          let str = JSON.stringify(obj);
          this.api.addTerm(str).then(res => {
            console.log(res);
            if (res.code !== 0) return;
            this.$message.success("学期添加成功！");
            this.getTerm();
          });
        } else {
          return false;
        }
      });
    },
    handleClose() {
      this.dialogVisible = false;
    },
    computeTime() {
      if (
        this.ruleForm.year2.getFullYear() -
          this.ruleForm.year1.getFullYear() !==
        1
      ) {
        this.$message({
          message: "学年必须为一年！",
          duration: 1500,
          type: "warning"
        });
        this.ruleForm.year2 = "";
      }
    },
    // 跳转课程详情
    toCourseDetail(courseId) {
      this.$router.push({
        name: "courseDetail",
        query: { courseId }
      });
    },
    // 查看发布情况
    showStatus(course) {
      // this.course_name = course.name;
      let obj = {
        courseId: course.courseId
      };
      let str = JSON.stringify(obj);
      this.api.getCourseCode(str).then(res => {
        console.log(res);
        if (res.code !== 0) return;
        let obj = res.data || {};
        this.courseName = course.courseName;
        this.courseCode = course.courseCode;
        // 结束剩余时间转化格式
        this.countTime = parseInt(
          (parseInt(obj.finish) - new Date().getTime()) / 1000
        );
        // 倒计时
        this.timer = setInterval(() => {
          if (this.countTime >= 0) this.countTime--;
          else clearInterval(this.timer);
        }, 1000);
        this.dialogVisible2 = true;
      });
      // 计算结束时间倒计时
    }
  }
};
</script>
<style lang="scss">
.courseList {
  .el-dialog__wrapper {
    .term {
      display: flex;
      .el-form-item {
        width: 120px;
        margin: 0;
      }
      input {
        width: 120px;
      }
      em {
        line-height: 32px;
        margin: 0 5px;
      }
      .term_select {
        margin-left: 10px;
        input {
          width: 150px;
        }
      }
    }
  }
  .el-icon-circle-close:hover {
    color: red !important;
    margin-top: 20px !important;
  }
}
</style>