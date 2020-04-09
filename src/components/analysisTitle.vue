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
      <div
        id="chart"
        v-show="titleInfo.type=='选择题'||titleInfo.type=='判断题'"
        style="width: 100%;height:300px;margin-top:10px"
      ></div>
    </div>
  </div>
</template>
<script>
import echarts from "echarts";

export default {
  data() {
    return {
      type_flag: true
    };
  },
  props: {
    titleInfo: Object
  },
  mounted() {
    this.initChart();
  },
  methods: {
    initChart() {
      if (this.titleInfo.type == "简答题" || this.titleInfo.type == "填空题") {
        return;
      }
      var myChart = echarts.init(document.getElementById("chart"));
      var option = {};
      let data = [];
      switch (this.titleInfo.type) {
        case "选择题":
          data = this.titleInfo.answer_list.map(item => item.count);
          option = {
            title: {
              text: "选项分析"
            },
            tooltip: {},
            legend: {
              data: ["选择此项的人数"]
            },
            xAxis: {
              data: ["A", "B", "C", "D"]
            },
            yAxis: {},
            series: [
              {
                name: "选择此项的人数",
                type: "bar",
                data: data
              }
            ]
          };
          break;
        case "判断题":
          data = this.titleInfo.answer_list.map(item => {
            return { value: item.count, name: item.option };
          });
          option = {
            backgroundColor: "#2c343c",
            title: {
              text: "对错分析",
              left: "center",
              top: 20,
              textStyle: {
                color: "#ccc"
              }
            },

            tooltip: {
              trigger: "item",
              formatter: "{a} <br/>{b} : {c} ({d}%)"
            },

            visualMap: {
              show: false,
              min: 0,
              max: 60,
              inRange: {
                colorLightness: [0, 1]
              }
            },
            series: [
              {
                name: "选择",
                type: "pie",
                radius: "55%",
                center: ["50%", "50%"],
                data: data.sort(function(a, b) {
                  return a.value - b.value;
                }),
                roseType: "radius",
                label: {
                  color: "rgba(255, 255, 255, 0.3)"
                },
                labelLine: {
                  lineStyle: {
                    color: "rgba(255, 255, 255, 0.3)"
                  },
                  smooth: 0.2,
                  length: 10,
                  length2: 20
                },
                itemStyle: {
                  color: "#c23531",
                  shadowBlur: 200,
                  shadowColor: "rgba(0, 0, 0, 0.5)"
                },

                animationType: "scale",
                animationEasing: "elasticOut",
                animationDelay: function(idx) {
                  return Math.random() * 200;
                }
              }
            ]
          };
          break;
        default:
          break;
      }
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    }
  }
};
</script>
