$('#logout').on('click',function() {
    //确认
    var bool = confirm('确定要退出吗？')
    if(bool) {
        $.ajax({
            type:'post',
            url:'/logout',
            success:function() {
                //跳转到登录页面
                location.href = 'login.html'
            }
        })
    }
})

$.ajax({
    type:'get',
    url:`/users/${userId}`,
    success:function(res) {
        $('.profile .name').text(res.nickName);
        $('.profile img.avatar').attr('src',res.avatar);
        $('.profile').show();
    }
})