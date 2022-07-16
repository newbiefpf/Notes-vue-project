import request from "@/utils/request.js";

// 测试
export function ping() {
  return request({
    url: "/v1/ping",
    method: "get",
  });
}