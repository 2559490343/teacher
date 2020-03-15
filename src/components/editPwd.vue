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
        <el-form ref="form" label-width="80px">
          <el-form-item label="绑定邮箱:">
            <el-input v-model="teacherEmail" disabled class="input_width"></el-input>
          </el-form-item>
          <el-form-item label="验证码:" class="sendCode">
            <el-input v-model="form.teacherCode" class="input_width"></el-input>
            <span @click="sendCode" class="send_btn" v-if="send_flag">发送验证码</span>
            <span class="send_btn wait" v-else>{{countdown}}s后再次发送</span>
          </el-form-item>
          <el-form-item label="新密码:">
            <el-input v-model="form.teacherPassword" class="input_width"></el-input>
          </el-form-item>
          <el-form-item label="确认密码:">
            <el-input v-model="confirm" class="input_width"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer">
        <el-button @click="hideEditPwd">取 消</el-button>
        <el-button type="primary" @click="editPwd">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import md5 from "js-md5";
export default {
  data() {
    return {
      form: {},
      confirm: "",
      teacherEmail: "",
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
    //   隐藏
    hideEditPwd() {
      this.$store.dispatch("setEditPwd", false);
    },
    // 提交修改密码
    editPwd() {
      this.form.teacherPassword = md5(this.form.teacherPassword);
      let obj = Object.assign({}, this.form);
      let str = JSON.stringify(obj);
      this.api.editPwd(str).then(res => {
        if (res.code !== 0) return;
        this.$message.success("修改密码成功！");
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