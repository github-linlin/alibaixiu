$.ajax({
    type:'get',
    url:'/posts',
    success:function(res) {
        console.log(res);
        
        var html = template('postsTpl',res);
        $('#postsBox').html(html)
    }
})

//定义一个个事哈事件的函数
function dateFormat(date) {
    date = new Date(date)
    return date.getFullYear()+'年'+(date.getMonth()+1) + '月' +date.getDate() + '日';

    
}