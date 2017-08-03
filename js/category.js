/**
 * Created by Administrator on 2017/7/27.
 */
$(function(){
    $.ajax({
        type: "get",
        url:"http://127.0.0.1:3000/api/getcategorytitle",
        dataType:"json",
        success:function(data){
            var html = template("category-template",data);
            $("#category").html(html);
            //console.log(data);
            //获取二级分类信息
            //点击标题，获取二级分类信息


            $("#category > .panel-group > .panel >.panel-heading > .panel-title > a").click(function(){

                var titleId = this.dataset["titleMyId"];
                var targetContainerId = this.href.split("#")[1];

                var targetContainerHtml = $("#category >.panel-group >.panel > #"+targetContainerId+">.panel-body").html();



                if(targetContainerHtml == ""){
                    $.ajax({
                        type:"get",
                        url:"http://127.0.0.1:3000/api/getcategory",
                        data:{titleid:titleId},
                        dataType:"json",
                        success:function(data){
                            console.log(data);
                            var childCategoryHtml = template("child-category-template",data);
                            $("#category > .panel-group > .panel > #" + targetContainerId + " > .panel-body").html(childCategoryHtml);
                        }
                    });
                }

                console.log("===="+targetContainerHtml+"===");


            });



        }

    });



});