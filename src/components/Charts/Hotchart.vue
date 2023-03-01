<template>
  <div id="HotChart"></div>
</template>

<script>
import * as echarts from "echarts";
import Utils from "../../utils";
export default {
  name: "HotChart",
  inject: ["selectStu", "class_term"],
  watch: {
    async selectStu(new_selectStu) {
      if(new_selectStu&&new_selectStu.length==0){
        this.mountChart([],[]);
        return;
      }
      const res = await fetch(`${Utils.dataUrl}/getHotChart`, {
        method: "post",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          class_term: this.class_term,
          stuIdArr: new_selectStu,
        }),
      }).then((res) => {
        return res.json();
      });
      const { stuNameArr = [], dataArr = [] } = this.handelData(res.data);
      this.mountChart(stuNameArr,dataArr);
    },
  },
  data() {
    let stuNameArr = [];
    let dataArr = [];
    return {
      stuNameArr,
      dataArr
    };
  },
  methods: {
    handelData(data) {
      let stuNameArr = [];
      let dataArr = [];
      if (!Array.isArray(data)) {
        return {};
      }
      data.forEach((el) => {
        stuNameArr.push(el["stu_name"]);
        dataArr.push(...el["posArr"]);
      });
      return { stuNameArr, dataArr };
    },
    chartRender() {
      this.chartDom.setOption();
    },
    mountChart(stuNameArr, dataArr) {
      echarts.init(document.getElementById('HotChart')).dispose();
      const chartDom = document.getElementById("HotChart");
      const myChart = echarts.init(chartDom);
      // prettier-ignore
      const hours = [
    '1月', '2月', '3月', '4月', '5月', '6月', '7月',
    '8月', '9月', '10月', '11月', '12月'];
      // prettier-ignore
    dataArr = dataArr.map(function (item) {
    return [item[0], item[1], item[2] || '-'];
});
      const option = {
        tooltip: {
          position: "top",
        },
        grid: {
          height: "50%",
          top: "10%",
        },
        xAxis: {
          type: "category",
          data: hours,
          splitArea: {
            show: true,
          },
        },
        yAxis: {
          type: "category",
          data: stuNameArr,
          splitArea: {
            show: true,
          },
        },
        visualMap: {
          min: 0,
          max: 10,
          calculable: true,
          orient: "horizontal",
          left: "center",
          bottom: "15%",
        },
        series: [
          {
            name: "勤奋度热力图",
            type: "heatmap",
            data: dataArr,
            label: {
              show: true,
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };
      option && myChart.setOption(option);

      window.addEventListener('resize',myChart.resize);
    },
  },
  mounted() {
    this.mountChart([], []);
  },
};
</script>

<style>
#HotChart {
  width: 100%;
  height: 100%;
}
</style>
