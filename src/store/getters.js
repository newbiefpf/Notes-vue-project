const getters = {
  userInfo: (state) => state.user.userInfo, //用户信息
  access_token: (state) => state.user.access_token,
  wsData: (state) => state.wsData.wsData, //websocket返回的数据
};
export default getters;
