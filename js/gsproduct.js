/**
 * Created by Administrator on 2017/7/31.
 */
$(function(){
    //��ȡ�̵�����

    var isShopOpen = false;
    var isAreaOpen = false;

    $("#product >.product-nav >.dropdown:first-of-type >button").click(function(){


       if(isShopOpen){
           //���Ǵ򿪵ģ��ȹرյģ�����Ҫ�Ƴ�opend
           shopRemoveOpend();
       }else{
           shopAddOpend();
       }


        //$(this).toggleClass("opend");
    });

    $("#product >.product-nav >.dropdown:last-of-type >button").click(function(){

        if(isAreaOpen){
            //���Ǵ򿪵ģ��ȹرյģ�����Ҫ�Ƴ�opend
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


            //ͨ���Զ������Ի�ȡ�̵�id
            $("#product >.product-nav >.dropdown:first-of-type > ul >li >a").click(function(){

                $("#product >.product-nav >.dropdown:first-of-type > ul >li >a").removeClass("right");
                $(this).addClass("right");


                shopId = this.dataset["shopId"];
                getProductList();

                //�������ĵ������ƣ���Ӧ�ĸı�����ı���
                $("#product >.product-nav >.dropdown:first-of-type >button").html(data.result[shopId].shopName);
            });

            //��ȡ��������

            $.ajax({
                type:'get',
                dataType:'json',
                url:'http://127.0.0.1:3000/api/getgsshoparea',
                success:function(data){
                    console.log(data);
                    var area = template("area-info-template",data);
                    $("#product >.product-nav >.dropdown:last-of-type > ul").html(area);

                    //ͨ���Զ������Ի�ȡ����id
                    $("#product >.product-nav >.dropdown:last-of-type > ul >li >a").click(function(){

                        $("#product >.product-nav >.dropdown:last-of-type > ul >li >a").removeClass("right");
                        $(this).addClass("right");

                        //alert($(this).hasClass('right'));




                        areaId = this.dataset["areaId"];

                        //�������ĵ������ƣ���Ӧ�ĸı�����ı���
                        $("#product >.product-nav >.dropdown:last-of-type >button").html(data.result[areaId].areaName);

                        console.log(areaId);
                        getProductList();
                    });

               //��ȡ��Ʒ�б�
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