<template>
  <div class="my_page" v-if="layerpageinfo.total > layerpageinfo.pageSize">
    <div class="page m">
      <el-pagination
        background
        :current-page="layerpageinfo.pageNum"
        layout="prev, pager, next"
        :total="layerpageinfo.total"
        :page-size="layerpageinfo.pageSize"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "my_page",
  props: {
    layerpageinfo: {
      //分页
      type: Object
    }
  },
  methods: {
    handleCurrentChange(val) {
      this.layerpageinfo.pageNum = val;
      this.$emit("pageChange", val);
    }
  }
};
</script>

<style lang="scss">
.my_page {
  //分页
  .page {
    padding: 30px 0 50px 0;
    text-align: center;

    .el-pager .number,
    .btn-prev,
    .btn-next {
      background-color: #fff;
      border: 1px solid rgba(226, 226, 226, 1);
      color: #999;
    }
    .el-pagination.is-background .el-pager li:not(.disabled).active {
      background: #333;
    }
  }
}
</style>
