<!--
 * @Author: llgtfoo@163.com
 * @Date: 2020-07-08 23:12:48
 * @LastEditTime: 2020-07-08 23:19:13
 * @LastEditors: user
 * @Description: 
 * @FilePath: \vue-echarts-commponents\src\views\page\box\cell\box-style-3.vue
 -->
<template>
  <div class='box-container'>
    <i class='box-corner box-corner-lt' />
    <i class='box-corner box-corner-rt' />
    <i class='box-corner box-corner-lb' />
    <i class='box-corner box-corner-rb' />
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
  overflow: hidden;
  padding: 15px;
  box-sizing: border-box;
  position: relative;

  .box-corner{
    position: absolute;
    width: 28px;
    height: 28px;

    &.box-corner-lt{
      top: 0;
      left: 0;
      background: url('../../../../assets/imgs/box-corner-lt.png') no-repeat;
      background-size: 100% 100%;
    }

    &.box-corner-rt{
      top: 0;
      right: 0;
      background: url('../../../../assets/imgs/box-corner-rt.png') no-repeat;
      background-size: 100% 100%;
    }

    &.box-corner-lb{
      bottom: 0;
      left: 0;
      background: url('../../../../assets/imgs/box-corner-lb.png') no-repeat;
      background-size: 100% 100%;
    }

    &.box-corner-rb{
      bottom: 0;
      right: 0;
      background: url('../../../../assets/imgs/box-corner-rb.png') no-repeat;
      background-size: 100% 100%;
    }
  }
}
</style>

