/**
 * Created by Administrator on 2017/7/31.
 */
$(function(){
    //获取商店名称

    var isShopOpen = false;
    var isAreaOpen = false;

    $("#product >.product-nav >.dropdown:first-of-type >button").click(function(){


       if(isShopOpen){
           //不是打开的，既关闭的，所以要移除opend
           shopRemoveOpend();
       }else{
           shopAddOpend();
       }


        //$(this).toggleClass("opend");
    });

    $("#product >.product-nav >.dropdown:last-of-type >button").click(function(){

        if(isAreaOpen){
            //不是打开的，既关闭的，所以要移除opend
            areaRemoveOpend();
        }else{
            areaAddOpend();
        }
      //  $(this).toggleClass("opend");
    });





    var shopId = 0;
    var areaId = 0;
    getProductList();
    $.ajax({
        type:'get',
        dataType:'json',
        url:'http://127.0.0.1:3000/api/getgsshop',
        success:function(data){
            console.log(data);
            var shop = template("shop-info-template",data);
            $("#product >.product-nav >.dropdown:first-of-type > ul").html(shop);


            //通过自定义属性获取商店id
            $("#product >.product-nav >.dropdown:first-of-type > ul >li >a").click(function(){

                $("#product >.product-nav >.dropdown:first-of-type > ul >li >a").removeClass("right");
                $(this).addClass("right");


                shopId = this.dataset["shopId"];
                getProductList();

                //点击下面的店铺名称，相应的改变上面的标题
                $("#product >.product-nav >.dropdown:first-of-type >button").html(data.result[shopId].shopName);
            });

            //获取地区名称

            $.ajax({
                type:'get',
                dataType:'json',
                url:'http://127.0.0.1:3000/api/getgsshoparea',
                success:function(data){
                    console.log(data);
                    var area = template("area-info-template",data);
                    $("#product >.product-nav >.dropdown:last-of-type > ul").html(area);

                    //通过自定义属性获取地区id
                    $("#product >.product-nav >.dropdown:last-of-type > ul >li >a").click(function(){

                        $("#product >.product-nav >.dropdown:last-of-type > ul >li >a").removeClass("right");
                        $(this).addClass("right");

                        //alert($(this).hasClass('right'));




                        areaId = this.dataset["areaId"];

                        //点击下面的店铺名称，相应的改变上面的标题
                        $("#product >.product-nav >.dropdown:last-of-type >button").html(data.result[areaId].areaName);

                        console.log(areaId);
                        getProductList();
                    });

               //获取商品列表
                }
            });

        }
    });
    function getProductList(){
        $.ajax({
            type:'get',
            dataType:'json',
            url:'http://127.0.0.1:3000/api/getgsproduct',
            data:{shopid:shopId,areaid:areaId},
            success:function(data){
                console.log(data);
                var productinfo = template("product-info-template",data);
                $("#product >.product-list >.row").html(productinfo);
            }
        });
    }


  function shopAddOpend(){
      areaRemoveOpend();
      $("#product >.product-nav >.dropdown:first-of-type >button").addClass("opend");
      isShopOpen = true;
  }
  function shopRemoveOpend(){
      $("#product >.product-nav >.dropdown:first-of-type >button").removeClass("opend");
      isShopOpen = false;
  }

  function areaAddOpend(){
      shopRemoveOpend();
      $("#product >.product-nav >.dropdown:last-of-type >button").addClass("opend");
      isAreaOpen = true;
  }
  function areaRemoveOpend(){
      $("#product >.product-nav >.dropdown:last-of-type >button").removeClass("opend");
      isAreaOpen = false;
  }




});