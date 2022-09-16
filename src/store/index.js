import Vue from 'vue'
import Vuex from 'vuex'
import getters from "./getters";

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    token: null,
  },
  getters,
  mutations: {},
  // 执行异步
  actions: {}

})
export default store
