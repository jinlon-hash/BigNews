$(function () {
  var form = layui.form;

  form.verify({
    repass: function (value, item) {
      // item是当前的确认密码框元素
      // value是当前确认密码框中输入的值
      // 2.1 获取密码框中的输入内容
      var passVal = $('.myForm .pass').val();
      // 2.2 判断两次输入的密码是否相同
      if (passVal !== value) {
        // 2.3 清空密码框并添加提示
        $('.myForm .pass,.myForm .repass').val('');
        return '两次密码不一致,请重新输入';
      }
    },
    pass: [/^[\d]{6,12}$/, '密码必须6到12位数字，且不能出现空格'],
  });

  $('.myForm').on('submit', function (e) {
    e.preventDefault();
    $.ajax({
      type: 'POST',
      url: '/my/updatepwd',
      data: $(this).serialize(),
      //原密码 接口那边会给我们校验
      success: function (info) {
        layer.msg(info.message);
        if (info.status === 0) {
          $('.myForm')[0].reset();
        }
        console.log(info);
      },
    });
  });
});
