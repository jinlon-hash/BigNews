$(function () {
  $img = $('#image');
  var option = {
    aspectRatio: 1, //裁切比例
    preview: '.img-preview',
  };
  $img.cropper(option);
  $('.btn').on('click', function () {
    $('#avatar').click();
  });
  var $avatar = $('#avatar');
  $avatar.on('change', function () {
    var imgSrc = URL.createObjectURL(this.files[0]);
    //替换的第一种写法
    // $img.cropper('destroy').attr('src', imgSrc).cropper(option);
    //替换的第二种写法
    $img.cropper('replace', imgSrc);
  });

  $('.btn-sure').on('click', function () {
    var imgURL = $img
      .cropper('getCroppedCanvas', {
        width: 100,
        height: 100,
      })
      .toDataURL();
    //发送Ajax请求，传数据换头像
    $.ajax({
      type: 'POST',
      url: '/my/update/avatar',
      data: {
        avatar: imgURL,
      },
      success: function (info) {
        layer.msg = info.message;
        if (info.status === 0) {
          parent.window.getUserInfo();
        }
      },
    });
  });
});
