$('#logo').on('change',function() {
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
        $('#preview').prop('src',res[0].avatar);
        }
    })
})

$('#settingsForm').on('submit',function() {
    $.ajax({
        type:'post',
        url:'/settings',
        data:$(this).serialize(),
        success:function() {
            location.reload()
        }

    })
    return false;
})

//发送ajax，获取网页配置信息
$.ajax({
    type:'get',
    url:'/settings',
    success:function(res) {
        console.log(res);
        if(res) {
        $('#hiddenImg').val(res.logo);
        $('#preview').prop('src',res.logo);
        $('input[name="title"]').val(res.title)
        $('input[name="comment"]').prop('checked',res.comment);
        $('inout[name="review"]').prop('checked',res.review);
        }
        
    }
})