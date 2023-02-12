import VueRouter from "vue-router";
import store from '@/store/index';
import { Message } from 'view-design';
// 路由数据
import routes from './router.js';

// 导出路由 在 main.js 里使用
const router = new VueRouter({
  mode: "history",
  routes,
});

/**
 * 路由拦截
 * 权限验证
 */

router.beforeEach((to, from, next) => {
  // 这里依据 token 判断是否登录，可视情况修改
  const token = store.getters.access_token;
  if (token && token != "") {
    next();
  } else {
    store.commit('user/refreshUserInfo', "")
    localStorage.removeItem("userInfo");
    Message.info("请登录哦！！！");
    return
  }
});

// router.afterEach(to => {
//   console.log(to);
// });

export default router;
