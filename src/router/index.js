/*
 * @Author: llgtfoo@163.com
 * @Date: 2020-07-07 22:23:47
 * @LastEditTime: 2020-07-07 23:38:03
 * @LastEditors: user
 * @Description: 
 * @FilePath: \vue-echarts-commponents\src\router\index.js
 */
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: () => import(/* webpackChunkName: "about" */ '../views/page/home/index.vue'),
    children: [
      {
        path: 'pie',
        name: 'pie',
        component: () => import(/* webpackChunkName: "about" */ '../views/page/pie/index.vue'),
      },
      {
        path: 'bar',
        name: 'bar',
        component: () => import(/* webpackChunkName: "about" */ '../views/page/bar/index.vue'),
      },
      {
        path: 'line',
        name: 'line',
        component: () => import(/* webpackChunkName: "about" */ '../views/page/line/index.vue'),
      },
      {
        path: 'radar',
        name: 'radar',
        component: () => import(/* webpackChunkName: "about" */ '../views/page/radar/index.vue'),
      },
      {
        path: 'table',
        name: 'table',
        component: () => import(/* webpackChunkName: "about" */ '../views/page/table/index.vue'),
      },
      {
        path: 'box',
        name: 'box',
        component: () => import(/* webpackChunkName: "about" */ '../views/page/box/index.vue'),
      },
      {
        path: 'load',
        name: 'load',
        component: () => import(/* webpackChunkName: "about" */ '../views/page/load/index.vue'),
      },
      {
        path: 'ball',
        name: 'ball',
        component: () => import(/* webpackChunkName: "about" */ '../views/page/ball/index.vue'),
      },
      {
        path: 'funnel',
        name: 'funnel',
        component: () => import(/* webpackChunkName: "about" */ '../views/page/funnel/index.vue'),
      },
      {
        path: 'cmap',
        name: 'camp',
        component: () => import(/* webpackChunkName: "about" */ '../views/page/cmap/index.vue'),
      },
      {
        path: 'page',
        name: 'page',
        component: () => import(/* webpackChunkName: "about" */ '../views/page/page/index.vue'),
      },

    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
