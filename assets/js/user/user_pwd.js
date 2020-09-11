$(function () {
  layui.form.verify({
    len: [/^\S{6,12}$/, '长度必须6到12位，不能有空格'],

    //验证新旧密码不能相同
    diff: function (value) {
      var oldPwd = $('#oldPwd').val();

      if (value === oldPwd) {
        return '新密码不能和原密码相同';
      }
    },

    // 验证新密码和确认密码是否相同
    same: function (value) {
      var newPwd = $('#newPwd').val();

      if (value !== newPwd) {
        return '必须与新密码一致哦！';
      }
    },
  });

  // 修改密码
  $('#changePwd').on('click', function (e) {
    e.preventDefault();

    $.post('/my/updatepwd', $('#formInfo').serialize(), function (res) {
      console.log(res);
      if (res.status === 0) {
        $('#btn-reset').click();
      }
    });
  });
});
