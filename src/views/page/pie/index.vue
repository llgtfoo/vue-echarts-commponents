<!--
 * @Author: llgtfoo@163.com
 * @Date: 2020-07-07 23:11:53
 * @LastEditTime: 2020-07-08 19:52:18
 * @LastEditors: Please set LastEditors
 * @Description: 
 * @FilePath: \vue-echarts-commponents\src\views\page\pie\index.vue
 -->
<!--
 * @Descripttion: ''
 * @Author: lilong(lilong@hztianque.com)
 * @Date: 2020-07-08 19:01:54
 * @LastEditTime: 2020-07-08 19:05:20
--> 
<template>
  <div class="pie-content">
    <box-container class="bg-grey" :spinShow="spinShow1" @showOptionHandler='showOption("pie1")'>
      <pie-box-1 :source="pie1DataList" ref="pie1" />
    </box-container>
     <box-container class="bg-grey" :spinShow="spinShow1" @showOptionHandler='showOption("pie2")'>
      <pie-box-2 :source="pie2DataList" ref="pie2" />
    </box-container>
      <box-container class="bg-grey" :spinShow="spinShow1" @showOptionHandler='showOption("pie3")'>
      <pie-box-3 :source="pie3DataList" ref="pie3" />
    </box-container>
  </div>
</template>

<script>
// components
import boxContainer from "../common/box-container";
import pie1 from "./cell/pie-box-1";
import pie2 from "./cell/pie-box-2";
import pie3 from "./cell/pie-box-3";
//json
import pie1Data from '@/assets/mock/pie/eventTypeSource.json'
import pie2Data from '@/assets/mock/pie/caringObjectSource.json'
import pie3Data from '@/assets/mock/pie/eventHandlingSource.json'
export default {
  components: {
    "box-container": boxContainer,
    "pie-box-1": pie1,
    "pie-box-2": pie2,
    "pie-box-3": pie3,
  },
  data() {
    return {
      spinShow1: true,
      pie1DataList: {},
      pie2DataList:{},
      pie3DataList:{}
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
        })
        .catch(err => {
          this.spinShow1=false
          this.pie1DataList=pie1Data
          this.pie2DataList=pie2Data
          this.pie3DataList=pie3Data
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
@import './pie.scss'
</style>