<template>
  <div class="mainWrapper">
    <LeftContainer />
    <MidContainer :stuInfoChange="stuInfoChange" :selectStuChange="selectStuChange"/>
    <RightContainer />
  </div>
</template>

<script>
import { computed } from "@vue/runtime-core";
import LeftContainer from "./LeftContainer/index.vue";
import MidContainer from "./LeftContainer/index.vue";
import RightContainer from "./LeftContainer/index.vue";
import Utils from "../utils";
export default {
  name: "Main",
  components: {
    LeftContainer,
    MidContainer,
    RightContainer,
  },
  provide() {
    return {
      class_term: computed(() => this.class_term),
      class_grade: computed(() => this.class_grade),
      class_name: computed(() => this.class_name),
      stuInfoArr: computed(() => this.stuInfoArr),
      selectStu:computed(()=>this.selectStu)
    };
  },
  data() {
    return {
      class_term: "",
      class_grade: "",
      class_name: "",
      stuInfoArr: [],
      selectStu:[]
    };
  },
  methods: {
    stuInfoChange(class_term, class_grade, class_name) {
      this.$data.stuInfoArr=[];
      this.$data.class_term='';
      this.$data.class_grade = '';
      this.$data.class_name ='';
      this.$data.selectStu=[];
      fetch(`${Utils.stuUrl}/getStuInfo/${class_grade}/${class_name}`)
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          this.$data.stuInfoArr = res.data;
          this.$data.class_term = class_term;
          this.$data.class_grade = class_grade;
          this.$data.class_name = class_name;
        });
    },
    stuDataChange(type,data){
        this.$data[type]=data;
    },
    selectStuChange(selectStu){
      this.selectStu=selectStu;
    }
  },
};
</script>

<style scoped>
.mainWrapper {
  width: 100%;
  height: 94%;
  display: flex;
  justify-content: space-between;
  background-color: white;
}
</style>
