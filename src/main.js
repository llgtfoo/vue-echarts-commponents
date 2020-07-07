/*
 * @Author: llgtfoo@163.com
 * @Date: 2020-07-07 22:23:47
 * @LastEditTime: 2020-07-07 22:36:53
 * @LastEditors: user
 * @Description: 
 * @FilePath: \vue-echarts-commponents\src\main.js
 */
import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import echarts from 'echarts'
import liquidfill from 'echarts-liquidfill'
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';


Vue.config.productionTip = false;
Vue.use(ViewUI)
Vue.use(liquidfill)
Vue.prototype.$echarts = echarts

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
