$(function () {
  var form = layui.form;
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

        //对应的每一项进行渲染  layui的内置模块--表单--表单赋值/取值
        // layui.form.val('myForm', msg.data);

        form.val('myForm', {
          username: msg.data.username,
          nickname: msg.data.nickname,
          email: msg.data.email,
        });
      }
    },
  });

  //第二步 ：表单校验

  form.verify({
    nickname: function (value, item) {
      //value：表单的值、item：表单的DOM对象
      if (!new RegExp('^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$').test(value)) {
        return '昵称不能有特殊字符';
      }
      if (/(^\_)|(\__)|(\_+$)/.test(value)) {
        return "昵称首尾不能出现下划线'_'";
      }
    },
  });
  //第三步：表单的submit事件，收集更改信息，然后完成数据交互进行修改
  $('.myForm').on('submit', function (e) {
    e.preventDefault();
    $.ajax({
      type: 'post',
      url: '/my/userinfo',
      //表单序列化，会将form标签内的所有带有name属性的值一并获取并拼接成查询字符串格式
      data: $(this).serialize(),
      success: function (info) {
        if (info.status == 0) {
          layer.msg(info.message);
        }
      },
    });
  });
});
