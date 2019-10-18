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