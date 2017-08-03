/**
 * Created by Administrator on 2017/7/30.
 */
$(function () {
    //  $.ajax({
    //      type:'get',
    //      url:'http://127.0.0.1:3000/api/getinlanddiscount',
    //      dataType:'json',
    //      success:function(data){
    //          console.log(data);
    //          var html = template("inlanddiscount-list",data);
    //          $("#product>.product-list").html(html);
    //      }
    //  });

    var pageid = 1;
    var totalPage = 0;
    var isLoading = false;

        getInlanddiscount(pageid);

        $(window).scroll(function(){
            var totalHeight = $(document).height();  //ÄÚÈÝ¸ß
            var visibleHeight = $(window).height();  //ÆÁÄ»¸ß
            var footerHeight = $("#footer").height();
            var scrollTop = $(window).scrollTop();

            if(scrollTop>=totalHeight-visibleHeight-footerHeight){
                if(!isLoading){
                    if(pageid>=totalPage){
                        $("#product >.product-loading >img").css({
                            display: "none"
                        });
                        $("#product >.product-loading >.loading-finish").css({
                            display: "block"
                        });

                    }else{
                        pageid = pageid+1;
                        getInlanddiscount(pageid);
                    }
                }
            }
        });





    function getInlanddiscount(pageid){
        isLoading = true;
        setTimeout(function(){
        $.ajax({
            type: 'get',
            url: 'http://127.0.0.1:3000/api/getproductlist',
            dataType: 'json',
            data: {categoryid: 0, pageid: pageid},
            success: function (data) {
                var html = template("inlanddiscount-list", data);
                $("#product>.product-list").append(html);
                totalPage = Math.ceil(data.totalCount/data.pagesize);
                isLoading=false;
            }
        });
    },1000)
    }

});