// 从本地存储获取token
var token = window.localStorage.getItem('token') || '';

$.ajaxPrefilter(function (options) {
  //  设置统一请求根路径
  options.url = 'http://ajax.frontend.itheima.net' + options.url;

  // 统一设置请求头
  if (options.url.includes('/my/')) {
    options.headers = {
      Authorization: token,
    };
  }

  // 统一判断token是否存在
  options.complete = function (res) {
    // console.log(res);
    if (
      res.responseJSON.status === 1 &&
      res.responseJSON.message === '身份认证失败！'
    ) {
      window.localStorage.removeItem('token');
      window.location.href = '/login.html';
    }
  };
});
