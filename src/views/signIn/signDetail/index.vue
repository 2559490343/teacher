<template>
  <div class="signDetail">
    <el-page-header @back="goBack" content="签到详情"></el-page-header>
    <div class="content">
      <div class="base_info">
        <h1>基本信息</h1>
        <p>
          <span class="left">签到主题:</span>
          <span>{{sign_info.signTitle}}</span>
        </p>
        <p>
          <span class="left">发起时间:</span>
          <span>{{sign_info.createTime}}</span>
        </p>
        <p>
          <span class="left">持续时长:</span>
          <span>{{sign_info.truancyTime?sign_info.truancyTime/60+'分钟':''}}</span>
        </p>
        <p>
          <span class="left">签到验证码:</span>
          <span>{{sign_info.code||'-'}}</span>
        </p>
        <p>
          <span class="left">状态:</span>
          <span>{{sign_info.code?"进行中":'已过期'}}</span>
        </p>
        <p>
          <span class="left">签到人数:</span>
          <span>{{sign_counts}}人</span>
        </p>
      </div>

      <div class="signin_list_info">
        <h1>签到人员列表</h1>

        <el-table border :data="signin_list" class="my_table" style="width: 100%">
          <el-table-column align="center" prop="studentNum" label="学号"></el-table-column>
          <el-table-column align="center" prop="studentName" label="姓名"></el-table-column>
          <el-table-column align="center" prop="studentStatus" label="签到状态"></el-table-column>
        </el-table>
        <myPage :layerpageinfo="layerpageinfo" @pageChange="pageChange"></myPage>
      </div>
    </div>
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
      sign_info: {},
      signin_list: [], //签到人员列表
      signId: "",
      sign_counts: 0,
      layerpageinfo: {
        pageSize: 5,
        pageNum: 1,
        total: 0
      }
    };
  },
  computed: {
    courseId() {
      return this.$store.state.courseId;
    }
  },
  created() {
    this.signId = this.$route.query.signId;
    this.getSignDetail(true);
  },
  methods: {
    pageChange(val) {
      this.layerpageinfo.pageNum = val;
      this.getSignDetail(false);
    },
    goBack() {
      this.$router.push({ name: "signList" });
    },
    // 查看签到详情
    getSignDetail(flag) {
      let obj = {
        courseId: this.courseId,
        signId: this.signId
      };
      obj = Object.assign({}, obj, this.layerpageinfo);
      let str = JSON.stringify(obj);
      this.api.getSignDetail(str).then(res => {
        console.log(res);
        if (res.code !== 0) return;
        let list = res.data;
        this.signin_list = list ? list : [];
        this.layerpageinfo.total = res.totalSize;
        this.sign_info = list ? list[0].sign : {};
        this.sign_counts = list ? list[0].cid : 0;
      });
    }
  }
};
</script>
<style lang="scss">
.signDetail {
  .content {
    padding-top: 5px;
    h1 {
      font-size: 20px;
      font-weight: 600;
      line-height: 60px;
    }

    .base_info {
      border-bottom: 1px solid rgba(236, 240, 245, 1);
      padding-bottom: 20px;
      .left {
        color: #999;
      }
      span {
        font-size: 14px;
        text-align: left;
        margin-right: 5px;
        color: #333;
      }
      p {
        line-height: 34px;
      }
    }
  }
}
</style>