<template>
  <div id="StackedLineChart"></div>
</template>

<script>
import * as echarts from "echarts";
import Utils from "../../utils";
export default {
  name: "StackedLineChart",
  inject:['selectStu','class_term'],
  watch:{
    selectStu(new_selectStu,old_selectStu){
      if(new_selectStu.length>old_selectStu.length){
        this.drawStackedLineChart(new_selectStu,false);
      }else{
        this.drawStackedLineChart(new_selectStu,true);
      }
    }
  },
  methods: {
   async drawStackedLineChart(new_selectStu,destroy) {
      if(destroy){
        echarts.init(document.getElementById('StackedLineChart')).dispose();
      }
      const res=await fetch(Utils.dataUrl+'/getStackedLineChart',{
          method: "post",
          headers: { "content-type": "application/json" },
          body:JSON.stringify({stuIdArr:new_selectStu||[],class_term:this.class_term||[]})
      }).then((res)=>{
        return res.json();
      })
      let stu_name_arr=[];
      let exam_name_arr=[];
      let series_data=[];
      //stu_name_arr
      if(Array.isArray(res.data)){
        exam_name_arr=res.data[0]['exam_name']||[];
        res.data.forEach(el => {
            stu_name_arr.push(el['stu_name']);
            series_data.push({name:el['stu_name'] ,stack:"Numbers",type: "line",data: el['mes_Score']})
        });
      }
      const chartDom = document.getElementById("StackedLineChart");
      const myChart = echarts.init(chartDom);
      const option = {
        title: {
          text: "近期考试成绩走势图",
          top: 27,
          left: "35%",
          textStyle: {
            fontSize: 16,
          },
        },
        tooltip: {
          trigger: "axis",
        },
        dataZoom: [
            {
              show: true,
              start: 0,
              end: 100,
            },
            {
              type: "inside",
              start: 94,
              end: 100,
            },
            // {
            //   show: true,
            //   yAxisIndex: 0,
            //   filterMode: "empty",
            //   width: 30,
            //   height: "80%",
            //   showDataShadow: false,
            //   left: "93%",
            // },
          ],
        legend: {
          data: stu_name_arr,
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: exam_name_arr,
        },
        yAxis: {
          type: "value",
        },
        series:series_data,
      };
      option && myChart.setOption(option);
      window.addEventListener("resize", myChart.resize);
    },
  },
  mounted() {
    this.drawStackedLineChart([],false);
  },
};
</script>

<style>
#StackedLineChart {
  width: 100%;
  height: 100%;
}
</style>
