//获取地址栏上的id值
// var categoryI = location.search.split('=')[1]  没有通用性


var key = getUrlParams('key');
$.ajax({
    type:'get',
    url:'/posts/search/'+key,
    success:function(res) {
        console.log(res);
        var html = template('listTpl',{data:res})
        $('#listBox').html(html);
        $('.new h3').text(res[0].category.title)
    }
})

