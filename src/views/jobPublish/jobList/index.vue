<template>
  <div class="jobList">
    <div class="title">
      <label>
        类型：
        <el-select v-model="job_type" placeholder="请选择作业类型" @change="getHomeWorkList">
          <el-option label="课后作业" value="0"></el-option>
          <el-option label="课堂测试" value="1"></el-option>
        </el-select>
      </label>
      <el-button type="primary" @click="toAddJob">添加作业</el-button>
    </div>
    <div class="content">
      <el-table border :data="job_list" class="my_table" style="width: 100%">
        <el-table-column align="center" prop="homeworkTitle" label="主题"></el-table-column>
        <el-table-column align="center" prop="homeworkCount" label="题目数量"></el-table-column>
        <!-- <el-table-column align="center" prop="counts" label="选课人数"></el-table-column> -->
        <el-table-column align="center" label="上线状态">
          <template slot-scope="scope">{{scope.row.homeworkStatus?scope.row.homeworkStatus:'未发布'}}</template>
        </el-table-column>
        <el-table-column align="center" label="过期时间">
          <template
            slot-scope="scope"
          >{{scope.row.homeworkStatus=='进行中'?common.formatDateTime(new Date(scope.row.lastTime)):'-'}}</template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="toDetail(scope.row.homeworkId)">查看详情</el-button>
            <el-button
              type="text"
              v-if="!scope.row.homeworkStatus"
              @click="showDialog(scope.row.homeworkId,'发布中')"
            >发布</el-button>
            <el-button
              type="text"
              v-if="scope.row.homeworkStatus=='进行中'"
              @click="changeStatus({homeworkId:scope.row.homeworkId,homeworkStatus:'已过期',lastTime:-1})"
            >下线</el-button>
            <el-button
              type="text"
              @click="deleteHomework(scope.row.homeworkId)"
              style="color:#f56c6c"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <myPage :layerpageinfo="layerpageinfo" @pageChange="pageChange"></myPage>
    </div>
    <el-dialog
      title="填写发布信息"
      :visible.sync="dialogVisible"
      width="30%"
      @close="dialogVisible = false"
    >
      <div>
        <el-form :model="form" ref="form" label-width="100px">
          <el-form-item label="持续时长：" prop="lastTime" v-if="job_type=='1'">
            <el-input v-model="form.lastTime" style="width:220px">
              <template slot="append">分钟</template>
            </el-input>
          </el-form-item>
          <el-form-item label="过期日期：" prop="overTime" v-else>
            <el-date-picker v-model="form.overTime" type="datetime" placeholder="选择日期时间"></el-date-picker>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer">
        <el-button @click=" dialogVisible= false">取 消</el-button>
        <el-button type="primary" @click="publishHomework">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import myPage from "@/components/myPage.vue";

export default {
  components: {
    myPage
  },
  data() {
    return {
      job_type: "0",
      layerpageinfo: {
        pageSize: 6,
        pageNum: 1,
        total: 0
      },
      job_list: [],
      form: {
        lastTime: null,
        overTime: null
      },
      dialogVisible: false,
      homeworkId: "",
      status: ""
    };
  },
  computed: {
    courseId() {
      return this.$store.state.courseId;
    }
  },
  created() {
    let type = this.$route.query.type;
    type && (this.job_type = type);
    this.getHomeWorkList();
  },
  methods: {
    pageChange(val) {
      this.layerpageinfo.pageNum = val;
      this.getHomeWorkList();
    },
    deleteHomework(homeworkId) {
      this.$confirm("确定要删除此作业吗？", "提示", {
        type: "warning"
      })
        .then(() => {
          let obj = { homeworkId };
          let str = JSON.stringify(obj);
          this.api.delHomework(str).then(res => {
            if (res.code !== 0) return;
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            this.getHomeWorkList();
          });
        })
        .catch(() => {
          return;
        });
    },
    toDetail(id) {
      this.$router.push({ name: "job_detail", query: { homeworkId: id } });
    },
    toAddJob() {
      this.$router.push({ name: "add_job", query: { type: this.job_type } });
    },
    // 获取作业列表
    getHomeWorkList() {
      let obj = {
        courseId: this.courseId,
        homeworkType: this.job_type == "0" ? "课后作业" : "课堂测试"
      };
      obj = Object.assign({}, obj, this.layerpageinfo);
      let str = JSON.stringify(obj);
      this.api.getHomeWorkList(str).then(res => {
        console.log(res);
        if (res.code !== 0) return;
        let list = res.data;
        this.job_list = list ? list : [];
        this.layerpageinfo.total = res.totalSize;
      });
    },
    showDialog(homeworkId, status) {
      this.dialogVisible = true;
      this.homeworkId = homeworkId;
      this.status = status;
    },
    publishHomework() {
      let lastTime;
      if (this.job_type == "0") {
        if (!this.form.overTime) return;
        lastTime = new Date(this.form.overTime).getTime();
      } else {
        if (!this.form.lastTime) return;
        lastTime = new Date().getTime() + this.form.lastTime * 60 * 1000;
      }
      let obj = {
        homeworkId: this.homeworkId,
        homeworkStatus: "进行中",
        lastTime
      };
      this.changeStatus(obj);
      this.dialogVisible = false;
    },
    // 修改作业发布状态
    changeStatus(obj) {
      let str = JSON.stringify(obj);
      this.api.changeHomeWorkStatus(str).then(res => {
        console.log(res);
        if (res.code !== 0) return;
        this.$message.success("作业状态修改成功！");
        this.getHomeWorkList();
      });
    }
  }
};
</script>
<style lang="scss">
</style>