<template>
    <el-select v-model="stuRef" class="m-2 select" placeholder="Select" @change="stuSelectChange">
    <el-option
      v-for="item in stu_options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </el-select>
  <el-select v-model="sub_examRef" class="m-2 select" placeholder="Select" @change="drawKChart">
    <el-option
      v-for="item in sub_exam_options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </el-select>
  <div id="kChart"></div>
</template>

<script>
import { ref } from "vue";
import * as echarts from "echarts";
import Utils from "../../utils";

const stuRef=ref('');
const sub_examRef=ref('');
export default {
  name: "KChart",
  inject: ["selectStu","stuInfoArr"],
  watch: {
  async  selectStu(new_selectStu, old_selectStu) {
      /*设置学生options*/
      const selectStu=[];
      if(Array.isArray(this.stuInfoArr)&&Array.isArray(this.selectStu)){
        this.selectStu.forEach(el => {
            this.stuInfoArr.forEach((it)=>{
              if(el==it['stu_id']){
                selectStu.push({value:it['stu_id'],label:it['stu_name']});
              }
            })
        });
      }
      this.$data.stu_options=selectStu;
    },
  },
  data(){
    let stu_options=[];
    let sub_exam_options=[];
    let kData={}
    return {
      stu_options,
      sub_exam_options,
      stuRef,
      sub_examRef,
      kData
    }
  },
  methods: {
    drawKChart() {
      echarts.init(document.getElementById("kChart")).dispose();
      const chartDom = document.getElementById("kChart");
      const myChart = echarts.init(chartDom);
      const sub_exam_name=sub_examRef.value;
      let xData=[]
      let data=[]
      try{
        xData=this.kData['sub_exam'][sub_exam_name]['exam_name_arr']||[];
        const tmpData=this.kData['sub_exam'][sub_exam_name]['exam_score']||[];
        for (let i = 0; i < tmpData.length; i++) {
            if(i==0){
                data.push([0,tmpData[i],Math.min(...tmpData)+i*2,Math.max(...tmpData)-i*2]);              
            }else{
                data.push([tmpData[i-1],tmpData[i],Math.min(...tmpData)+i*2,Math.max(...tmpData)-i*2])
            }
        }
      }catch(err){}
      const option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            animation: false,
            type: "cross",
            lineStyle: {
              color: "#376df4",
              width: 2,
              opacity: 1,
            },
          },
        },
        xAxis: {
          type: "category",
          data: xData,
          axisLine: { lineStyle: { color: "#8392A5" } },
        },
        yAxis: {
          scale: true,
          axisLine: { lineStyle: { color: "#8392A5" } },
          splitLine: { show: false },
        },
        dataZoom: [
          {
            textStyle: {
              color: "#8392A5",
            },
            handleIcon:
              "path://M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z",
            dataBackground: {
              areaStyle: {
                color: "#8392A5",
              },
              lineStyle: {
                opacity: 0.8,
                color: "#8392A5",
              },
            },
            brushSelect: true,
          },
          {
            type: "inside",
          },
        ],
        series: [
          {
            type: "candlestick",
            data: data,
          },
        ],
      };
      option && myChart.setOption(option);
    },
    async stuSelectChange(){
      this.sub_exam_options=[];
      this.sub_examRef='';
      const sub_exam_obj=await fetch(`${Utils.dataUrl}/getKChart`,{
        method:'post',
        headers:{ "content-type": "application/json" },
        body:JSON.stringify({stuIdArr:[stuRef.value]})
      }).then(res=>{
        return res.json();
      })
      const sub_exam_options=[];
      Object.keys(sub_exam_obj.data[0]['sub_exam']).forEach((it)=>{
        sub_exam_options.push({value:it,label:it});
      })
      this.sub_exam_options=sub_exam_options;
      this.kData=sub_exam_obj.data[0];
    },
  },
  mounted() {
    this.drawKChart();
  },
};
</script>

<style scoped>
.select{
  height: 5%;
}
#kChart {
  width: 100%;
  height: 90%;
  overflow: hidden;
}
</style>
