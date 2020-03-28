<template>
  <div class="analysis">
    <h1 style="margin-bottom:20px">{{titleInfo.title}} [{{titleInfo.type}}]</h1>
    <div class="analysis_box">
      <template v-if="titleInfo.type=='选择题'">
        <el-table :data="titleInfo.answer_list" border stripe>
          <el-table-column align="center" label="选项" prop="option"></el-table-column>
          <el-table-column align="center" label="数量" prop="count"></el-table-column>
          <el-table-column align="center" label="比例" prop="rate"></el-table-column>
        </el-table>
      </template>
      <template v-if="titleInfo.type=='判断题'">
        <el-table :data="titleInfo.answer_list" border stripe>
          <el-table-column align="center" label="选项" prop="option"></el-table-column>
          <el-table-column align="center" label="数量" prop="count"></el-table-column>
          <el-table-column align="center" label="比例" prop="rate"></el-table-column>
        </el-table>
      </template>
      <template v-if="titleInfo.type=='填空题'||titleInfo.type=='简答题'">
       <el-table :data="titleInfo.answer_list" border stripe>
          <el-table-column align="center" label="学号" prop="studentNum"></el-table-column>
          <el-table-column align="center" label="姓名" prop="studentName"></el-table-column>
          <el-table-column align="center" label="答案" prop="titleAnswer"></el-table-column>
        </el-table>
      </template>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: {
    titleInfo: Object
  },
  created() {
    console.log(this.titleInfo);
    
  },
  methods: {}
};
</script>
