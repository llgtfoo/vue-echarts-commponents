<!--
 * @Author: llgtfoo@163.com
 * @Date: 2020-07-08 23:12:48
 * @LastEditTime: 2020-07-08 23:18:05
 * @LastEditors: user
 * @Description: 
 * @FilePath: \vue-echarts-commponents\src\views\page\box\cell\box-style-1-small.vue
 -->
<template>
  <div class='box-container'>
    <slot />
  </div>
</template>
<script>
export default {}
</script>
<style lang="scss" scoped>
.box-container{
  width: 100%;
  height: 100%;
  background: url('../../../../assets/imgs/box-1-601-247.png') no-repeat center center;
  background-size: 100% 100%;
  overflow: hidden;
  padding: 25px;
  box-sizing: border-box;
}
</style>

