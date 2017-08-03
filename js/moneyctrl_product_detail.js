/**
 * Created by Administrator on 2017/7/31.
 */
$(function(){
    var productId = getUrlParams("myid");
    $.ajax({
        type:'get',
        url:'http://127.0.0.1:3000/api/getmoneyctrlproduct',
        dataType:'json',
        data:{productid:productId},
        success:function(data){
            console.log(data);
            var html = template("moneyctrl-product-detail-template",data);
            $("#product >.product-detail").html(html);
        }
    });

    //评论
    $("#comment >.comment-container >textarea").focus(function(){
        $(this).html("");
    });
    $("#btn").click(function(){
        var main = $("#comment >.comment-container >textarea").val();
        var liTag = "";
        liTag+="<li><span>"+main+"</span><input type='button' value='删除' /></li>";
        $("#comment >ul").prepend(liTag);
        $("#comment >.comment-container >textarea").val('');

        $("#comment >ul >li >input").click(function(){
            $(this).parents()[0].remove();

        });
    });
});