$(function () {
  // 获取分类数据
  initTable();

  function initTable() {
    $.get('/my/article/cates', function (res) {
      if (res.status === 0) {
        // console.log(res.data);
        var strHtml = template('tpl-table', res);
        $('tbody').html(strHtml);
      }
    });
  }

  var addIndex = 0;
  var editIndex = 0;

  // 添加分类
  $('#addBtn').on('click', function (e) {
    e.preventDefault();

    var strAddHtml = $('#tpl-add').html();
    addIndex = layui.layer.open({
      type: 1,
      area: ['500px', '250px'],
      title: '添加文章分类',
      content: strAddHtml,
    });
  });
  // 事件委托-添加分类
  $('body').on('submit', '#addForm', function (e) {
    e.preventDefault();
    var formdata = $(this).serialize();
    $.post('/my/article/addcates', formdata, function (res) {
      //   console.log(res);
      if (res.status === 0) {
        // console.log(res.message);
        layui.layer.close(addIndex);
        initTable();
      }
    });
  });

  // 编辑分类
  $('tbody').on('click', '.btn-edit', function (e) {
    e.preventDefault();
    strEdit = $('#tpl-edit').html();
    editIndex = layui.layer.open({
      type: 1,
      area: ['500px', '250px'],
      title: '编辑文章分类',
      content: strEdit,
    });

    var Id = $(this).attr('data-id');

    $.get('/my/article/cates/' + Id, function (res) {
      //   console.log(res);
      if (res.status === 0) {
        // console.log(res.data);
        layui.form.val('editForm', res.data);
      }
    });
  });

  // 事件委托-编辑修改分类
  $('body').on('submit', '#editForm', function (e) {
    e.preventDefault();
    var formdata = $(this).serialize();
    $.post('/my/article/updatecate', formdata, function (res) {
      //   console.log(res);
      if (res.status === 0) {
        layui.layer.close(editIndex);
        initTable();
      }
    });
  });

  // 事件委托-删除分类
  $('tbody').on('click', '.btn-delete', function (e) {
    e.preventDefault();
    var Id = $(this).attr('data-id');
    layer.confirm('Sure?', { icon: 3, title: '真的要把我删除嘛？' }, function (
      index
    ) {
      //do something
      $.get('/my/article/deletecate/' + Id, function (res) {
        if (res.status === 0) {
          initTable();
          layer.close(index);
        }
      });
    });
  });
});
