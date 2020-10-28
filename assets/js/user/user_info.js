$(function () {
  //第一步：获取用户登陆信息，将用户名渲染到用户表单框里
  $.ajax({
    type: 'get',
    url: '/my/userinfo',
    success: function (msg) {
      if (msg.status == 0) {
        console.log(msg);
        // $('.myForm input[name=username]').val(msg.data.username);
        // $('.myForm input[name=nickname]').val(msg.data.nickname);
        // $('.myForm input[name=email]').val(msg.data.email);
        layui.form.val('myForm',msg.data);
        //对应的每一项进行渲染  layui的内置模块--表单--表单赋值/取值
      }
    },
  });

  // 第二步：表单的submit事件，收集更改信息，然后完成数据交互进行修改
  $('.myForm').on('submit', function (e) {
    e.preventDefault();
    console.log('sadf');
    $({
      type: 'post',
      url: '/my/userinfo',
      data: layui.form.val('myForm'),
      success: function (info) {
        console.log(info);
      },
    });
  });
});
