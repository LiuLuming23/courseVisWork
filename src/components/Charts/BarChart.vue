<template>
  <div id="BarChart"></div>
</template>

<script>
import * as echarts from "echarts";
import Utils from "../../utils.js"
export default {
  name: "BarChart",
  inject:['selectStu',"class_term"],
  watch:{
     selectStu(new_selectStu,old_selectStu){
      if(new_selectStu.length>old_selectStu.length){
        this.drawBarChart(new_selectStu,false);
      }else{
        this.drawBarChart(new_selectStu,true);
      }
      }
  },
  methods:{
   async drawBarChart(selectStu,destroy){
    fetch(`${Utils.dataUrl}/getBarChart`,{
      method:'post',
      headers:{ "content-type": "application/json" },
      body:JSON.stringify({class_term:this.class_term,stuIdArr:selectStu})
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if(destroy){
          echarts.init(document.getElementById('BarChart')).dispose();
        }
        if(!Array.isArray(res.data)){
          return;
        }
        const exam_name_Data=Object.keys(res.data[0]['score_map']);
        const stu_names=[];
        const stu_data=[];
        res.data.forEach(el => {
            stu_names.push(el['stu_name']);
            stu_data.push({name:el['stu_name'],type:'bar',data:Object.values(el['score_map'])})
        });

        const chartDom = document.getElementById("BarChart");
        const myChart = echarts.init(chartDom);
        myChart.hideLoading();
        const option = {
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow",
              label: {
                show: true,
              },
            },
          },
          toolbox: {
            show: true,
            feature: {
              mark: { show: true },
              dataView: { show: true, readOnly: false },
              magicType: { show: true, type: ["line", "bar"] },
              restore: { show: true },
              saveAsImage: { show: true },
            },
          },
          calculable: true,
          legend: {
            data: stu_names,
            itemGap: 5,
          },
          grid: {
            top: "12%",
            left: "1%",
            right: "10%",
            containLabel: true,
          },
          xAxis: [
            {
              type: "category",
              data: exam_name_Data,
            },
          ],
          yAxis: [
            {
              type: "value",
              name: "成绩",
              axisLabel: {
                formatter: function (a) {
                  a = +a;
                  return isFinite(a) ? echarts.format.addCommas(+a / 1000) : "";
                },
              },
            },
          ],
          dataZoom: [
            {
              show: true,
              start: 94,
              end: 100,
            },
            {
              type: "inside",
              start: 94,
              end: 100,
            },
            {
              show: true,
              yAxisIndex: 0,
              filterMode: "empty",
              width: 30,
              height: "80%",
              showDataShadow: false,
              left: "93%",
            },
          ],
          series: stu_data
          // [
          //   {
          //     name: "Budget 2011",
          //     type: "bar",
          //     data:[90,40,60,80,70,50,70],
          //   },
          //   {
          //     name: "Budget 2012",
          //     type: "bar",
          //     data: [50,60,78,80],
          //   },
          // ],
        };
        myChart.setOption(option);
        window.addEventListener('resize',myChart.resize);
      });
    },
  },
  mounted() {
    this.drawBarChart([],false)
  }
    
};
</script>

<style>
    #BarChart{
        width: 100%;
        height: 100%;
    }
</style>
