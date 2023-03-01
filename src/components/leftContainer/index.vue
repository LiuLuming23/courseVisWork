<template>
  <div class="leftContainer">
    <div class="lineChart"><StackedLineChart/></div>
    <div class="radarChart" ><RadarChart/></div>
    <div class="barChart"><BarChart/></div>
  </div>
</template>

<script>
import StackedLineChart from "../Charts/StackedLineChart.vue"
import RadarChart from "../Charts/RadarChart.vue"
import BarChart from "../Charts/BarChart.vue"
export default {
    name:"LeftContainer",
    components:{
      StackedLineChart,
      RadarChart,
      BarChart
    }
    
}
</script>

<style>
  .leftContainer{
    height: 100%;
    width: 27%;
    display: flex;
    flex-direction: column;
    text-align: center;
  }
  .lineChart{
    height: 32%;
  }
  .radarChart{
    height: 32%;
  }
  .barChart{
    height: 36%;
  }
</style>