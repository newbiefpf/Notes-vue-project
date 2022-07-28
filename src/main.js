import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "@/assets/css/global.css";
import "element-ui/lib/theme-chalk/display.css";
import axios from "axios";
// 加载全局样式文件
import "@/permission"; // permission control
import { Message } from "element-ui";
import VueParticles from "vue-particles";
// 挂载到$message上
Vue.prototype.$message = Message;

Vue.prototype.$axios = axios;
Vue.use(VueParticles);
Vue.use(ElementUI);
Vue.config.productionTip = false;
new Vue({
  store,
  axios,
  router,
  render: (h) => h(App),
}).$mount("#app");
