<template>
  <div>
    <el-dialog
      title="修改密码"
      :visible.sync="show"
      width="30%"
      :close-on-click-modal="false"
      @close="hideEditPwd"
    >
      <div class="change">
        <el-form ref="form" :rules="rules" :model="form" label-width="90px">
          <el-form-item label="绑定邮箱:">
            <el-input v-model="teacherEmail" disabled class="input_width"></el-input>
          </el-form-item>
          <el-form-item label="验证码:" class="sendCode" prop="teacherCode">
            <el-input v-model="form.teacherCode" class="input_width"></el-input>
            <span @click="sendCode" class="send_btn" v-if="send_flag">发送验证码</span>
            <span class="send_btn wait" v-else>{{countdown}}s后再次发送</span>
          </el-form-item>
          <el-form-item label="新密码:" prop="teacherPassword">
            <el-input v-model="form.teacherPassword" show-password class="input_width"></el-input>
          </el-form-item>
          <el-form-item label="确认密码:" prop="confirm">
            <el-input v-model="form.confirm" show-password class="input_width"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer">
        <el-button @click="hideEditPwd">取 消</el-button>
        <el-button type="primary" @click="submitForm('form')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import md5 from "js-md5";
export default {
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.teacherPassword) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      form: {},
      teacherEmail: "",
      rules: {
        teacherPassword: [
          { required: true, message: "请输入密码", trigger: "blur" }
        ],
        confirm: [
          {
            required: true,
            message: "请再次输入密码",
            trigger: "blur"
          },
          {
            validator: validatePass2,
            trigger: "blur"
          }
        ],
        teacherCode: [
          { required: true, message: "请输入验证码", trigger: "blur" }
        ]
      },
      countdown: 59, //验证码发送倒计时
      send_flag: true //验证码发送按钮切换flag
    };
  },
  props: {
    show: false
  },
  created() {
    this.teacherEmail = sessionStorage.getItem("teacherEmail");
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.editPwd();
        } else {
          return false;
        }
      });
    },
    //   隐藏
    hideEditPwd() {
      this.$store.dispatch("setEditPwd", false);
    },
    // 提交修改密码
    editPwd() {
      let obj = Object.assign({}, this.form, {
        teacherPassword: md5(this.form.teacherPassword)
      });
      let str = JSON.stringify(obj);
      this.api.editPwd(str).then(res => {
        if (res.code !== 0) return;
        this.$message.success("修改密码成功！");
        this.hideEditPwd();
      });
    },
    // 发送验证码
    sendCode() {
      let obj = {
        teacherEmail: this.teacherEmail
      };
      let str = JSON.stringify(obj);
      this.api.sendCode(str).then(res => {
        console.log(res);
        if (res.code !== 0) return;
        this.$message.success("验证码已发送！");
        this.send_flag = false;
        let timer = setInterval(() => {
          if (this.countdown > 0) {
            this.countdown--;
          } else {
            this.send_flag = true;
            clearInterval(timer);
          }
        }, 1000);
      });
    }
  }
};
</script>
<style lang="scss">
.sendCode {
  position: relative;
  .send_btn {
    position: absolute;
    display: block;
    top: 11px;
    right: 50px;
    font-size: 12px;
    color: #ff733c;
    line-height: 12px;
    cursor: pointer;
  }
}
</style>