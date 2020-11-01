$(function () {
  //1.获取下拉框文章分类数据
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
  //页数什么的都是相当于绑定的  不能写死
  // 所以单独提出来
  var params = {
    pagenum: 1,
    pagesize: 3,
    cate_id: $('#category').val(), //默认所有分类
    state: $('#state').val(), //默认所有状态
  };
  renderList();
  //2.文章列表页中的数据渲染
  function renderList() {
    $.ajax({
      type: 'get',
      url: '/my/article/list',
      data: params,
      success: function (res) {
        // layer.msg(res.message);
        console.log(res);
        var htmlStr = template('articleList', res);
        $('tbody').html(htmlStr);
        renderPages(res)
      },
    });
  }

  //实现文章筛选功能，要根据条件来进行筛选
  // 给form表单注册submit事件
  $('.myForm').on('submit', function (e) {
    e.preventDefault();
    params.cate_id = $('#category').val();
    //最新的分类
    params.state = $('#state').val();
    //最新的状态
    renderList();
  });

  //分页js代码
  // 封装一下  因为总条数不确定
  // 所以得按照获取的数据来
  function renderPages(res) {
    var laypage = layui.laypage;
    //执行一个laypage实例
    laypage.render({
      elem: 'test1',
      //注意，这里的 test1 是 ID，不用加 # 号
      count: res.total,
      //数据总数，从服务端得到
      limit: params.pagesize,
      curr: params.pagenum,
      limits: [2, 3, 5, 10],
      group: 3,
      layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
      jump: function (obj, first) {
        //obj包含了当前分页的所有参数，比如：
        // console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
        // console.log(obj.limit); //得到每页显示的条数
        // console.log(first);
        params.pagenum = obj.curr;
        params.pagesize = obj.limit;

        //首次不执行
        if (!first) {
          // 首次跳转过来不执行，不是首次跳转过来
          renderList();
        }
      },
    });
  }
});
