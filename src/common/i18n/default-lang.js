window.getUrlQuery = function (url) {
  var obj = {}
  if (url.indexOf("?") > -1) {
    let arr = url.split("?")[1].split("&")
    for (var i = 0; i < arr.length; i++) {
      var tempArr = arr[i].split("=")
      obj[tempArr[0]] = tempArr[1]
    }
  }
  return obj
}
var params = window.getUrlQuery(location.href)
// 处理语言
var lang = localStorage.lang || ""
if (params.lang) {
  window.lang = params.lang
  localStorage.lang = window.lang
} else if (lang) {
  window.lang = lang
} else {
  window.lang = "en"
}
// 处理消息
if (params.token) {
  localStorage.setItem(token, params.token)
}
console.log("window", window.lang)
