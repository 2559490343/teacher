<template>
  <div>
    <el-dialog
      title="修改个人信息"
      :visible.sync="show"
      width="30%"
      @open="getTeacherInfo"
      :close-on-click-modal="false"
      @close="hideEditInfo"
    >
      <div class="change">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item
            label="姓名:"
            prop="teacherName"
            :rules="{ required: true, message: '请输入姓名', trigger: 'blur' }"
          >
            <el-input v-model="form.teacherName" class="input_width"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer">
        <el-button @click="hideEditInfo">取 消</el-button>
        <el-button type="primary" @click="submitForm('form')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        teacherName: ""
      }
    };
  },
  props: {
    show: false
  },
  created() {},
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.editInfo();
        } else {
          return false;
        }
      });
    },
    //   隐藏修改信息
    hideEditInfo() {
      this.$store.dispatch("setEditInfo", false);
    },
    // 提交修改个人信息
    editInfo() {
      let obj = {
        teacherName: this.form.teacherName
      };
      let str = JSON.stringify(obj);
      this.api.editName(str).then(res => {
        if (res.code !== 0) return;
        this.$message.success("修改成功！");
        sessionStorage.setItem("teacherName", this.form.teacherName);
        this.$store.dispatch("setTeacherName", this.form.teacherName);
        this.hideEditInfo();
      });
    },
    // 获取老师信息
    getTeacherInfo() {
      this.api.getTeacherInfo().then(res => {
        console.log(res);
        if (res.code !== 0) return;
        this.form.teacherName = res.data.teacherName;
      });
    }
  }
};
</script>