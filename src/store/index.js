/*
 * @Descripttion: ''
 * @Author: lilong(lilong@hztianque.com)
 * @Date: 2020-07-06 09:51:34
 * @LastEditTime: 2020-07-08 19:22:28
 */
import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import globe from './globe/common.js'
import api from './globe/api.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '龙哥最帅了'
  },
  mutations: {
  },
  actions: {
  },
  getters: {
    getToken(state) {
      return state.token
    }
  },
  modules: {
    globe,
    api
  },
  plugins: [createPersistedState({ paths: ['globe', "api"] })],
})
