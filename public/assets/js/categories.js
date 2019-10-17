$.ajax({
    type: 'get',
    url: '/categories',
    success: function (res) {
        var html = template('categoriesTpl', { data: res })
        $('#categoriesBox').html(html);

    }
})

//实现添加分类功能
$('#addCategory').on('submit', function () {
    $.ajax({
        type: 'post',
        url: '/categories',
        data: $(this).serialize(),
        success: function () {
            location.reload();
        }
    })
    return false;
})

//编辑功能
$('#categoriesBox').on('click', '.edit', function () {
    var id = $(this).attr('data-id');
    $.ajax({
        type: 'get',
        url: '/categories/' + id,
        success: function (res) {
            var html = template('modifyCategoriesTpl', res);
            $('#modifyCategories').html(html);

        }
    })
})

$('#modifyCategories').on('submit', '#modifyCategory', function () {
    var id = $(this).attr('data-id')
    $.ajax({
        type: 'put',
        url: '/categories/' + id,
        data: $(this).serialize(),
        success: function () {
            location.reload()
        }
    })
    return false;
})

