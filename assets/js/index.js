$(function () {
  $.ajax({
    type: 'GET',
    url: '/my/userinfo',
    success: function (res) {
      console.log(res);
      if (res.status == 0) {
        // 替换成真正的欢迎语
        $('.userInfo .welcome').html(`欢迎&nbsp;&nbsp;${res.data.username}`); // 是要显示头像图片还是显示字母头像要进行判断

        if (res.data.user_pic) {
          // 让头像img显示出来
          $('.userInfo .layui-nav-img').show().attr('src', res.data.user_pic); // 顶部的图像也要显示出来
          $('.layui-header .layui-nav-img')
            .show()
            .attr('src', res.data.user_pic); // 让字母头像隐藏起来

          $('.userInfo .text-avatar,.layui-header .text-avatar').hide();
        } else {
          // 第一次登陆成功的时候 user_pic是一个null 'aaf'
          $('.userInfo .text-avatar').text(
            res.data.username.slice(0, 1).toUpperCase()
          ); // 顶部右侧字母头像如下显示

          $('.layui-nav .text-avatar').text(
            res.data.username.slice(0, 1).toUpperCase()
          );
        }
      }
    },
  });
});
