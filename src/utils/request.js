// 引入axios
import axios from 'axios'
import store from '@/store/index';
import { Message } from 'element-ui';
const service = axios.create({
  baseURL: "/api",
  timeout: 20000,
});
// 设置post请求头
service.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
//设置响应头 设置允许跨域

// 请求拦截
service.interceptors.request.use(
  (config) => {
    // config.headers["Content-Type"] = "application/json;";

     // 每次发送请求之前判断vuex中是否存在token        
        // 如果存在，则统一在http请求的header都加上token，这样后台根据token判断你的登录情况
        // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断 
        const token = store.state.token;        
        token && (config.headers.Authorization = token);        
        return config;    
  },
  (error) => {
    return Promise.reject(error);
  }
);
// 响应拦截
service.interceptors.response.use(response => {
  // 对响应数据做点什么
  var res = response.data;
    if (res.code == 200) {
      return res;
    } else {
      Message.warning(res.message);
      return res;
    }
}, error => {
  // 对响应错误做点什么
  Message.error(error.message);
  return Promise.reject(error);
});

export default service;