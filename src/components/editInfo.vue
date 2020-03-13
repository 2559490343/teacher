<template>
  <div>
    <el-dialog
      title="修改个人信息"
      :visible.sync="show"
      width="500px"
      @open="getTeacherInfo"
      :close-on-click-modal="false"
      @close="hideEditInfo"
    >
      <div class="change">
        <el-form ref="form" label-width="80px">
          <el-form-item label="姓名:">
            <el-input v-model="teacherInfo.teacherName" class="input_width"></el-input>
          </el-form-item>
          <el-form-item label="绑定邮箱:"></el-form-item>
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
      teacherInfo: {}
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
    editInfo() {},
    // 获取老师信息
    getTeacherInfo(){}
  }
};
</script>