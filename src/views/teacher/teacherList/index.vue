<template>
  <div class="teacherList">
    <div class="title">教师列表</div>
    <div class="content">
      <el-table :data="teacher_list" border stripe>
        <el-table-column align="center" prop="teacherName" label="教师姓名"></el-table-column>
        <el-table-column align="center" prop="createTime" label="注册时间"></el-table-column>
        <el-table-column align="center" label="拥有课程数量">
          <template slot-scope="scope">{{scope.row.list?scope.row.list.length:0}}</template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="showDetail(scope.row.teacherId)">查看详情</el-button>
            <el-button
              type="text"
              style="color:#f56c6c"
              @click="deleteTeacher(scope.row.teacherId)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <myPage :layerpageinfo="layerpageinfo" @pageChange="pageChange"></myPage>
    </div>
  </div>
</template>
<script>
import myPage from "@/components/myPage.vue";
import XLSX from "xlsx";
export default {
  components: {
    myPage
  },
  data() {
    return {
      layerpageinfo: {
        pageSize: 6,
        pageNum: 1,
        total: 0
      },
      teacher_list: []
    };
  },
  created() {
    this.getTeacherList();
  },
  methods: {
    pageChange(val) {
      this.layerpageinfo.pageNum = val;
      this.getTeacherList();
    },
    // 删除老师
    deleteTeacher(id) {
      this.$confirm("你确定要删除此老师吗？", "提示", {
        type: "warning"
      })
        .then(() => {
          let obj = {
            teacherId: id
          };
          let str = JSON.stringify(obj);
          this.api.delTeacher(str).then(res => {
            console.log(res);
            if (res.code !== 0) return;
            this.$message.success("已删除此老师!");
            this.getTeacherList();
          });
        })
        .catch(() => {
          return;
        });
    },
    // 获取老师列表
    getTeacherList() {
      let str = JSON.stringify(this.layerpageinfo);
      this.api.getAllTeacher(str).then(res => {
        console.log(res);
        if (res.code !== 0) return;
        let list = res.data || [];
        this.teacher_list = list;
        this.layerpageinfo.total = res.totalSize;
      });
    },
    // 查看老师详情
    showDetail(id) {
      //   console.log(id);
      this.$router.push({
        name: "teacher_detail",
        query: {
          id
        }
      });
    }
  }
};
</script>