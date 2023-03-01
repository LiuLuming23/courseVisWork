<template>
  <div class="rightContainer">
    <div class="bostonChart"><Scatter/></div>
    <div class="waveChart"><KChart/></div>
  </div>
</template>

<script>
import Scatter from "../Charts/Scatter.vue"
import KChart from "../Charts/KChart.vue"
export default {
    name:'RightContainer',
    components:{
      Scatter,
      KChart
    }
}
</script>

<style>
  .rightContainer{
    height: 100%;
    width: 27%;
    display: flex;
    flex-direction: column;
    text-align: center;
  }
  .bostonChart{
    height: 50%;
  }
  .waveChart{
    height: 50%;
  }
</style>