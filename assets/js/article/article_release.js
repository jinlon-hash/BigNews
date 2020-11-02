$(function () {
  initEditor();
  $img = $('#image');
  var option = {
    aspectRatio: 400/280, //裁切比例
    preview: '.img-preview',
  };
  $img.cropper(option);

  $('.btn-file').on('click', function () {
    $('#avatar').click();
  });
  var $avatar = $('#avatar');
  $avatar.on('change', function () {
    var imgSrc = URL.createObjectURL(this.files[0]);
    $img.cropper('replace', imgSrc);
  });
});
