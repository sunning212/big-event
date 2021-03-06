$(function () {
  // 1.1
  var $image = $('#image');

  // 1.2
  var options = {
    // 纵横比 16 / 9,  1正方形
    aspectRatio: 1,
    // 指定预览区域
    preview: '.img-preview',
  };

  // 1.3 创建裁剪区域
  $image.cropper(options);

  // 文件上传
  $('#btn-upload').click(function () {
    $('#file').click();
  });
  $('#file').on('change', function (e) {
    console.log(e.target.files);
    // 1. 获取图片对象
    var file = e.target.files[0];
    // 2. 根据选择的文件，创建一个对应的 URL 地址：
    var newImgURL = URL.createObjectURL(file);
    // console.log(newImgURL)
    $image
      .cropper('destroy') // 销毁旧的裁剪区域
      .attr('src', newImgURL) // 重新设置图片路径
      .cropper(options); // 重新初始化裁剪区域
  });

  // 更换头像
  $('#sure').click(function () {
    var dataURL = $image
      .cropper('getCroppedCanvas', {
        width: 100,
        height: 100,
      })
      .toDataURL('image/png');

    $.ajax({
      type: 'post',
      url: '/my/update/avatar',
      data: { avatar: dataURL },
      success: function (res) {
        if (res.status === 0) {
          window.parent.getUserInfo();
        }
      },
    });
  });
});
