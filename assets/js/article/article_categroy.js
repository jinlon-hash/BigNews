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
  $('.addCate').on('click', function () {
    layer.open({
      type: 1,
      title: '添加文章分类',
      area:'500px',
      content: $('#addForm').html(),
      //获取所有子内容
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
