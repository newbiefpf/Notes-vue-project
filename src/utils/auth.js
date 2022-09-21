// token
export function getToken () {
  const token = JSON.parse(localStorage.getItem("userInfo")).token
  return token
}
export function removeUserInfo () {
  return localStorage.removeItem("userInfo")
}
export function getUserInfo () {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"))
  return userInfo
}





