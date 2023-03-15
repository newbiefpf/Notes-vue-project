const state = {
  //ws传递的数据
  unread: 0,
}
// 修改状态
const mutations = {
  handleUnread (state, data) {
    state.unread = data;
  },
}
export default {
  namespaced: true,
  state,
  mutations,
}