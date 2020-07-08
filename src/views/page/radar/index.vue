<!--
 * @Author: llgtfoo@163.com
 * @Date: 2020-07-07 23:11:53
 * @LastEditTime: 2020-07-08 22:42:47
 * @LastEditors: user
 * @Description: 
 * @FilePath: \vue-echarts-commponents\src\views\page\radar\index.vue
 -->
<template>
  <div class="content">
    <box-container class="bg-grey" :spinShow="spinShow1" @showOptionHandler='showOption("radar1")'>
      <radar-box-1 :source="radar1DataList" ref="radar1"/>
    </box-container>
    
  </div>
</template>

<script>
// components
import boxContainer from "../common/box-container";
import radar1 from "./cell/radar-box-1";
//json
import radar1Data from '@/assets/mock/radar/ageRangeSource.json'
export default {
  components: {
    "box-container": boxContainer,
    "radar-box-1": radar1,
  },
  data() {
    return {
      spinShow1: true,
      radar1DataList:[]
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
          this.radar1DataList=radar1Data
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
@import './radar.scss'
</style>