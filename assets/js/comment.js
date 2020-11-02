// $(function () {
//   $.ajaxPrefilter(function (options) {
//     // console.log(options);
//     // 这个函数中的options选项就包含着$.ajax()函数中的对象数据
//     options.url = 'http://ajax.frontend.itheima.net' + options.url;
//     if(options.url.includes('/my')){
//       options.headers={
//         Authorization:
//         window.localStorage.getItem('token')
//       }
//     }
//   });

// });
/**
 * 这是一个公共的文件，用来处理一些公共的事物
 */
// ajaxPrefilter 此方法是一个过滤器 可以处理一些公用的数据
// 可以获取到发送给服务器端的一些参数数据
// 此方法的执行时机，是每次发送ajax之前都会先执行这个函数
$.ajaxPrefilter(function (options) {
  // console.log(456);
  console.log(options);
  // options参数当中存储着发送给服务器的所有的参数，是在发送Ajax的时候获取到的
  // console.log(options.url); // '/api/reguser'
  options.url = 'http://ajax.frontend.itheima.net' + options.url;

  // 统一设置token
  // 1. 只要发送Ajax请求就会通过这个拦截器中的options拿到所有的参数
  // 2. 登陆和注册是不需要携带token的
  // 3. 因此我们可以根据url中是否存在'/my'来判断是否要携带token
  if (options.url.includes('/my')) {
    options.headers = {
      Authorization: window.localStorage.getItem('token'),
    };
  }

  // 统一开启权限验证
  options.complete = function (res) {
    // 可以根据服务器端响应回来的数据内容进行判断 ，是否要跳转到登陆页面
    // 可以根据服务器端响应回来的结果进行一个后续业务处理 也就是权限验证
    if (
      res.responseJSON.status == 1 &&
      res.responseJSON.message == '身份认证失败！'
    ) {
      // 应该要先到登陆页面进行登陆 开启了权限验证
      window.location.href = './login.html';
    }
  };

  // 能够知道jQuery中ajaxPrefilter函数的作用
  // 能够知道iframe标签如何进行使用
  // 能够知道jQuery中如何设置Authorization请求头字段
  // 能够说出退出登录时需要做哪两件事情
});
