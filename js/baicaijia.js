/**
 * Created by Administrator on 2017/7/30.
 */
$(function(){
    var startX = 0;
    $("ul").on("touchstart", function(e) {
        startX = e.originalEvent.touches[0].clientX;
        console.log(e);

    });
    $("ul").on("touchmove", function(e) {
        var moveX = e.originalEvent.touches[0].clientX;
        var offsetX = moveX-startX;//移动偏移量

        var oldTranslateX = 0;
        //console.log($("ul").css("transform"));
        if($("ul").css("transform") == "none"){
            oldTranslateX = 0;
        }else{
            oldTranslateX = parseInt($("ul").css("transform").split(",")[4]);
        }

        var newTranslateX = oldTranslateX + offsetX;

        //console.log(newTranslateX);
        $("ul").css({
            transform:"translateX("+newTranslateX+"px)",
            transition:"none"
        });
        startX = moveX;
    });

    $("ul").on("touchend",function(e){
        var finalTranslateX = parseInt($("ul").css("transform").split(",")[4]);
        console.log(finalTranslateX);
        var maxTranslateX = -$("ul").width()+$(".product-nav").width();
        console.log(maxTranslateX);
        if(finalTranslateX > 0){
            finalTranslateX = 0;
        }else if(finalTranslateX < maxTranslateX){
            finalTranslateX = maxTranslateX;
        }
        $("ul").css({
            transform: "translateX(" + finalTranslateX + "px)",
            transition: "transform 500ms"
        });
    })

    $.ajax({
        type: 'get',
        url:'http://127.0.0.1:3000/api/getbaicaijiatitle',
        dataType:'json',
        success:function(data){

            console.log(data);
            var html = template("baicaijia-title",data);
            $("#product >.product-nav >ul").append(html);

            //获取nav中ul的长度
            var total = data.result.length;
            $("#product >.product-nav >ul").css({
                width:total*100+"px"
            });

            getProductList(data.result[0].titleId);

            $("ul >li:first-of-type >a").addClass("checked");
            $("ul > li> a").click(function(){
                $("ul > li >a").removeClass("checked");

                $(this).addClass("checked");
                var targetTitleId = this.dataset["titleId"];
                getProductList(targetTitleId);

                return false;
            })


        }
    });

    function getProductList(titleId){
        $.ajax({
            url:'http://127.0.0.1:3000/api/getbaicaijiaproduct',
            dataType:'json',
            data:{titleid:titleId},
            success:function(data){
                console.log(data);
                var html = template("recommend-template",data);
                $("#product >.product-list").html(html);
            }
        });
    }


});