const getters = {
  userInfo: (state) => state.user.userInfo, //用户信息
  access_token: (state) => state.user.access_token,
};
export default getters;
