// 从本地存储获取token
var token = window.localStorage.getItem('token') || '';

$.ajaxPrefilter(function (options) {
  //  设置统一请求根路径
  options.url = 'http://ajax.frontend.itheima.net' + options.url;

  // 统一设置请求头
  options.headers = {
    Authorization: token,
  };
});
