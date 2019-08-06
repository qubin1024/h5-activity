import $ from "jquery";
export default function(){
    var script = document.createElement('script');  
        script.src = "https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js";  
        document.body.appendChild(script);  
        //初始跳动
    var $hammer = $("#hammer"),
        $tips = $(".info"),
        $eggList = $(".egg li"),//金蛋父级
        $egg = $(".goldegg"),//金蛋
        $change = $("#change"),//剩余次数
        length = $egg.length,
        data = {count: 5},//次数
        arr = [],
        openArr,//记录被砸开的蛋的下标数组
        rem = 75;
        
        $egg.eq(length).addClass("jump");
        $tips.eq(length).show();
        setInterval(function () {
            //金蛋跳动
            length++;
            length %= 9;
            $egg.eq(length - 1 < 0 && 8 || length - 1).removeClass("jump");
            $tips.eq(length - 1 < 0 && 8 || length - 1).hide();
            reback();
            $egg.eq(length).addClass("jump");
            $tips.eq(length).show();
        }, 1000);

        function reback() {
            if (!$egg.eq(length).hasClass("init")) {//若已砸开
                length++;
                length %= 9;
                reback();
            }
        }
    
        /*砸蛋事件*/
        for (var i = 0; i < length; i++) {
            $egg.eq(i).data("mark", true);//判断金蛋是否砸开，true表示可砸
            $eggList.eq(i).data("i", i);
            $eggList.eq(i).click(function () {
                //设定剩余抽奖次数，判断用户是否还能点击
                if (data.count > 0) {
                    $egg.eq($(this).data("i")).data("mark") ? eggChange($(this).data("i")) : alert("这枚金蛋已经被您砸开了");//判断金蛋是否已砸开
                } else {
                    alert("您当前砸蛋次数为0，无法砸蛋");
                }
            });
        }
    
        /*砸蛋事件的处理*/
        function eggChange(i) {
            //砸蛋次数的变化
            data.count--;
            $change.html(data.count);
            $hammer.removeClass("shak");//清除锤子晃动动画
            //锤子砸蛋的位置
            (i === 0 || i === 3 || i === 6) && ($hammer.css("left", 165 / rem + "rem"));
            (i === 1 || i === 4 || i === 7) && ($hammer.css("left", 415 / rem + "rem"));
            (i === 2 || i === 5 || i === 8) && ($hammer.css("left", 665 / rem + "rem"));
            (i === 0 || i === 1 || i === 2) && ($hammer.css("top", 60 / rem + "rem"));
            (i === 3 | i === 4 || i === 5) && ($hammer.css("top", 280 / rem + "rem"));
            (i === 6 | i === 7 || i === 8) && ($hammer.css("top", 500 / rem + "rem"));
            //锤子返回
            setTimeout(function () {
                $hammer.css({
                    left: 665 / rem + "rem",
                    top: 60 / rem + "rem"
                });
            }, 1500);
    
            //金蛋破裂及锤子动画
            setTimeout(function () {
                $hammer.addClass("hit");
                setTimeout(function () {
                    $egg.eq(i).prop("src", "data:image/png;base64,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");
                }, 300);
                setTimeout(function () {
                    $egg.eq(i).removeClass("init");
                    win();
                    $hammer.removeClass("hit");//清除锤子砸蛋动画
                    $hammer.addClass("shak");
    
                    //记录被砸开的蛋
                    arr.push(i);//存入每个砸开蛋的下标
                   // $.cookie("eggIndex", arr, {expires: 1});//存入cookie
                }, 600);
            }, 600);
            $egg.eq(i).data("mark", false);//更改金蛋状态为已砸开
        }

        function win(){
            $("#mask").show();
            $("#mask .winning").addClass('reback');
            setTimeout(()=> {
                $("#mask #card").addClass('pull');
            }, 500)
        }
}