<template>
  <div class="rightContainer">
    <div class="bostonChart">消费情况</div>
    <div class="waveChart">考试成绩波动图</div>
  </div>
</template>

<script>
export default {
    name:'RightContainer'
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