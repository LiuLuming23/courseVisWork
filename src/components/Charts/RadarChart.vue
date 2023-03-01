<template>
  <div id="RadarChart"></div>
</template>

<script>
import * as echarts from "echarts";
import Utils from "../../utils.js"
export default {
  name: "RadarChart",
  inject: ["selectStu", "class_term"],
  watch: {
    selectStu(new_selectStu,old_selectStu) {
      if(new_selectStu.length>old_selectStu.length){
        this.renderChart(new_selectStu,false);
      }else{
        this.renderChart(new_selectStu,true);
      }
    },
  },
  methods: {
   async renderChart(new_selectStu,destroy) {
      if(destroy){
        echarts.init(document.getElementById('RadarChart')).dispose();
      }
      const res=await fetch(Utils.dataUrl+'/getRadarChart',{
          method: "post",
          headers: { "content-type": "application/json" },
          body:JSON.stringify({stuIdArr:new_selectStu||[],class_term:this.class_term||[]})
      }).then((res)=>{
        return res.json();
      })
      const stuArr=[];
      const dataArr=[];
      if(Array.isArray(res.data)){
        res.data.forEach(el => {
          stuArr.push(el['stu_name']);
          dataArr.push({name:el['stu_name'],value:[el['scoreAvg'],el['kqAvg'],10-el['consumeAvg']]})
        });
      }

      const chartDom = document.getElementById("RadarChart");
      const myChart = echarts.init(chartDom);
      const option = {
        title: {
          text: "",
        },
        color: ["#67F9D8", "#FFE434", "#56A3F1", "#FF917C"],
        legend: {
          data: stuArr,
        },
        radar: {
          indicator: [
            { text: "考勤表现" },
            { text: "学习表现" },
            { text: "消费习惯" },
          ],
          center: ["50%", "50%"],
          // radius: 120,
          startAngle: 30,
          // splitNumber: 4,
          shape: "circle",
          axisName: {
            formatter: "{value}",
            color: "#428BD4",
          },
          splitArea: {
            areaStyle: {
              color: [ "#26C3BE", "#64AFE9", "#428BD4"],
              shadowColor: "rgba(0, 0, 0, 0.3)",
              shadowBlur: 10,
            },
          },
          axisLine: {
            lineStyle: {
              color: "rgba(211, 253, 250, 0.8)",
            },
          },
          splitLine: {
            lineStyle: {
              color: "rgba(211, 253, 250, 0.8)",
            },
          },
        },
        series: [
          {
            type: "radar",
            emphasis: {
              lineStyle: {
                width: 4,
              },
            },
            data: dataArr
          },
        ],
      };
      option && myChart.setOption(option);
      window.addEventListener("resize", myChart.resize);
    },
  },
  mounted() {
    this.renderChart([],false);
  },
};
</script>

<style>
#RadarChart {
  width: 100%;
  height: 100%;
}
</style>
