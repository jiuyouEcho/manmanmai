/**
 * Created by Administrator on 2017/7/28.
 */
$(function(){

    var productId = getUrlParams("myid");

    $.ajax({
        type:"get",
        url:"http://127.0.0.1:3000/api/getproduct",
        dateType:"json",
        data:{productid:productId},
        success:function(data){

            console.log(data);

            //console.log(data);

            var productName = data.result[0].productName;
            productName = productName.substring(0,4);

            var productTag = '<li class="active">'+productName+'</li>';



            var categoryId = data.result[0].categoryId;
        //Â·¾¶µ¼º½
            $.ajax({
                type:'get',
                url:'http://127.0.0.1:3000/api/getcategorybyid',
                data:{categoryid:categoryId},
                dataType:'json',
                success:function(data){

                    console.log(data);
                    var categoryName = data.result[0].category;

                    var  categoryTag= '<li><a href="category.html">'+categoryName+'</a></li>';
                    $("#product >nav >ol").append(categoryTag);
                    $("#product >nav >ol").append(productTag);

                }
            });

            var productDesc = template("product-desc-template",data);
            $("#product >.product-desc").html(productDesc);

            var productList = template("product-list-template",data);
            $("#product >.product-compare-buy").append(productList);

            $.ajax({
                type:'get',
                url:'http://127.0.0.1:3000/api/getproductcom',
                dataType:'json',
                data:{productid:productId},
                success:function(data){
                    //console.log(data);

                        var productComment = template("product-comment-template",data);
                        $("#product >.product-comment").append(productComment);

                }
            });

        }
    });
});
