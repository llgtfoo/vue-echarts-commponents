/*
 * @Descripttion: '模块strore Common'
 * @Author: lilong(lilong@hztianque.com)
 * @Date: 2020-07-06 19:05:23
 * @LastEditTime: 2020-07-08 23:58:44
 */
const state = {
  Str: '前端小丑啊！',
  currentMenu: ''

}

const mutations = {
  setStr(state, info) {
    state.Str = state.Str + info
  },
  UPDATE_ACTIVE_MENU(state, info) {
    state.currentMenu = info
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
  getActiveMenu(state) {
    return state.currentMenu
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}