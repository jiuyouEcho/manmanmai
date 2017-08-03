/**
 * Created by Administrator on 2017/7/30.
 */
$(function(){
    $.ajax({
        type:'get',
        url:'http://127.0.0.1:3000/api/getcoupon',
        dateType:'json',
        success:function(data){
            console.log(data);
            var coupon_template = template('coupon-template',data);
            $("#coupon >.coupon-list").html(coupon_template);
            var couponName = document.title;
            var navListTag = '';
            navListTag +='<li>'+couponName+'</li>';
            $("#nav >.breadcrumb ").append(navListTag);

        }
    });
});