import Vue from 'vue'
import Vuex from 'vuex'
import getters from "./getters";
import {
  getUserInfo,

} from "@/utils/auth.js";
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    token: null,
    userInfo: getUserInfo()
  },
  mutations: {
    setUserInfo (state, data) {
      // 变更状态
      state.userInfo = data;
      localStorage.setItem("userInfo", data)

    }
  },
  // 执行异步
  actions: {
    asyncSetUserInfo (context, data) {
      context.commit('setUserInfo', data)
    },
  },
  getters,
})
export default store
