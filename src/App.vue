<!--
 * @Author: llgtfoo@163.com
 * @Date: 2020-07-07 22:23:47
 * @LastEditTime: 2020-07-09 15:59:47
 * @LastEditors: Please set LastEditors
 * @Description: 
 * @FilePath: \vue-echarts-commponents\src\App.vue
 -->
<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
export default {
  data(){
    return{
      
    }
  },
   mounted() {
    //  console.log(this.$route.path)
    // this.$route.path==='/'?this.$router.push('/home/pie'):
    // this.$router.push(this.$store.getters['globe/getActiveMenu'])
  },
}
</script>
<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  user-select: none;
}
/*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
::-webkit-scrollbar{
  width: 3px;
  height: 15px;
  background-color: #F5F5F5;
}
/*定义滚动条轨道 内阴影+圆角*/
::-webkit-scrollbar-track{
  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
  box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
  border-radius: 10px;
  background-color: #F5F5F5;
}
/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb{
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
  box-shadow: inset 0 0 6px rgba(0,0,0,.3);
  background-color: #2d8cf0;
}
</style>
