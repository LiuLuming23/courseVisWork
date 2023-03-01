<template>
  <div class="midContainer">
    <div class="selectGroup">
      <div class="yearSelect">
        <span>学期</span>
        <el-select
          v-model="yearValueRef"
          class="m-2 select"
          placeholder=""
          @change="selectChange"
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
          placeholder=""
          @change="selectChange"
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
          placeholder=""
          @click="classClick"
        >
          <el-option
            v-for="item in classOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      <el-button type="primary" @click="handleSearch">查询</el-button>
    </div>
    <el-checkbox-group class="checkBoxGroup" v-model="checkboxRef">
      <el-checkbox-button
        v-for="stu in stuInfoArr"
        :key="stu['stu_id']"
        :label="stu['stu_id']"
        @click="handleClick"
      >
        {{ stu['stu_name'] }}
      </el-checkbox-button>
    </el-checkbox-group>
    <div class="hotChart">
      <HotChart />
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import HotChart from "../Charts/Hotchart.vue";
import options from "./options";
import Utils from "../../utils.js";
const checkboxRef = ref([]);
const yearValueRef = ref("");
const gardeValueRef = ref("");
const classValueRef = ref("");
export default {
  name: "MidContainer",
  props: ["stuInfoChange","selectStuChange"],
  inject:['class_term','stuInfoArr'],
  data() {
    const yearOptions = options["yearOptions"];
    const gardeOptions = options["gardeOptions"];
    const classOptions = [];
    let students=[];
    return {
      students,
      checkboxRef,
      yearOptions,
      gardeOptions,
      classOptions,
      yearValueRef,
      gardeValueRef,
      classValueRef,
    };
  },
  components: {
    HotChart,
  },
  methods: {
    handleClick(e) {
      if (e.target.tagName === "INPUT") return;
      setTimeout(() => {
        this.selectStuChange(checkboxRef._rawValue);
      });
    },
    selectChange() {
      if (yearValueRef.value !== "" && gardeValueRef.value !== "") {
        fetch(Utils.stuUrl + "/getClass/" + gardeValueRef.value)
          .then((res) => {
            return res.json();
          })
          .then((res) => {
            let classOptions = [];
            res.data.forEach((it) => {
              if (it !== "") {
                classOptions.push({ value: it, label: it + "班" });
              } else {
                classOptions.push({ value: it, label: "未分班" });
              }
            });
            this.$data.classOptions = classOptions;
          });
      }
    },
    classClick() {
      if (yearValueRef.value == "" || gardeValueRef.value == "") {
        ElMessage({
          message: "请先选择学期和年级",
          type: "warning",
        });
      }
    },
    handleSearch() {
      if (
        yearValueRef.value !== "" &&
        gardeValueRef.value !== "" &&
        classValueRef.value !== ""
      ) {
        checkboxRef.value=[];
        this.selectStuChange([]);
        this.stuInfoChange(
          yearValueRef.value,
          gardeValueRef.value,
          classValueRef.value
        );
      } else {
        ElMessage({
          message: "请完善选择信息",
          type: "error",
        });
      }

      console.log(
        "查询搜索：",
        yearValueRef.value,
        gardeValueRef.value,
        classValueRef.value
      );
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
  width: 86%;
  /* min-height: 53%;
  max-height: 55%; */
  height: 55%;
  margin: 0 auto;
  border: 1px solid #dcdfe6;
  border-bottom: 0;
  padding: 10px 0;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: repeat(5, 20%);
  row-gap: 5px;
  overflow-y: scroll;
}
.checkBoxGroup span {
  border-left: 1px solid #dcdfe6;
}
.hotChart {
  width: 100%;
  height: 35%;
  margin: 0 auto;
  border: 1px solid #dcdfe6;
  border-left: 0;
  border-right: 0;
  flex: auto;
}
</style>
