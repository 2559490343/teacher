<template>
  <div class="login">
    <div class="left-logo">
      <img src="@/assets/img/logo1.jpg" alt />
      <p>课堂辅助系统</p>
    </div>

    <div class="right_box">
      <div class="tit">用户登录</div>
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
            @keyup.enter.native="submitForm('ruleForm')"
          ></el-input>
        </el-form-item>

        <el-button type="primary" class="login-btn" @click="submitForm('ruleForm')">登录</el-button>
      </el-form>
      <p class="toRegister">
        还没有账号？
        <router-link to="/register">去注册</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import md5 from "js-md5";
export default {
  name: "login",
  data() {
    return {
      loginKey: null,
      loading: false,
      params: {
        teacherEmail: null,
        teacherPassword: null
      },
      redirect: "",
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
        ]
      }
    };
  },
  beforeRouteEnter(to, from, next) {
    // ...
    if (sessionStorage.getItem("token")) {
      next("/course");
    } else {
      next();
    }
  },
  created() {
    this.params.teacherEmail = sessionStorage.getItem("username") || null;
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.handleLogin();
        } else {
          return false;
        }
      });
    },
    handleLogin() {
      let obj = {
        teacherEmail: this.params.teacherEmail,
        teacherPassword: md5(this.params.teacherPassword)
      };
      let str = JSON.stringify(obj);
      this.api.login(str).then(res => {
        // console.log(res);
        if (res.code !== 0) return;
        sessionStorage.setItem("teacherName", res.data.teacherName);
        sessionStorage.setItem("teacherEmail", this.params.teacherEmail);
        sessionStorage.setItem("role", res.data.role);
        this.$store.dispatch("setTeacherName", res.data.teacherName);
        this.$message.success("登录成功！");
        // 判断用户权限
        let len = this.$router.options.routes[0].children.length;
        if (res.data.role != "admin") {
          this.$router.options.routes[0].children[len - 1].meta.hidden = true;
        } else {
          this.$router.options.routes[0].children[len - 1].meta.hidden = false;
        }
        this.$router.replace("/course");
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
  background: url("../../assets/img/login_bg.jpg") no-repeat;
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

  .right_box {
    width: 400px;
    height: 378px;
    background-color: #fff;
    overflow: hidden;
    .tit {
      font-size: 22px;
      color: #666666;
      font-weight: bold;
      text-align: center;
      margin: 40px 0 50px 0;
    }

    .el-form {
      padding: 0 32px;
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
      margin-top: 22px;
      background-color: #ff733c;
      border-color: #ff733c;
    }
    .login-btn:hover {
      background-color: #ffa56c;
    }
    .toRegister {
      text-align: right;
      font-size: 12px;
      color: #aeb4c8;
      line-height: 60px;
      margin-right: 30px;
      a {
        color: #ff733c;
      }
    }
  }
}
</style>
