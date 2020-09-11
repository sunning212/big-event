$(function () {
  // 昵称校验
  layui.form.verify({
    nickname: function (value) {
      if (value.length > 6) {
        return '昵称必须在1~6个字符之间';
      }
    },
  });

  // 获取登录用户信息
  getUserInfo();
  function getUserInfo() {
    $.get('/my/userinfo', function (res) {
      //   console.log(res);

      if (res.status === 0) {
        // return layui.layer.msg(res.message);
        layui.form.val('formInfo', res.data);
      }
    });
  }

  // 重置按钮
  $('#reset-btn').on('click', function (e) {
    e.preventDefault();
    getUserInfo();
  });

  // 更新用户信息
  $('#formupdate').on('submit', function (e) {
    e.preventDefault();
    $.post('/my/userinfo', $(this).serialize(), function (res) {
      console.log(res);
      if (res.status === 0) {
        window.parent.getUserInfo();
      }
    });
  });
});
