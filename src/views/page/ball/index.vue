<!--
 * @Author: llgtfoo@163.com
 * @Date: 2020-07-07 23:11:53
 * @LastEditTime: 2020-07-08 23:43:04
 * @LastEditors: user
 * @Description: 
 * @FilePath: \vue-echarts-commponents\src\views\page\ball\index.vue
 -->
<template>
  <div class="content">
    <box-container class="bg-grey" :spinShow="spinShow1" @showOptionHandler='showOption("ball")'>
      <ball-box-1 :source="ballDataList" ref="ball" :radius='ballRadius'/>
    </box-container>
    
  </div>
</template>

<script>
// components
import boxContainer from "../common/box-container";
import ball from "./cell/ball-box-1";
//json
import ballData from '@/assets/mock/ball/eventMonthsSource.json'
export default {
  components: {
    "box-container": boxContainer,
    "ball-box-1": ball,
  },
  data() {
    return {
      spinShow1: true,
      ballDataList:[],
      ballRadius:'100%'
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
          this.ballDataList=ballData
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
@import './ball.scss'
</style>