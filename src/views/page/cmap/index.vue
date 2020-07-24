<!--
 * @Author: llgtfoo@163.com
 * @Date: 2020-07-07 23:11:53
 * @LastEditTime: 2020-07-24 16:38:41
 * @LastEditors: Please set LastEditors
 * @Description: 
 * @FilePath: \vue-echarts-commponents\src\views\page\cmap\index.vue
 -->
<template>
  <div class="content">
    <box-container class="bg-grey" :spinShow="spinShow1" @showOptionHandler='showOption("cmap1")'>
      <cmap-box-1 :source="cmap1DataList" ref="cmap1"/>
    </box-container>
    <box-container class="bg-grey" :spinShow="spinShow1" @showOptionHandler='showOption("cmap2")'>
      <cmap-box-2 :source="cmap2DataList" ref="cmap2"/>
    </box-container>
  </div>
</template>

<script>
// components
import boxContainer from "../common/box-container";
import cmap1 from "./cell/cmap-box-1";
import cmap2 from "./cell/cmap-box-2";
//json
import cmap1Data from '@/assets/mock/cmap/china.json'
export default {
  components: {
    "box-container": boxContainer,
    "cmap-box-1": cmap1,
    "cmap-box-2": cmap2,
  },
  data() {
    return {
      spinShow1: true,
      cmap1DataList:{},
      cmap2DataList:[]
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
          this.cmap1DataList=cmap1Data
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
@import './cmap.scss'
</style>