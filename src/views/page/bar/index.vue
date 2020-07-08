<!--
 * @Author: llgtfoo@163.com
 * @Date: 2020-07-07 23:11:53
 * @LastEditTime: 2020-07-08 20:44:15
 * @LastEditors: Please set LastEditors
 * @Description: 
 * @FilePath: \vue-echarts-commponents\src\views\page\bar\index.vue
 -->
<template>
  <div class="content">
    <box-container class="bg-grey" :spinShow="spinShow1" @showOptionHandler='showOption("bar1")'>
      <bar-box-1 :source="bar1DataList" ref="bar1" @listenChild='getChild'/>
    </box-container>
    
      <box-container class="bg-grey" :spinShow="spinShow1" @showOptionHandler='showOption("bar2")'>
      <bar-box-2 :source="bar2DataList" ref="bar2" />
    </box-container>
  </div>
</template>

<script>
// components
import boxContainer from "../common/box-container";
import bar1 from "./cell/bar-box-1";
import bar2 from "./cell/bar-box-2";
// import bar3 from "./cell/bar-box-3";
// import bar4 from "./cell/bar-box-4";
//json
import bar1Data from '@/assets/mock/bar/bardata01.json'
import bar12Data from '@/assets/mock/bar/bardata02.json'
import bar2Data from '@/assets/mock/bar/bardata03.json'
export default {
  components: {
    "box-container": boxContainer,
    "bar-box-1": bar1,
    "bar-box-2": bar2,
    // "bar-box-3": bar3,
  },
  data() {
    return {
      spinShow1: true,
      bar1DataList: [],
      bar2DataList: [],
      bar3DataList: [],
      bar4DataList: [],
      type:''
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
          this.bar1DataList=bar1Data
          this.bar2DataList=bar2Data
          // this.bar3DataList=bar3Data
          console.log(err);
        });
    },
    //bar1中tab切换获取相应数据
    getChild(type) {
      this.type = type;
      this.getSource(this.type);
    },
    getSource(type) {
      switch (type) {
        case '事件':
          this.bar1DataList = bar1Data
          break;
        case '服务':
          this.bar1DataList = bar12Data
          break;
        default:
          break;
      }
    },
    showOption(ref) {
      this.$Message.info('请移至控制台查看optian结构')
      console.log(JSON.parse(JSON.stringify(this.$refs[ref].option)))
    },
  }
};
</script>

<style lang='scss' scoped>
@import './bar.scss'
</style>