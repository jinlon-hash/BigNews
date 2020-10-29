$(function () {
  getUserInfo();
  function getUserInfo() {
    $.ajax({
      type: 'get',
      url: '/my/userinfo',
      success: function (res) {
        // console.log('success中的输出', res);
        if (res.status == 0) {
          // 1.2 将昵称或用户名与头像渲染到对应位置
          // 左侧欢迎语
          $('.userInfo .welcome').html(
            `欢迎&nbsp;&nbsp;${
              res.data.nickname ? res.data.nickname : res.data.username
            }`
          );
          // 左侧欢迎语的头像位置
          if (!res.data.user_pic) {
            // 没有头像
            if (!res.data.nickname) {
              $('.userInfo .text-avatar,.layui-header .text-avatar').text(
                res.data.username.slice(0, 1).toUpperCase()
              );
            } else {
              $('.userInfo .text-avatar,.layui-header .text-avatar').text(
                res.data.nickname.slice(0, 1).toUpperCase()
              );
            }
          } else {
            // 显示对应的头像
            $('.userInfo .text-avatar,.layui-header .text-avatar')
              .hide()
              .next()
              .show()
              .attr('src', res.data.user_pic);
          }
        }
      },
    });
  }

  window.getUserInfo = getUserInfo;

  //实现退出功能
  $('.logout').on('click', function () {
    layer.confirm('真的要退出吗?', { icon: 3, title: '提示' }, function (
      index
    ) {
      //do something
      // 2.2 删除本地存储中的token
      window.localStorage.removeItem('token');

      // 2.3 跳转到登陆页面
      location.href = './login.html';

      // 隐藏当前弹出层
      layer.close(index);
    });
  });
});
