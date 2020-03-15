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
        <el-form ref="form" label-width="80px">
          <el-form-item label="姓名:">
            <el-input v-model="teacherName" class="input_width"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer">
        <el-button @click="hideEditInfo">取 消</el-button>
        <el-button type="primary" @click="editInfo">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      teacherName: ""
    };
  },
  props: {
    show: false
  },
  created() {},
  methods: {
    //   隐藏切换课程
    hideEditInfo() {
      this.$store.dispatch("setEditInfo", false);
    },
    // 提交修改个人信息
    editInfo() {
      let obj = {
        teacherName: this.teacherName
      };
      let str = JSON.stringify(obj);
      this.api.editName(str).then(res => {
        if (res.code !== 0) return;
        this.$message.success("修改成功！");
        sessionStorage.setItem("teacherName", this.teacherName);
        this.$store.dispatch("setTeacherName", this.teacherName);
        this.hideEditInfo();
      });
    },
    // 获取老师信息
    getTeacherInfo() {
      this.api.getTeacherInfo().then(res => {
        console.log(res);
        if (res.code !== 0) return;
        this.teacherName = res.data.teacherName;
      });
    }
  }
};
</script>