<template>
  <div class="main" :style="cssVariable">
    <Header />
    <Main/>
  </div>
</template>
<script>
import { computed } from "vue";
import Header from './components/Header.vue';
import Main from './components/Main.vue';
import { darkMode } from './color';
export default{
  components: {
    Header,
    Main
  },
  data() {
    return {
      colors: { ...darkMode },
      language: {lang:'中文'},
    };
  },
  computed:{
    cssVariable(){
      const keys = Object.getOwnPropertyNames(this.colors);
      const css = {};
      keys.forEach((key) => {
        css["--" + key] = this.colors[key];
      });
      return css;
    },
  },
  provide() {
    return {
      $_language: computed(() => this.language),
      $_colors: computed(() => this.colors),
    };
  }
}
</script>
<style scoped>
.main {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-content: space-around;
}
</style>
