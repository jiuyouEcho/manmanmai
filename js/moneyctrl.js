/**
 * Created by Administrator on 2017/7/29.
 */
$(function(){
    var pageId = 1;
    getProductList(pageId);

    function getProductList(pageid){
        $.ajax({
            type:"get",
            url:"http://127.0.0.1:3000/api/getmoneyctrl",
            dataType:"json",
            data:{pageid:pageid},
            success:function(data){
                console.log(data);
                var moneycrtl_list= template("moneyctrl-list-template",data);
                $("#product > .product-list").html(moneycrtl_list);

                var totalPage = Math.ceil(data.totalCount/data.pagesize);

                var optionTag = "";
                for(var i = 0;i<totalPage;i++){
                    if((i+1)==pageid){
                        optionTag += '<option value = '+(i+1)+' selected>'+(i+1)+'/'+totalPage+'</option>';
                    }else{
                        optionTag += '<option value = '+(i+1)+'>'+(i+1)+'/'+totalPage+'</option>';
                    }


                }

                $("select").html(optionTag);

                $(".prev-page").unbind("click").bind("click",function(){
                    if(pageid<=1){
                        alert("第一页");
                    }else{
                        pageid=parseInt(pageid)-1;
                        getProductList(pageid);
                    }
                    return false;
                });

                $(".next-page").unbind("click").bind("click",function(){
                    if(pageid>=totalPage){
                        alert("已是最后一页");
                    }else{
                        pageid=parseInt(pageid)+1;
                        getProductList(pageid);
                    }
                    return false;
                });

                $("select").unbind('change').bind("change",function(){
                    pageId = $(this).val();

                    console.log(pageId);

                    getProductList(pageId);
                });


            }
        });

    }
});