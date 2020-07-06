/*
 * @Descripttion: '模块strore Common'
 * @Author: lilong(lilong@hztianque.com)
 * @Date: 2020-07-06 19:05:23
 * @LastEditTime: 2020-07-06 20:17:00
 */
const state = {
  Str: '前端小丑啊！'
}

const mutations = {
  setStr(state, info) {
    state.Str = state.Str + info
  }
}

const actions = {
  setStr({ commit }, info) {
    commit("setStr", info)
  }
}

const getters = {
  clientInfo(state) {
    return state.Str
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}