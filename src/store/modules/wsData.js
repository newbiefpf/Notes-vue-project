
const state = {
  //ws传递的数据
  wsData: null,
}
// 修改状态
const mutations = {
  handleTableData (state, data) {
    state.wsData = data;
  },
}
export default {
  namespaced: true,
  state,
  mutations,
}