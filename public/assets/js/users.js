//获取ajax数据
$.ajax({
    type:'get',
    url:'/users',
    success:function(res) {
        var html = template('usersTpl',{data:res});
        $('#usersTbody').html(html);
        
    }
})

//添加用户
$('#userForm').on('submit',function() {
    //jq提供的方法，可以自动的把当前表单的数据收集并序列化
    var formData = $(this).serialize();
    $.ajax({
        type:'post',
        url:'/users',
        data:formData,
        success:function(res) {
            location.reload();//刷新当前页面
            //如果不这样写，可以自己拼接str，然后追加到这里，页面可以不刷新
        }
        
    })
    return false; //兼容
})

//上传用户头像
// 使用事件委托，以为如果不使用事件委托，在修改用户信息的时候，绑定不到avatar
$('#modifyBox').on('change','#avatar',function() {
    var fd = new FormData();
    fd.append('avatar',this.files[0]);
    $.ajax({
        type:'post',
        url:'/upload',
        //jq默认传的是对象，会转换成key=value
        //但是我们现在数据文件上传，multipart/form-data 数据分开传
        processData:false,
        //jq会默认添加一行代码xhr.setRequestHeader('content-type','')
        contentType:false,
        data:fd,
        success:function(res) {
            $('#hiddenImg').val(res[0].avatar);
            // console.log(res[0].avatar);
            $('#preview').attr('src',res[0].avatar)
        }
    })
})


$('#usersTbody').on('click','.edit',function() {
    var id = $(this).attr('data-id');
    $.ajax({
        type:'get',
        url:'/users/'+id,
        success:function(res) {
            var html = template('modifyTpl',res);
            $('#modifyBox').html(html)
            
        }
    })
    
})
//  用事件委托给修改表单添加事件
$('#modifyBox').on('submit','#modifyForm',function() {
    var dataForm = $(this).serialize();
    var id = $(this).attr('data-id')
    $.ajax({
        type:'put',
        url:'/users/'+ id,
        data:dataForm,
        success:function(res) {
            location.reload();
        }
    })
    return false;
})


//删除用户
$('#usersTbody').on('click','.del',function() {
    if(confirm('您确定要删除吗'))  {
        var id= $(this).attr('data-id');
        $.ajax({
            type:'delete',
            url:'/users/'+id,
            success:function() {
                location.reload();
            }
        })
    }
})

//批量删除
$('#checkAll').on('click',function() {
    var bool = $(this).prop('checked');
    var checkList = $('#usersTbody input[type="checkbox"]');  //jq对象，把tbody中的所有input找到
    checkList.prop('checked',bool);
    if(bool) {
        $('#deleteAll').show();
    }else {
        $('#deleteAll').hide();
    }
})

$('#usersTbody').on('change','input[type="checkbox"]',function() {
    if($('#usersTbody input[type="checkbox"]').length == $('#usersTbody input[type="checkbox"]:checked').length) {
        $('#checkAll').prop('checked',true);
    }else {
        $('#checkAll').prop('checked',false);
    }
    if($('#usersTbody input[type="checkbox"]:checked').length > 0) {
        $('#deleteAll').show();
    }else {
        $('#deleteAll').hide();
    }
})

$('#deleteAll').on('click',function() {
    if(confirm('确定要删除吗')){
        var checkList = $('#usersTbody input[type="checkbox"]:checked');
        var str = '';
        checkList.each(function(index,item) {
            str += $(item).attr('data-id') +'-';
        })
        str = str.substr(0,str.length-1);
        $.ajax({
            type:'delete',
            url:'/users/' + str,
            success:function() {
                location.reload();
            }
        })
    }
    
    
})