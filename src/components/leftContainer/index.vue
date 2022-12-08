<template>
  <div class="leftContainer">
    <div class="lineChart">近期考试成绩走势图</div>
    <div class="radarChart" >学习力雷达图</div>
    <div class="barChart">单科考试成绩图</div>
  </div>
</template>

<script>
export default {
    name:"LeftContainer"
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