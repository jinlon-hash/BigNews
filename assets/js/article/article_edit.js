$(function () {
  // 1. 启用富文本编辑器
  initEditor();

  // 2. 创建裁切区
  // 2.1 获取裁剪区域的 DOM 元素
  var $img = $('#image');

  // 2.2 配置裁图选项
  const options = {
    // 纵横比
    aspectRatio: 400 / 280,
    // 指定预览区域
    preview: '.img-preview',
  };
  //上传图片功能块
  $('.btn-file').on('click', function () {
    $('#avatar').click();
  });
  var $avatar = $('#avatar');
  $avatar.on('change', function () {
    var imgSrc = URL.createObjectURL(this.files[0]);
    $img.cropper('replace', imgSrc);
  });

  // 2.3 创建裁剪区域
  $img.cropper(options);

  // 3. 文章分类数据的渲染
  // 3.1 立即发送ajax请示下拉框内容的数据回显
  $.ajax({
    type: 'get',
    url: '/my/article/cates',
    success: function (res) {
      // console.log(res)
      // 3.2 将数据渲染到下拉列表当中
      if (res.status == 0) {
        var htmlStr = template('categoryList', res);
        $('#category').html(htmlStr);

        // 重新渲染一下表单内容
        layui.form.render();

        //调用方法 进行数据回显
        getArticleDataById();
      }
    },
  });

  // 4. 待编辑文章的数据回显
  // 4.1 获取待编辑文章的id
  var articleId = location.search.slice(4);
  // console.log('当前待编辑的文章id为:'+articleId);

  // 4.2 向服务器端发送请示
  function getArticleDataById() {
    $.ajax({
      type: 'get',
      url: '/my/article/' + articleId,
      success: function (res) {
        console.log(res);
        // 4.3 渲染文章数据
        if (res.status == 0) {
          layui.form.val('myForm', {
            Id: res.data.Id, // 隐藏域Id
            title: res.data.title,
            cate_id: res.data.cate_id,
          });
          // 富文本编辑中的数据需要单独来渲染
          // tinyMCE.activeEditor.setContent(res.data.content);
          // 渲染图片
          $('#image')
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr(
              'src',
              'http://ajax.frontend.itheima.net' + res.data.cover_img
            ) // 重新设置图片路径
            .cropper(options);
        }
      },
    });
  }

  // 5. 图片的本地预览功能

  // 5. 更新文章
  // 5.1 给form表单注册click事件
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
    $img
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
          url: '/my/article/edit',
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
