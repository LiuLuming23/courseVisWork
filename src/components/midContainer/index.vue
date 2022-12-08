<template>
  <div class="midContainer">
    <div class="selectGroup">
      <div class="yearSelect">
        <span>学期</span>
        <el-select
          v-model="yearValueRef"
          class="m-2 select"
          placeholder="Select"
        >
          <el-option
            v-for="item in yearOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      <div class="gradeSelect">
        <span>年级</span>
        <el-select
          v-model="gardeValueRef"
          class="m-2 select"
          placeholder="Select"
        >
          <el-option
            v-for="item in gardeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      <div class="classSelect">
        <span>班级</span>
        <el-select
          v-model="classValueRef"
          class="m-2 select"
          placeholder="Select"
        >
          <el-option
            v-for="item in classOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      <el-button type="primary">查询</el-button>
    </div>
    <el-checkbox-group class="checkBoxGroup" v-model="checkboxRef">
      <el-checkbox-button
        v-for="city in cities"
        :key="city"
        :label="city"
        @click="handleClick"
      >
        {{ city }}
      </el-checkbox-button>
    </el-checkbox-group>
    <div class="hotChart">
      勤奋度热力图
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
const checkboxRef = ref([]);
const cities = [
  "小明",
  "小网",
  "小爱",
  "晓东",
  "王华",
  "李华",
  "老王",
  "老赞",
  "老话",
  "小瓦",
  "小张",
  "小王",
  "大瓦",
  "王吖"
];
const yearValueRef = ref("");
const gardeValueRef = ref("");
const classValueRef = ref("");

const yearOptions = [
  {
    value: "Option1",
    label: "Option1",
  },
  {
    value: "Option2",
    label: "Option2",
  },
];
const gardeOptions = [
  {
    value: "Option1",
    label: "Option1",
  },
  {
    value: "Option2",
    label: "Option2",
  },
];
const classOptions = [
  {
    value: "Option1",
    label: "Option1",
  },
  {
    value: "Option2",
    label: "Option2",
  },
];
export default {
  name: "MidContainer",
  data() {
    return {
      cities,
      checkboxRef,
      yearOptions,
      gardeOptions,
      classOptions,
      yearValueRef,
      gardeValueRef,
      classValueRef,
    };
  },
  methods: {
    handleClick(e) {
      if (e.target.tagName === "INPUT") return;
      setTimeout(() => {
        console.log(checkboxRef._rawValue);
      });
    },
  },
};
</script>

<style>
.midContainer {
  height: 100%;
  width: 46%;
  border: 1px solid #dcdfe6;
    box-sizing: border-box;
  min-width: 540px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  text-align: center;
}
.selectGroup {
  margin: 15px auto;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.selectGroup > div {
  min-width: 160px;
}
.select {
  margin: 0 8px;
}
.el-select {
  width: 7rem !important;
}
.checkBoxGroup {
  width: 80%;
  /* min-height: 40%; */
  margin: 0 auto;
  border: 1px solid #dcdfe6;
  border-bottom: 0;
  padding: 10px 0;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: repeat(5,20%);
  row-gap: 5px;
}
.checkBoxGroup span{
  border-left: 1px solid #dcdfe6;
}
.hotChart{
  width: 100%;
  height: 50%;
  margin: 0 auto;
  border: 1px solid #dcdfe6;
  border-left: 0;
  border-right: 0;
  flex:auto;
}
</style>
