<template>
  <div id="scatter"></div>
</template>

<script>
import * as echarts from "echarts";
import Utils from "../../utils";
export default {
  name: "Scatter",
  inject: ["selectStu", "stuInfoArr"],
  watch: {
    selectStu(new_selectStu, old_selectStu) {
      if (new_selectStu.length > old_selectStu.length) {
        this.drawScatter(new_selectStu, false);
      } else {
        this.drawScatter(new_selectStu, true);
      }
    },
  },
  methods: {
    async drawScatter(selectStu,destroy) {
      if(destroy){
        echarts.init(document.getElementById('scatter')).dispose();
      }
      const chartDom = document.getElementById("scatter");
      const myChart = echarts.init(chartDom);
      const newSelectStu=[];
      this.stuInfoArr.forEach(el => {
        newSelectStu.push(el['stu_id']);
      });
      //获取班级所有数据
      const allRes=await fetch(`${Utils.dataUrl}/getScatter`,{
        method:'post',
        headers:{ "content-type": "application/json" },
        body:JSON.stringify({class_term:this.class_term,stuIdArr:newSelectStu})
      }).then((res) => {
        return res.json();
      });
      myChart.hideLoading();
      //获取选择的数据
      const selectRes=await fetch(`${Utils.dataUrl}/getScatter`,{
        method:'post',
        headers:{ "content-type": "application/json" },
        body:JSON.stringify({class_term:this.class_term,stuIdArr:selectStu})
      }).then((res) => {
        return res.json();
      });
      const seriesData=[];
      const effectData=[];
      if(Array.isArray(allRes.data)){
        allRes.data.forEach((el)=>{
          seriesData.push([el['x'],el['y'],el['stu_name'],el['stu_id']]);
        })
      }
      if(Array.isArray(selectRes.data)){
        selectRes.data.forEach((el)=>{
          effectData.push([el['x'],el['y'],el['stu_name'],el['stu_id']])
        })
      }

      const option = {
        title: {
          left: "center",
          text:"消费情况",subtext: "",
        },
        tooltip: {
          formatter: (params)=>{
            return "姓名: "+params.data[2]+'-学号:'+params.data[3];
          }
        },
        toolbox: {
          right: 20,
          feature: {
            dataZoom: {},
          },
        },
        grid: {
          right: 70,
          bottom: 70,
        },
        xAxis: [{}],
        yAxis: [{}],
        dataZoom: [
          {
            type: "inside",
          },
          {
            type: "slider",
            showDataShadow: false,
            handleIcon:
              "path://M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z",
            handleSize: "80%",
          },
          {
            type: "inside",
            orient: "vertical",
          },
          {
            type: "slider",
            orient: "vertical",
            showDataShadow: false,
            handleIcon:
              "path://M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z",
            handleSize: "80%",
          },
        ],
        animation: false,
        series: [
          {
            type: "effectScatter",
            symbolSize: 20,
            data: effectData,
          },
          {
            type: "scatter",
            data: seriesData,
            dimensions: ["x", "y"],
            symbolSize: 10,
            itemStyle: {
              opacity: 0.8,
            },
            blendMode: "source-over",
            large: true,
            largeThreshold: 500,
          },
        ],
      };
      myChart.setOption(option);
      window.addEventListener("resize", myChart.resize);
      },
  },
  mounted() {
    this.drawScatter([],false);
  },
};
</script>

<style>
#scatter {
  width: 100%;
  height: 100%;
}
</style>
