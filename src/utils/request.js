// 引入axios
import axios from 'axios'
import store from '@/store/index';
import { Message } from 'element-ui';
import { getToken } from "@/utils/auth";
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
    config.headers["Content-Type"] = "application/json;";
    const token = getToken();
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
    Message.warning(res.msg);
    return res;
  }
}, error => {
  // 对响应错误做点什么
  Message.error(error.msg);
  return Promise.reject(error);
});

export default service;