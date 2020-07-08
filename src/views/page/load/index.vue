<!--
 * @Author: llgtfoo@163.com
 * @Date: 2020-07-07 23:11:53
 * @LastEditTime: 2020-07-08 23:23:02
 * @LastEditors: user
 * @Description: 
 * @FilePath: \vue-echarts-commponents\src\views\page\load\index.vue
 -->
<template>
  <div class='content'>
    <box-container :toolsShow='false'>
      <load-style-1 />
    </box-container>
  </div>
</template>
<script>
import boxContainer from '../common/box-container'
import loadStyle1 from './cell/load-style-1'
export default {
  components: {
    'box-container': boxContainer,
    'load-style-1': loadStyle1,
  },
  data() {
    return {}
  },
}
</script>
<style lang="scss" scoped>
@import './load.scss'
</style>