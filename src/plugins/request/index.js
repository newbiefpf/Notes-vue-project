import axios from 'axios';
import { getToken } from "@/utils/auth.js";
import store from "@/store";
// 创建一个错误
function errorCreate (msg) {
  const err = new Error(msg);
  throw err;
}


// 创建一个 axios 实例
const service = axios.create({
  baseURL: "/serve",
  timeout: "30000"
});

// 请求拦截器
service.interceptors.request.use(
  config => {
    config.headers["Authorization"] = "Bearer " + getToken();
    config.headers['Content-Type'] = "application/json;charset=utf-8";
    config.headers['Access-Control-Allow-Origin'] = '*';
    return config
  },
  error => {
    // 发送失败
    Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    // dataAxios 是 axios 返回数据中的 data
    const dataAxios = response.data;
    if (dataAxios.toString().includes("登录失败")) {
      errorCreate(`${dataAxios}`);
    }
    return dataAxios
  },
  error => {
    if (error && error.response) {
      // store.dispatch("user/refreshToken", "");
      switch (error.response.status) {
        case 400: error.message = '参数错误'; break;
        case 401: error.message = '未授权，请登录'; break;
        case 403: error.message = '拒绝访问'; break;
        case 404: error.message = `请求地址出错`; break;
        case 408: error.message = '请求超时'; break;
        case 500: error.message = '服务器内部错误'; break;
        case 501: error.message = '服务未实现'; break;
        case 502: error.message = '网关错误'; break;
        case 503: error.message = '服务不可用'; break;
        case 504: error.message = '网关超时'; break;
        case 505: error.message = 'HTTP版本不受支持'; break;
        default: break;
      }
    }
    return Promise.reject(error);
  }
);

export default service;
