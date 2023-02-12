
import {
  getToken,
  setToken,
  getUserInfo,
  setUserInfo
} from "@/utils/auth.js";
// 状态
const state = {
  access_token: getToken(),
  userInfo: null, //用户信息
};
// 修改状态
const mutations = {
  // set
  setToken (state, token) {
    state.access_token = token; //将数据设置给vuex
    setToken(token); // 同步给缓存
  },
  setUserInfo (state, data) {
    state.userInfo = data;
    setUserInfo(data);
  },
  getUserInfo (state) {
    state.userInfo = getUserInfo();
  },
};
// 执行异步
const actions = {
  // refresh
  refreshToken ({ commit }, data) {
    commit("setToken", data);
  },

  refreshUserInfo ({ commit }, data) {
    commit("setUserInfo", data);
  },
};
export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
