$(function () {
  $.ajax({
    type: 'GET',
    url: '/my/article/cates',
    success: function (info) {
      layer.msg = info.message;
      console.log(info);
      var artList = template('artList', info);
      $('.lists').html(artList);
    },
  });

  //添加分类布局
  $('.addCate').on('click', function () {
    layer.open({
      type: 1,
      title: '添加文章分类',
      area: '500px',
      content: $('#addForm').html(),
      //获取所有子内容
    });

    //添加文章分类  点击确认添加  添加分类
    //动态生成的  需要事件委托  因为要收集表单数据 所以注册给form
    $('body').on('click', '.myForm', function (e) {
      e.preventDefault();
      $.ajax({
        type: 'POST',
        url: '/my/article/addcates',
        data: $(this).serialize(),
        success:function(info){
          //添加成功后隐藏模态框
          var close
        }
      });
    });
  });
  //卡住
  //卡住
  //卡住
  //卡住
  //卡住
  //卡住
  //卡住
  //卡住
  //卡住
  //卡住
  //卡住
  //卡住
  //卡住
  //卡住
  //卡住
  //卡住
  //卡住
  //卡住
  //卡住
});
