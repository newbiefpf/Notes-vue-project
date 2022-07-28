import Vue from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import "@/assets/css/global.css"
import 'element-ui/lib/theme-chalk/display.css';
// 加载全局样式文件
import '@/permission' // permission control
import { Message } from 'element-ui'
// 挂载到$message上
Vue.prototype.$message = Message

Vue.use(ElementUI)
Vue.config.productionTip = false
new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
