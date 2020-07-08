<!--
 * @Author: llgtfoo@163.com
 * @Date: 2020-07-07 23:11:52
 * @LastEditTime: 2020-07-08 22:25:07
 * @LastEditors: user
 * @Description: 
 * @FilePath: \vue-echarts-commponents\src\views\page\line\index.vue
 -->
<template>
  <div class="content">
    <box-container class="bg-grey" :spinShow="spinShow1" @showOptionHandler='showOption("line1")'>
      <line-box-1 :source="line1DataList" ref="line1"/>
    </box-container>
    
  </div>
</template>

<script>
// components
import boxContainer from "../common/box-container";
import line1 from "./cell/line-box-1";
//json
import line1Data from '@/assets/mock/line/eventMonthsSource.json'
export default {
  components: {
    "box-container": boxContainer,
    "line-box-1": line1,
  },
  data() {
    return {
      spinShow1: true,
      line1DataList:{}
    };
  },
  created(){
   this.getDataLists()
  },
  methods: {
    getDataLists() {
     this.$store
        .dispatch("api/fetchData", { name: "llgtfoo" })
        .then(res => {
          console.log(res);
          this.spinShow1=true
        })
        .catch(err => {
          this.spinShow1=false
          this.line1DataList=line1Data
          console.log(err);
        });
    },
    showOption(ref) {
      this.$Message.info('请移至控制台查看optian结构')
      console.log(JSON.parse(JSON.stringify(this.$refs[ref].option)))
    },
  }
};
</script>

<style lang='scss' scoped>
@import './line.scss'
</style>