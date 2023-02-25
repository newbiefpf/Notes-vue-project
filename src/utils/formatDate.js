export function fmdata (val) {
  var date = new Date(val);
  var Y = date.getFullYear() + "-";
  var M = (date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1) + "-";
  var D = date.getDate() + " ";
  var h = date.getHours() + ":";
  var m = date.getMinutes() + ":";
  var s = (date.getSeconds() < 10 ? "0" + (date.getSeconds()) : date.getSeconds());
  return Y + M + D;
}
