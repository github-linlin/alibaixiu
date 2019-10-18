//获取分类的ajax数据
$.ajax({
    type:'get',
    url:'/categories',
    success:function(res) {
        var html = template('categoryTpl',{data:res})
        $('#category').html(html);
    }
})

//图片上传功能
$('#feature').on('change',function() {
    var fd = new FormData();
    fd.append('avater',this.files[0]);
    $.ajax({
        type:'post',
        url:'/upload',
        data:fd,
        processData:false,
        contentType:false,
        success:function(res) {
            console.log(res);
            $('.thumbnail').attr('src',res[0].avater).show();
            $('#thumbnail').val(res[0].avater);

        }
    })
})

$('#addForm').on('submit',function() {
    $.ajax({
        type:'post',
        url:'/posts',
        data:$(this).serialize(),
        success:function(res) {
            location.href = 'posts.html'
            
        }
    })
    return false;
})