/**
 * Created by Administrator on 2017/7/31.
 */
$(function(){
    $.ajax({
        type:'get',
        url:'http://127.0.0.1:3000/api/getsitenav',
        dataType:'json',
        success:function(data){
            console.log(data);
            var html = template("sitenav-template",data);
            $("#sitenav >.sitenav-list").html(html);
        }
    });
});