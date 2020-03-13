<template>
  <div class="addTerm">
    <el-page-header @back="goBack" content="添加课程"></el-page-header>
    <div class="content">
      <el-form :model="form" :rules="rules" ref="form" label-width="80px">
        <el-form-item label="课程名称" prop="name">
          <el-input v-model="form.name" class="input_width"></el-input>
        </el-form-item>
        <el-form-item label="课程简介" prop="intro">
          <el-input v-model="form.intro" class="input_width"></el-input>
        </el-form-item>
        <el-form-item label="课程详情" prop="detail">
          <el-input type="textarea" v-model="form.detail"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('form')">立即添加</el-button>
          <el-button @click="goBack">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        name: "",
        intro: "",
        detail: ""
      },
      rules: {
        name: [{ required: true, message: "请输入课程名称", trigger: "blur" }],
        intro: [{ required: true, message: "请输入课程简介", trigger: "blur" }],
        detail: [{ required: true, message: "请输入课程详情", trigger: "blur" }]
      },
      termId: ""
    };
  },
  created() {
    this.termId = this.$route.query.termId;
  },
  methods: {
    goBack() {
      // this.$router.go(-1);
      this.$router.push({ name: "courseList" });
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let obj = {
            courseName: this.form.name,
            courseIntro: this.form.intro,
            courseDetail: this.form.detail,
            termId: this.termId
          };
          let str = JSON.stringify(obj);
          this.api.addCourse(str).then(res => {
            console.log(res);
            if (res.code !== 0) return;
            this.$message.success("课程添加成功！");
            this.goBack();
          });
        } else {
          return false;
        }
      });
    }
  }
};
</script>
<style lang="scss">
.addTerm {
  textarea {
    width: 350px;
    height: 200px !important;
  }
}
</style>