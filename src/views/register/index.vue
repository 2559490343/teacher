<template>
  <div class="login">
    <div class="left-logo">
      <img src="@/assets/img/logo1.jpg" alt />
      <p>课堂辅助系统</p>
    </div>

    <div class="right-box">
      <div class="tit">用户注册</div>
      <el-form :model="params" :rules="rules" ref="ruleForm">
        <el-form-item prop="teacherEmail">
          <el-input placeholder="请输入邮箱" prefix-icon="el-icon-user" v-model="params.teacherEmail"></el-input>
        </el-form-item>
        <el-form-item prop="teacherPassword">
          <el-input
            placeholder="请输入密码"
            prefix-icon="el-icon-unlock"
            v-model="params.teacherPassword"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item prop="passwordConfirm">
          <el-input
            placeholder="请确认密码"
            prefix-icon="el-icon-unlock"
            v-model="params.passwordConfirm"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item class="sendCode" prop="teacherCode">
          <el-input placeholder="验证码" prefix-icon="el-icon-unlock" v-model="params.teacherCode"></el-input>
          <span @click="sendCode" class="send_btn" v-if="send_flag">发送验证码</span>
          <span class="send_btn wait" v-else>{{countdown}}s后再次发送</span>
        </el-form-item>
        <el-form-item prop="teacherName">
          <el-input placeholder="您的姓名" prefix-icon="el-icon-unlock" v-model="params.teacherName"></el-input>
        </el-form-item>
        <el-button type="primary" class="login-btn" @click="submitForm('ruleForm')">注册</el-button>
      </el-form>
      <p class="toLogin">
        已有账号？
        <router-link to="/login">去登陆</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import md5 from "js-md5";
export default {
  name: "login",
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.params.teacherPassword) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      loginKey: null,
      loading: false,
      params: {
        teacherEmail: null,
        teacherPassword: null,
        passwordConfirm: null,
        teacherCode: null,
        teacherName: null
      },
      rules: {
        teacherEmail: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
        ],
        teacherPassword: [
          { required: true, message: "请输入密码", trigger: "blur" }
        ],
        passwordConfirm: [
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
        ],
        teacherName: [
          { required: true, message: "请输入您的名字", trigger: "blur" }
        ]
      },
      redirect: "",
      countdown: 59, //验证码发送倒计时
      send_flag: true //验证码发送按钮切换flag
    };
  },
  created() {},
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.handleRegister();
        } else {
          return false;
        }
      });
    },
    handleRegister() {
      let password = md5(this.params.teacherPassword);
      let obj = Object.assign({}, this.params, { teacherPassword: password });
      let str = JSON.stringify(obj);
      this.api.register(str).then(res => {
        // console.log(res);
        if (res.code !== 0) return;
        this.$message.success("注册成功！");
        sessionStorage.setItem("username", this.params.teacherEmail);
        setTimeout(() => {
          this.$router.push("/login");
        }, 1000);
      });
    },
    // 发送验证码
    sendCode() {
      let obj = {
        teacherEmail: this.params.teacherEmail
      };
      let str = JSON.stringify(obj);
      this.api.sendCode(str).then(res => {
        // console.log(res);
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
a {
  text-decoration: none;
}
.login {
  position: absolute;
  background: url("../../assets/img/login/login_bg.jpg") no-repeat;
  /*background-size: 100%;*/
  width: 100%;
  min-height: 100vh;
  background-size: cover;

  display: flex;
  justify-content: space-around;
  align-items: center;

  //logo
  .left-logo {
    img {
      width: 64px;
      height: 64px;
    }
    p {
      position: relative;
      font-size: 28px;
      color: #fff;
      margin-top: 80px;
    }
    p:before {
      position: absolute;
      content: "";
      width: 40px;
      height: 4px;
      background-color: #ff733c;
      top: -40px;
    }
  }

  .right-box {
    width: 400px;
    height: 500px;
    background-color: #fff;
    overflow: hidden;
    .tit {
      font-size: 22px;
      color: #666666;
      font-weight: bold;
      text-align: center;
      margin: 40px 0 30px 0;
    }

    .el-form {
      padding: 0 32px;
    }
    .sendCode {
      position: relative;
      .send_btn {
        position: absolute;
        display: block;
        top: 15px;
        right: 5px;
        font-size: 12px;
        color: #ff733c;
        line-height: 12px;
        cursor: pointer;
      }
    }
    .el-input {
      height: 42px;
      box-sizing: border-box;
      input {
        height: 100%;
        padding-left: 42px;
      }
      .el-input__prefix {
        width: 42px;
        height: 42px;
        left: 0px;
      }
      .el-input__prefix i {
        display: inline-block;
        width: 100%;
        height: 100%;
        font-size: 14px;
      }
    }

    .login-btn {
      width: 100%;
      height: 42px;
      margin-top: 15px;
      background-color: #ff733c;
      border-color: #ff733c;
    }
    .login-btn:hover {
      background-color: #ffa56c;
    }
    .toLogin {
      text-align: right;
      font-size: 12px;
      color: #aeb4c8;
      line-height: 40px;
      margin-right: 30px;
      a {
        color: #ff733c;
      }
    }
  }
}
</style>
