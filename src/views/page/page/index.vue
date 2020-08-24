<!--
 * @Author: llgtfoo@163.com
 * @Date: 2020-07-07 23:11:53
 * @LastEditTime: 2020-08-24 09:19:35
 * @LastEditors: Please set LastEditors
 * @Description: 
 * @FilePath: \vue-echarts-commponents\src\views\page\page\index.vue
 -->
<template>
  <div class="pie-container">
     待丰富的页面！！！
      <tab-page :data='dataLists' :option='option1'>
        <ul class="list-box">
          <li v-for="(item,index) in dataLists" :key="index">{{item.name}}</li>
        </ul>
      </tab-page>
  </div>
</template>

<script>
export default {
   data(){
     return{
        option1:{
        number:5,//默认五个
        interval:10,//必传值，与css中写的元素间隔一致
        single:false,
        autoScroll:false,
        autoScrollTime:2000,
      },
      dataLists:[
         {
           name:'内容1'
         },
         {
           name:'内容2'
         },
         {
           name:'内容3'
         },
         {
           name:'内容4'
         },
         {
           name:'内容5'
         },
         {
           name:'内容6'
         },
        //  {
        //    name:'内容11'
        //  },
        //  {
        //    name:'内容21'
        //  },
        //  {
        //    name:'内容31'
        //  },
        //  {
        //    name:'内容41'
        //  },
        //  {
        //    name:'内容51'
        //  },
        //  {
        //    name:'内容61'
        //  },
         
      ],
     }
   }
}
</script>

<style lang='scss' scoped>
.list-box {
    display: flex;
    flex-wrap: nowrap;
    height: 50px;
  li {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    background: cyan;
    width: 85px;
    margin-left: 10px;
    font-size: 16px;
    &:first-of-type {
      margin-left: 0;
    }
  }
}
</style>