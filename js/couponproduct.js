/**
 * Created by Administrator on 2017/7/31.
 */
$(function(){
    var couponId = getUrlParams("myid");
    $.ajax({
        type:'get',
        url:'http://127.0.0.1:3000/api/getcouponproduct',
        dataType:'json',
        data:{couponid:couponId},
        success:function(data){
            console.log(data);
            var html = template("product-list-template",data);
            $("#product").append(html);

        }
    });
});