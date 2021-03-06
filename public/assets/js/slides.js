$.ajax({
    type:'get',
    url:'/slides',
    success:function(res) {
        var html = template('slidesTpl',{data:res});
        $('#slidesBox').html(html);
    }
})

$('#file').on('change',function() {
    //获取到当前文件的数据（二进制的数据）
    var fd = new FormData();
    fd.append('avatar',this.files[0]);
    $.ajax({
        type:'post',
        url:'/upload',
        data:fd,
        processData:false,
        contentType:false,
        success:function(res){
        $('#hiddenImg').val(res[0].avatar);
        }
    })
})
$('#slidesForm').on('submit',function() {
    $.ajax({
        type:'post',
        url:'/slides',
        data:$(this).serialize(),
        success:function() {
            location.reload();
        }
    })
    return false;
})
$('#slidesBox').on('click','.delete',function() {
    var id = $(this).attr('data-id');
    $.ajax({
        type:'delete',
        url:`/slides/${id}`,
        success:function() {
            location.reload();
        }
    })
})