import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ViewUI from 'view-design';
import { Message } from 'view-design';
import { ClickOutside } from "./directives/click-outside.js";
import { Plugin } from "vue-fragment";
import { IconsPlugin } from "@/plugins/icons-plugin";
import VueRouter from "vue-router";
import 'view-design/dist/styles/iview.css';
import "./main.css";

Vue.directive("click-outside", ClickOutside);
Vue.use(IconsPlugin);
Vue.use(Message);
Vue.use(Plugin);
Vue.use(ViewUI);
Vue.config.productionTip = false;
Vue.use(VueRouter);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
