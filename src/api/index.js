import request from "@/utils/request.js";

// 测试
export function ping () {
  return request({
    url: "v1/connection",
    method: "get",
  });
}
// 登录
export function login (data) {
  return request({
    url: "login",
    method: "post",
    data,
  });
}
// 验证码
export function getCode (data) {
  return request({
    url: "sendCode",
    method: "post",
    data,
  });
}
// 注册
export function register (data) {
  return request({
    url: "register",
    method: "post",
    data,
  });
}
export function getArticleList (data) {
  return request({
    url: "v1/articleList",
    method: "get",
    data,
  });
}
export function getArticleInfo (id) {
  return request({
    url: `v1/listInfo?id=${id}`,
    method: "get",
  });
}
export function publishArticle (data) {
  return request({
    url: `v1/publish`,
    method: "PUT",
    data,
  });
}