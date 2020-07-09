<!--
 * @Author: lilong
 * @Date: 2020-07-07 20:52:09
 * @LastEditTime: 2020-07-09 15:49:35
 * @LastEditors: Please set LastEditors
 * @Description:
 * @FilePath: \vue-echarts-commponents\src\views\page\home\index.vue
 -->

<template>
  <div class='container'>
    <Layout class='main-layout'>
      <Sider
        class='sider-cont'
        collapsible
        :collapsed-width='60'
        v-model='isCollapsed'>
        <div class='logo-cont' ref='logo-comp'>
          Vue Screen Components
        </div>
        <Menu
          :active-name='getActiveMenu'
          :class='menuitemClasses'
          theme='dark'
          @on-select='changeMenuHandler'
          :style='{width: "200px"}'>
          <!-- <router-link
            v-for='menu in menus'
            :key='menu.key'
            :to='menu.path'
            :title='menu.title'> -->
            <MenuItem
              v-for='menu in menus'
              :key='menu.key'
              :name='menu.path'>
              <Icon :type='menu.icon' />
              <span class='menu-item-span'>{{menu.title}}</span>
            </MenuItem>
          <!-- </router-link> -->
        </Menu>
      </Sider>
      <Layout class='right-cont'>
        <Header class='header-cont'>Echarts 实例展示</Header>
        <Content class='main-cont'>
          <router-view />
        </Content>
      </Layout>
    </Layout>
  </div>
</template>
<script>
// import { TweenMax, TimelineLite, TweenLite } from 'gsap'
export default {
  data() {
    return {
      menus: [
        {
          title: '饼图',
          name: 'pie',
          key: 'pie',
          path: '/home/pie',
          icon: 'ios-pie-outline',
        }, {
          title: '柱状图',
          name: 'bar',
          key: 'bar',
          path: '/home/bar',
          icon: 'ios-stats-outline',
        }, {
          title: '折线图',
          name: 'line',
          key: 'line',
          path: '/home/line',
          icon: 'ios-trending-up',
        }, {
          title: '雷达图',
          name: 'radar',
          key: 'radar',
          path: '/home/radar',
          icon: 'ios-ionic-outline',
        }, {
          title: '表格',
          name: 'table',
          key: 'table',
          path: '/home/table',
          icon: 'ios-grid-outline',
        }, {
          title: '盒容器',
          name: 'box',
          key: 'box',
          path: '/home/box',
          icon: 'md-square-outline',
        }, {
          title: '等待框',
          name: 'load',
          key: 'load',
          path: '/home/load',
          icon: 'ios-loading',
        }, {
          title: '水球图',
          name: 'ball',
          key: 'ball',
          path: '/home/ball',
          icon: 'ios-analytics',
        }, {
          title: '漏斗图',
          name: 'funnel',
          key: 'funnel',
          path: '/home/funnel',
          icon: 'md-funnel',
        }, {
          title: '公司地图',
          name: 'cmap',
          key: 'cmap',
          path: '/home/cmap',
          icon: 'ios-globe-outline',
        }, {
          title: '空页面',
          name: 'page',
          key: 'page',
          path: '/home/page',
          icon: 'ios-document-outline',
        },
      ],
      isCollapsed: true,
    }
  },
  computed: {
    getActiveMenu() {
      return this.$route.path==='/home/pie'?'/home/pie':this.$store.getters['globe/getActiveMenu']
    },
    menuitemClasses() {
      return [
        'sider-bar',
        this.isCollapsed ? 'collapsed-menu' : '',
      ]
    },
  },
  created() {

  },
  mounted() {
  },
  methods: {
    changeMenuHandler(name) {
        console.log(name)
        this.$router.push(name)
        this.$store.commit('globe/UPDATE_ACTIVE_MENU', name)
    },
  },
}
</script>
<style lang='scss' scoped>
 @import './home.scss';
</style>

