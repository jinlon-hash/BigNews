$(function () {
  getLists();
  function getLists() {
    //第一步是获取并渲染
    $.ajax({
      type: 'GET',
      url: '/my/article/cates',
      success: function (info) {
        // layer.msg(info.message);
        console.log(info);
        var artList = template('artList', info);
        $('.lists').html(artList);
      },
    });
  }

  //添加分类布局
  $('.addCate').on('click', function () {
    window.addIndex = layer.open({
      type: 1,
      title: '添加文章分类',
      area: '500px',
      content: $('#addForm').html(),
      //获取所有子内容
    });

    //添加文章分类  点击确认添加  添加分类
    //动态生成的  需要事件委托  因为要收集表单数据 所以注册给form
    $('body').on('submit', '.addForm', function (e) {
      e.preventDefault();
      $.ajax({
        type: 'POST',
        url: '/my/article/addcates',
        data: $(this).serialize(),
        success: function (info) {
          //添加成功后隐藏模态框
          layer.msg(info.message);

          if (info.status === 0) {
            layer.close(addIndex);
            getLists();
            //调用渲染分类列表
          }
        },
      });
    });
  });
  //实现删除功能  动态生成的要事件委托  通过id来删除
  $('tbody').on('click', '.btn-del', function () {
    //可以用来获取标签中自定义属性的内容
    var categoryId = $(this).data('id');
    layer.confirm('确定删除?', { icon: 3, title: '提示' }, function (index) {
      $.ajax({
        type: 'get',
        url: '/my/article/deletecate/' + categoryId,
        success: function (res) {
          if (res.status == 0) {
            // 4.5 删除成功后要进行提示
            layer.msg(res.message);

            // 4.6 刷新分类列表数据
            getLists();
          }
        },
      });
      layer.close(index);
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
