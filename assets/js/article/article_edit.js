$(function () {
  initEditor();
  $img = $('#image');
  var option = {
    aspectRatio: 400 / 280, //裁切比例
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

  //分类下拉选框
  $.ajax({
    type: 'GET',
    url: '/my/article/cates',
    success: function (info) {
      if (info.status == 0) {
        //模板引擎添加数据
        var artList = template('categoryList', info);
        $('#category').html(artList);
        //重新用layui的方法进行渲染下拉框 因为生成的都是dl  dd
        layui.form.render();
        geiArticleDaraById();
      }
    },
  });
  //通过编辑文章的id获取其信息-----------------
  var articleId = location.search.slice(4);
  console.log(articleId);

  //编辑页的数据回显
  function geiArticleDaraById() {
    $.ajax({
      type: 'get',
      ulr: '/my/article/' + articleId,
      success: function (res) {
        console.log(res);
        if (res.status == 0) {
          layui.form.val('myForm', {
            Id: res.data.Id,
            title: res.data.title,
            cate_id: res.data.cate_id,
          });
          tinyMCE.activeEditor.setContent(res.data.content);
          // $('#image')
          //   .cropper.attr(
          //     'src',
          //     'http://ajax.frontent.itheima.net' + res.data.cover_img
          //   )
          //   .cropper(option);
        }
      },
    });
  }

  //万事俱备 就等发布文章
  //给form注册事件  获取数据
  $('.myForm').on('submit', function () {
    //用fd获得数据  文章标题  文章类别  文章内容
    //但是图片上传和文章状态需要自定义
    $.ajax({
      type: 'post',
      url: '/my/article/add',
    });
  });
  //给两个按钮同时注册事件
  $('.btn').on('click', function (e) {
    e.preventDefault();
    //准备数据
    var fd = new FormData($('.myForm')[0]);
    // e.target----当前事件源  等同于this
    if ($(this).hasClass('btn-release')) {
      //发布按钮  因为发布和存草稿冲突 二选一 所以我们得手动添加数据
      fd.append('state', '已发布');
    } else {
      // 存为草稿
      fd.append('state', '草稿');
    }
    //准备图片的二进制
    $('#image')
      .cropper('getCroppedCanvas', {
        width: 400,
        height: 280,
      })
      .toBlob(function (blob) {
        fd.append('cover_img', blob);
        //手动获得富文本的值
        fd.append('content', tinyMCE.activeEditor.getContent());
        //数据都收集完后发Ajax请求
        $.ajax({
          type: 'post',
          url: '/my/article/add',
          contentType: false,
          processData: false,
          data: fd,
          success: function (res) {
            layer.msg(res.message);
            if (res.status == 0) {
              //成功的话跳转到列表页
              location.href = './article_list.html';
            }
          },
        });
      });
  });
});
