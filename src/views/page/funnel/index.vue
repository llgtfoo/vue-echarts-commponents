<!--
 * @Author: llgtfoo@163.com
 * @Date: 2020-07-07 23:11:52
 * @LastEditTime: 2020-07-08 23:47:09
 * @LastEditors: user
 * @Description: 
 * @FilePath: \vue-echarts-commponents\src\views\page\funnel\index.vue
 -->
<template>
  <div class="content">
    <box-container class="bg-grey" :spinShow="spinShow1" @showOptionHandler='showOption("funnel1")'>
      <funnel-box-1 :source="funnel1DataList" ref="funnel1"/>
    </box-container>
    
  </div>
</template>

<script>
// components
import boxContainer from "../common/box-container";
import funnel1 from "./cell/funnel-box-1";
//json
import funnel1Data from '@/assets/mock/funnel/areaSource.json'
export default {
  components: {
    "box-container": boxContainer,
    "funnel-box-1": funnel1,
  },
  data() {
    return {
      spinShow1: true,
      funnel1DataList:[]
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
          this.funnel1DataList=funnel1Data
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
@import './funnel.scss'
</style>