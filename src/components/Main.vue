<template>
  <div class="mainWrapper">
    <LeftContainer/>
    <MidContainer />
    <RightContainer/>
  </div>
</template>

<script>
  import LeftContainer from "../components/leftContainer/index.vue"
  import MidContainer from "../components/midContainer/index.vue"
  import RightContainer from "../components/rightContainer/index.vue"
export default {
  name:'Main',
  components:{
    LeftContainer,
    MidContainer,
    RightContainer
  },
  methods: {
  },
}
</script>

<style scoped>
  .mainWrapper{
    width: 100%;
    height:94%;
    display: flex;
    justify-content: space-between;
    background-color: white;

  }
</style>