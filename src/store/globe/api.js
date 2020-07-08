
/*
 * @Descripttion: '模块strore api接口'
 * @Author: lilong(lilong@hztianque.com)
 * @Date: 2020-07-06 19:05:23
 * @LastEditTime: 2020-07-08 22:31:03
 */
// import Axios from 'axios'
const FETCH_DATA = "FETCH_DATA"

const api = {
  'FETCH_DATA': '/llgtfoo@163.com'
}
const state = {}

const mutations = {}

const actions = {
  // eslint-disable-next-line no-unused-vars
  fetchData({ commit }, proLoad) {
    return new Promise((resolve, reject) => {
      // eslint-disable-next-line no-undef
      axios.post(`${api[FETCH_DATA]}`).then(res => {
        // console.log(proLoad)
        resolve(res)
      }).catch(err => {
        // console.log(proLoad)
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