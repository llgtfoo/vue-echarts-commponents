<!--
 * @Author: llgtfoo@163.com
 * @Date: 2020-07-07 23:11:53
 * @LastEditTime: 2020-07-09 15:54:37
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

     <box-container class="bg-grey" :spinShow="spinShow1" @showOptionHandler='showOption("bar3")'>
      <bar-box-3 :source="bar3DataList" ref="bar3" />
    </box-container>

      <box-container class="bg-grey" :spinShow="spinShow1" @showOptionHandler='showOption("bar4")'>
      <bar-box-4 :source="bar4DataList" ref="bar4" />
    </box-container>

      <box-container class="bg-grey" :spinShow="spinShow1" @showOptionHandler='showOption("bar5")'>
      <bar-box-5 :source="bar5DataList" ref="bar5" />
    </box-container>

      <box-container class="bg-grey" :spinShow="spinShow1" @showOptionHandler='showOption("bar6")'>
      <bar-box-6 :source="bar6DataList" ref="bar6" />
    </box-container>
  </div>
</template>

<script>
// components
import boxContainer from "../common/box-container";
import bar1 from "./cell/bar-box-1";
import bar2 from "./cell/bar-box-2";
import bar3 from "./cell/bar-box-3";
import bar4 from "./cell/bar-box-4";
import bar5 from "./cell/bar-box-5";
import bar6 from "./cell/bar-box-6";
//json
import bar1Data from '@/assets/mock/bar/bardata01.json'
import bar12Data from '@/assets/mock/bar/bardata02.json'
import bar2Data from '@/assets/mock/bar/bardata03.json'
import bar3Data from '@/assets/mock/bar/personRangeSource.json'
import bar4Data from '@/assets/mock/bar/bardata04.json'
import bar5Data from '@/assets/mock/bar/bardata05.json'
import bar6Data from '@/assets/mock/bar/bardata06.json'
export default {
  components: {
    "box-container": boxContainer,
    "bar-box-1": bar1,
    "bar-box-2": bar2,
    "bar-box-3": bar3,
    "bar-box-4": bar4,
    "bar-box-5": bar5,
    "bar-box-6": bar6,
  },
  data() {
    return {
      spinShow1: true,
      bar1DataList: [],
      bar2DataList: [],
      bar3DataList: [],
      bar4DataList: [],
      bar5DataList: [],
      bar6DataList: [],
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
          this.spinShow1=true
        })
        .catch(err => {
          this.spinShow1=false
          this.bar1DataList=bar1Data
          this.bar2DataList=bar2Data
          this.bar3DataList=bar3Data
          this.bar4DataList=bar4Data
          this.bar5DataList=bar5Data
          this.bar6DataList=bar6Data
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