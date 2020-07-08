<!--
 * @Author: llgtfoo@163.com
 * @Date: 2020-07-07 23:11:53
 * @LastEditTime: 2020-07-08 22:50:02
 * @LastEditors: user
 * @Description: 
 * @FilePath: \vue-echarts-commponents\src\views\page\table\index.vue
 -->
<template>
  <div class="content">
    <box-container class="bg-grey" :spinShow="spinShow1" :toolsShow='false'>
      <table-box-1 :source="table1DataList"/>
    </box-container>
    
  </div>
</template>

<script>
// components
import boxContainer from "../common/box-container";
import table1 from "./cell/table-box-1";
//json
import table1Data from '@/assets/mock/table/eventListSource.json'
export default {
  components: {
    "box-container": boxContainer,
    "table-box-1": table1,
  },
  data() {
    return {
      spinShow1: true,
      table1DataList:[]
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
          this.table1DataList=table1Data
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
@import './table.scss'
</style>