
var id= getUrlParams('id');
$.ajax({
    type:'get',
    url:'/posts/'+id,
    success:function(res) {
       var html = template('detailTpl',res);
       $('.article').html(html);
        
    }
})

//点赞功能
$('.article').on('click','#like',function() {
    $.ajax({
        type:'post',
        url:  `/posts/fabulous/${id}`,
        success:function() {
            alert('点赞成功')
        }
    })
})
var state = 0;//评论状态是否需要审核
$.ajax({
    type:'get',
    url:'/settings',
    success:function (res) {
        if(res.review == false) {
            state = 0;
        }else {
            stste = 1;
        }
        if(res.comment ==true) {
            $('.comment').show();
        }
    }
})

//评论的提交功能
$('.comment form ').on('submit',function() {
    var content = $(this).find('textarea').val();
    $.ajax({
        type:'get',
        url:'/comments',
        data:{
            content:content,
            post:id,
            state:state
        },
        success:function(res){
            alert('评论成功')
            $(this).find('textarea').val('');
        }
    }) 
})