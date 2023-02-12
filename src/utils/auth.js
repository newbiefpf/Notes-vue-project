export function getToken () {
  return JSON.parse(localStorage.getItem("access_token"))
}
export function setToken (token) {
  return localStorage.setItem("access_token", JSON.stringify(token))
}
export function getUserInfo () {
  return JSON.parse(localStorage.getItem("userInfo"))
}
export function setUserInfo (data) {
  return localStorage.setItem("userInfo", JSON.stringify(data))
}