<template>
  <div>
    <el-dialog
      title="切换当前课程"
      :visible.sync="show"
      width="30%"
      @open="getTerm"
      :close-on-click-modal="false"
      @close="hideChangeCourse"
    >
      <div class="change">
        <el-form ref="form" label-width="80px">
          <el-form-item label="学期:">
            <el-select v-model="termId" placeholder="可切换当前学期" @change="changeTerm">
              <el-option
                v-for="(item, index) in termList"
                :key="index"
                :label="item.termYear+'-'+item.termNo"
                :value="item.termId"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="课程:">
            <el-select v-model="courseId" :disabled="!termId" placeholder="可切换当前课程">
              <el-option
                v-for="(item, index) in courseList"
                :key="index"
                :label="item.courseName"
                :value="item.courseId"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer">
        <el-button @click="hideChangeCourse">取 消</el-button>
        <el-button type="primary" @click="changeCourse">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      courseList: [],
      termList: [],
      termId: "",
      courseId: ""
    };
  },
  props: {
    show: false
  },
  created() {
    this.getTerm();
  },
  methods: {
    //   隐藏切换课程
    hideChangeCourse() {
      this.$store.dispatch("setChangeCourse", false);
    },
    // 切换学期
    changeTerm(termId) {
      this.termId = termId;
      this.courseId = ''
      this.getCourse();
    },
    // 获取所有学期
    getTerm() {
      this.api.getTerm().then(res => {
        // console.log(res);
        if (res.code !== 0) return;
        let list = res.data;
        this.termList = list.length ? list.reverse() : [];
        this.termId = list[0].termId;
        this.getCourse();
      });
    },
    // 获取某个学期的课程列表
    getCourse() {
      let obj = {
        termId: this.termId
      };
      let str = JSON.stringify(obj);
      this.api.getCourse(str).then(res => {
        console.log(res);
        if (res.code !== 0) return;
        let list = res.data;
        this.courseList = list ? list.reverse() : [];
      });
    },
    // 切换课程
    changeCourse() {
      this.courseList.forEach(item => {
        if (
          item.courseId === this.courseId &&
          this.courseId != sessionStorage.getItem("courseId")
        ) {
          this.$store.dispatch("setCourseName", item.courseName);
          this.$message.success("已切换当前课程");
          this.$store.dispatch("setCourseId", this.courseId);
          this.$store.dispatch("setChangeCourse", false);
          console.log();
          if (this.$route.name !== "courseList") {
            setTimeout(() => {
              location.reload();
            }, 200);
          }
          return;
        } else {
          this.$store.dispatch("setChangeCourse", false);
        }
      });
    }
  }
};
</script>