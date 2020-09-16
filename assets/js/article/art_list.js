$(function () {
  var q = {
    pagenum: 1,
    pagesize: 2,
    cate_id: '',
    state: '',
  };

  // 过滤器
  template.defaults.imports.formatDate = function (olddate) {
    var newtime = moment(olddate).format('MMMM Do YYYY, h:mm:ss a');
    return newtime;
  };

  // 获取数据
  initList();
  function initList() {
    $.get('/my/article/list', q, function (res) {
      if (res.status === 0) {
        // console.log(res);
        var strHtml = template('tpl-table', res);
        $('tbody').html(strHtml);
        renderPage(res.total);
      }
    });
  }

  // 下拉框
  initCate();
  function initCate() {
    $.get('/my/article/cates', function (res) {
      if (res.status === 0) {
        var strHtml = template('tpl-cate', res);
        $('#sct-cate').html(strHtml);
        layui.form.render();
      }
    });
  }

  // 筛选按钮
  $('#form-search').submit(function (e) {
    e.preventDefault();

    q.cate_id = $('[name=cate_id]').val();
    q.state = $('[name=state]').val();

    initList();
  });

  // 渲染分页
  function renderPage(total) {
    // console.log(totla);
    layui.use('laypage', function () {
      var laypage = layui.laypage;

      laypage.render({
        elem: 'page',
        count: total,
        curr: q.pagenum,
        limit: q.pagesize,

        limits: [2, 3, 5, 10],
        layout: ['count', 'limit', 'prev', 'next', 'skip'],

        jump: function (obj, first) {
          if (!first) {
            q.pagenum = obj.curr;
            q.pagesize = obj.limit;
            initList();
          }
        },
      });
    });
  }

  // 删除分类
  $('tbody').on('click', '.delete', function (e) {
    e.preventDefault();
    console.log($(this));

    var Id = $(this).attr('data-id');
    var len = $('.delete').length;

    layer.confirm('Sure?', { icon: 3, title: '删除文章' }, function (index) {
      $.get('/my/article/delete/' + Id, function (res) {
        if (res.status === 0) {
          if (len === 1) {
            q.pagenum = e.pagenum = 1 ? 1 : q.pagenum - 1;
          }
          layer.close(index);
          initList();
        }
      });
    });
  });

  // 编辑分类
  $('tbody').on('click', '.edit', function (e) {
    // console.log($(this));
    // e.preventDefault();
    window.location.href = '/article/art_pub.html';
    // // location.href = '/article/art_edit.html?id=' + $(this).attr('data-id');
    // location.href = '/article/art_edit.html?id=' + 32204;
  });
});
