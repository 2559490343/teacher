<template>
  <div class="signList">
    <div class="title">
      <el-button type="primary" @click="showAddSign" style="margin-left:10px">发起签到</el-button>
    </div>
    <div class="content">
      <el-table border :data="sign_list" class="my_table" style="width: 100%">
        <el-table-column align="center" prop="signTitle" label="主题"></el-table-column>
        <el-table-column align="center" prop="createTime" label="发起时间"></el-table-column>
        <el-table-column align="center" prop="truancyTime" label="持续时长">
          <template slot-scope="scope">{{scope.row.truancyTime/60 + '分钟'}}</template>
        </el-table-column>
        <el-table-column align="center" prop="code" label="签到验证码">
          <template slot-scope="scope">{{scope.row.code?scope.row.code:'-'}}</template>
        </el-table-column>
        <el-table-column align="center" prop="status" label="状态">
          <template slot-scope="scope">{{scope.row.code?'进行中':'已过期'}}</template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <!-- <template slot-scope="scope">
            <el-button type="text">查看详情</el-button>
            <el-button type="text" v-if="!scope.row.status">发布</el-button>
            <el-button type="text" v-else>下线</el-button>
          </template>-->
          <template slot-scope="scope">
            <el-button type="text" @click="toSignDetail(scope.row.signId)">查看详情</el-button>
            <el-button type="text" @click="deleteSign(scope.row.signId)" style="color:#f56c6c">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 签到发起表单 -->
    <el-dialog
      title="发起签到"
      :visible.sync="dialogVisible"
      width="430px"
      @close="dialogVisible = false"
    >
      <div class="form">
        <el-form :model="form" ref="form" :rules="rules" label-width="80px">
          <el-form-item label="主题" prop="title">
            <el-input v-model="form.title" maxlength="30" show-word-limit></el-input>
          </el-form-item>
          <el-form-item label="持续时长" prop="truancyTime">
            <el-input v-model.number="form.truancyTime">
              <template slot="append">分钟</template>
            </el-input>
          </el-form-item>
          <el-form-item label="迟到时长" prop="lateTime">
            <el-input v-model.number="form.lateTime">
              <template slot="append">分钟</template>
            </el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit('form')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      sign_list: [],
      dialogVisible: false,
      form: {
        title: "",
        truancyTime: null,
        lateTime: null
      },
      rules: {
        title: [{ required: true, message: "请输入签到主题", trigger: "blur" }],
        lateTime: [
          { required: true, message: "请输入迟到时间", trigger: "blur" },
          { type: "number", message: "时长为数字值" }
        ],
        truancyTime: [
          { required: true, message: "请输入签到持续时长", trigger: "blur" },
          { type: "number", message: "时长为数字值" }
        ]
      }
    };
  },
  computed: {
    courseId() {
      return this.$store.state.courseId;
    }
  },
  created() {
    this.getSignList();
  },
  methods: {
    // 删除签到
    deleteSign(signId) {
      this.$confirm("确定要删除此次签到吗？", "提示", {
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
    //显示发起签到
    showAddSign() {
      this.dialogVisible = true;
    },
    // 跳转签到详情
    toSignDetail(signId) {
      this.$router.push({ name: "signDetail", query: { signId } });
    },
    // 发起签到
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let now = new Date();
          let createTime = this.common.formatDateTime(now);
          let truancyTime = this.form.truancyTime * 60;
          let lateTime = new Date(
            // 转化的时间会和北京时间差8小时所以要加上去
            now.getTime() + 8 * 60 * 60 * 1000 + this.form.lateTime * 60 * 1000
          );
          let signTitle = this.form.title;
          let courseId = this.courseId;
          let obj = {
            createTime,
            truancyTime,
            lateTime,
            signTitle,
            courseId
          };
          console.log(obj);
          let str = JSON.stringify(obj);
          this.api.addSign(str).then(res => {
            console.log(res);
            if (res.code !== 0) return;
            this.$message("发起签到成功");
            this.getSignList();
            this.dialogVisible = false;
            this.form.title = "";
            this.form.truancyTime = null;
            this.form.lateTime = null;
          });
        } else {
          return false;
        }
      });
    },
    // 获取签到列表
    getSignList() {
      let obj = {
        openId: "2",
        sign: {
          courseId: this.courseId
        }
      };
      let str = JSON.stringify(obj);
      this.api.getSignList(str).then(res => {
        console.log(res);
        if (res.code !== 0) return;
        let list = res.data;
        list = list.map(item => {
          return item.sign;
        });
        this.sign_list = list ? list : [];
      });
    }
  }
};
</script>
<style lang="scss">
.signList {
  .el-dialog__wrapper {
    input {
      // width: 250px;
    }
  }
}
</style>