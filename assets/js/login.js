$(function () {
  // 注册/登录表单切换
  $('#link-login').on('click', function () {
    $('.login-box').hide();
    $('.reg-box').show();
  });
  $('#link-reg').on('click', function () {
    $('.reg-box').hide();
    $('.login-box').show();
  });

  // 密码框校验
  layui.form.verify({
    // 校验注册的密码框
    password: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
    // 校验注册的再次输入密码框
    repassword: function (value) {
      if ($('#psd').val() !== value) {
        return '密码不一致';
      }
    },
  });

  // 发送注册请求
  $('#form-reg').on('submit', function (e) {
    // 阻止默认行为
    e.preventDefault();

    // 获取表单数据
    var formdata = {
      username: $('.reg-box [name=username]').val(),
      password: $('.reg-box [name=password]').val(),
    };
    // console.log(formdata);
    // 发送请求
    $.post('/api/reguser', formdata, function (res) {
      // if (res.status === 0) {
      //   // console.log(res.message);
      //   layer.msg(res.message);
      //   $('.reg-box').hide();
      //   $('.login-box').show();
      //   $('#form-reg')[0].reset();
      // } else {
      //   // console.log(res.message);
      //   layer.msg(res.message);
      // }
      layui.layer.msg(res.message);
      res.status === 0 && $('#link-reg').click();
    });
  });

  // 发送登录请求
  $('#form-login').on('submit', function (e) {
    e.preventDefault();
    var formdata = $(this).serialize();

    $.post('/api/login', formdata, function (res) {
      if (res.status === 0) {
        window.location.href = './index.html';
        res.token.length !== 0 &&
          window.localStorage.setItem('token', res.token);
      }
      layui.layer.msg(res.message);
    });
  });
});
