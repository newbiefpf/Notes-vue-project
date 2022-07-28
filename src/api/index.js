import request from "@/utils/request.js";

// 测试
export function ping() {
  return request({
    url: "/v1/ping",
    method: "get",
  });
}
// 登录
export function login(data) {
  return request({
    url: "login",
    method: "post",
    data
  });
}