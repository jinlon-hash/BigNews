$(function () {
  $.ajax({
    type: 'GET',
    url: '/my/article/cates',
    success: function (info) {
      if (info.status == 0) {
        var artList = template('categoryList', info);
        $('#category').html(artList);
        layui.form.render();
      }
    },
  });
});
