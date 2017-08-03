/**
 * Created by Administrator on 2017/7/27.
 */
$(function(){

    var categoryId = getUrlParams("categoryid");
    var pageId = 1;

    getProductList(categoryId,pageId);

    function getProductList(categoryid,pageid){
        $.ajax({
            type:"get",
            url:"http://127.0.0.1:3000/api/getproductlist",
            dataType:"json",
            data:{categoryid:categoryid,pageid:pageid},
            success:function(data){
                goTop();
                console.log(data);
                var html = template("product-list-template",data)
                $("#product > .product-list").html(html);



                //开始写翻页部分
                var totalPage = Math.ceil(data.totalCount/data.pagesize);
                var optionTag = "";
                for(var i = 0;i<totalPage;i++){
                    if((i+1)==pageId){
                        optionTag += '<option value = '+(i+1)+' selected>'+(i+1)+'/'+totalPage+'</option>';
                    }else{
                        optionTag += '<option value = '+(i+1)+'>'+(i+1)+'/'+totalPage+'</option>';
                    }

                }

                $("select").html(optionTag);



                $(".prev-page").unbind("click").bind("click",function(){
                    if(pageId<=1){
                        alert("第一页");
                    }else{
                        pageId=parseInt(pageId)-1;
                        getProductList(categoryId,pageId);
                    }
                    return false;
                });

                $(".next-page").unbind("click").bind("click",function(){
                    if(pageId>=totalPage){
                        alert("已是最后一页");
                    }else{
                        pageId=parseInt(pageId)+1;
                        getProductList(categoryId,pageId);
                    }
                    return false;
                });

                $("select").unbind('change').bind("change",function(){
                    pageId = $(this).val();

                    console.log(pageId);

                    getProductList(categoryId,pageId);
                });




            }
        });
    }




});