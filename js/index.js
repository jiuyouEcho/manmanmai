/**
 * Created by Administrator on 2017/7/26.
 */
$(function(){

    //menu���ֶ�̬��ȡ����

    $.ajax({
        type:"get",
        url:"http://127.0.0.1:3000/api/getindexmenu",
        dataType:"json",
        success:function(data){
            var html = template("menu-template",data);
            $("#menu").html(html);

            //������࣬�����ص�һ����ʾ����

            $("#menu > .row > div:nth-last-of-type(-n+4)").css({
                height:0
            });

            var normalHeight = $("#menu > .row > div:nth-of-type(8)").height();

            $("#menu > .row > div:nth-of-type(8) >a").click(function(){
                var lastElementHeight = $("#menu > .row > div:last-of-type").height();
                if(lastElementHeight == 0){
                    $("#menu > .row > div:nth-last-of-type(-n+4)").css({
                        height: normalHeight + "px"
                    });
                }else{
                    $("#menu > .row > div:nth-last-of-type(-n+4)").css({
                        height: "0px"
                    });
                }

                return false;
            });

        }
    });


//recommend���ֵ����ݶ�̬��ȡ
   $.ajax({
       type:"get",
       url:"http://127.0.0.1:3000/api/getmoneyctrl",
       dataType:"json",
       success:function(data){
           var html = template("recommend-template",data);
           $("#recommend > .recommend-list").html(html);


       }
   });
});

//���ض���
function goTop(){
    var duration = 500; //������ʱ��
    $('body').animate({ scrollTop: 0 }, duration);
}
