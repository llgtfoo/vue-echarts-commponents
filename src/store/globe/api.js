/*
 * @Descripttion: ''
 * @Author: lilong(lilong@hztianque.com)
 * @Date: 2020-07-08 19:08:46
 * @LastEditTime: 2020-07-08 19:21:03
 */
/*
 * @Descripttion: '模块strore Common'
 * @Author: lilong(lilong@hztianque.com)
 * @Date: 2020-07-06 19:05:23
 * @LastEditTime: 2020-07-07 23:40:07
 */
import '@/plugins/axios'
import Axios from 'axios'
const FETCH_DATA = FETCH_DATA

const api = {
  'FETCH_DATA': 'llgtfoo@163.com'
}
const state = {}

const mutations = {}

const actions = {
  // eslint-disable-next-line no-unused-vars
  fetchData({ commit }, proLoad) {
    console.log(proLoad)
    return new Promise((reslove, reject) => {
      Axios.get(api[FETCH_DATA], proLoad).then(res => {
        reslove(res)
      }).catch(err => {
        reject(err)
      })
    })
  }
}

const getters = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}