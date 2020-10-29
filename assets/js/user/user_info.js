$(function () {
  var form = layui.form;
  //第一步：获取用户登陆信息，将用户名渲染到用户表单框里
  getUserData();
  function getUserData() {
    $.ajax({
      type: 'get',
      url: '/my/userinfo',
      success: function (res) {
        if (res.status == 0) {
          console.log(res);
          // $('.myForm input[name=username]').val(res.data.username);
          // $('.myForm input[name=nickname]').val(res.data.nickname);
          // $('.myForm input[name=email]').val(res.data.email);

          //对应的每一项进行渲染  layui的内置模块--表单--表单赋值/取值
          // layui.form.val('myForm', res.data);

          form.val('myForm', {
            id: res.data.id,
            username: res.data.username,
            nickname: res.data.nickname,
            email: res.data.email,
          });
        }
      },
    });
  }

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
      if (/^\d+\d+\d$/.test(value)) {
        return '昵称不能全为数字';
      }
    },
  });
  //第三步：表单的submit事件，收集更改信息，然后完成数据交互进行修改
  $('.myForm').on('submit', function (e) {
    e.preventDefault();
    console.log($(this).serialize());
    $.ajax({
      type: 'post',
      url: '/my/userinfo',
      //表单序列化，会将form标签内的所有带有name属性的值一并获取并拼接成查询字符串格式
      data: $(this).serialize(),
      success: function (res) {
        console.log(res);
        layer.msg(res.message);
        if (res.status == 0) {
          //再次调用获取用户信息然后渲染的indexjs文件的函数
          parent.window.getUserInfo();
          //问题是提交的数据，重新调用函数的时候会不会传到函数里？
        }
      },
    });
  });
  $('.btn-reset').on('click', function (e) {
    console.log(123);
    e.preventDefault();
    getUserData();
  });
});
