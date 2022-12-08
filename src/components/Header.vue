<template>
  <div :class="css.headerWrapper">
    <div :class="css.header">
      <p>智慧教育可视化系统</p>
      <div :class="css.darkMode">
        <span :class="css.day">🌜</span>
        <span :class="css.dark">🌞</span>
        <span
          :class="[css.circle, dayMode ? css.dayMode : '']"
          @click="handleMode"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { darkMode, dayMode } from "../color";
import utils from "../utils"
export default {
  name:"Header",
  inject: ["$_colors", "$_language"],
  computed: {
    dayMode(vm) {
      return vm.$_colors.name === "day";
    },
  },
  methods: {
    handleMode() {
      const { $_colors } = this;
      if ($_colors.name === "day") {
        utils.dayDarkSwitch($_colors, darkMode);
      } else {
        utils.dayDarkSwitch($_colors, dayMode);
      }
    },
  },
};
</script>

<style module="css" scoped>
.headerWrapper {
  width: 100%;
  height: 6%;
  background-color: cornflowerblue;
}
.header {
  width: 95%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
}
.header > p {
  font-size: 20px;
  margin: 0;
  line-height: 6vh;
  color: whitesmoke;
}

.darkMode {
  position: relative;
  right: 0;
  top: calc(3vh - 10px);
  --color: #fff;
  --height: 20px;
  color: var(--color);
  height: var(--height);
  border-radius: var(--height);
  border: var(--color) solid 1px;
  user-select: none;
  width: 40px;
  background-color: #555a64;
}
.day,
.dark {
  display: inline-block;
  position: absolute;
  top: 50%;
  font-size: 14px;
  line-height: var(--height);
  transform: translateY(-50%);
  vertical-align: center;
  width: 16px;
}
.day {
  left: 1px;
}
.dark {
  right: 5px;
}
.circle {
  position: absolute;
  top: 0;
  left: calc(40px - var(--height));
  --size: calc(var(--height) - 2px);
  margin: 1px;
  height: var(--size);
  width: var(--size);
  background-color: var(--color);
  border-radius: 50%;
  cursor: pointer;
  transition: all ease-in-out 0.25s;
}
.dayMode {
  left: 0;
}
</style>
