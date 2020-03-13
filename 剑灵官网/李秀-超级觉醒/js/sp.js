
$('.video').hide();
$('.main .btn_xz').click(function () {
    $('.video').fadeIn(600);
})
$('.video .delete').mouseenter(function () {
    $(this).stop().addClass('animated wobble infinite');
    // console.log(123)
})
$('.video .delete').mouseleave(function () {
    $(this).stop().removeClass('animated wobble infinite');
    // console.log(456)
})
$('.video .delete').click(function () {
    $('.video').fadeOut(800);
})
//内容第一部分开始
//banner轮播图
var count=0;
$('.arrow-right').click(function(){
    count++;
    if(count>$('.jcenter li').length-1){
        count=0;
    }
    $('.jcenter li').eq(count).fadeIn(1000).siblings().fadeOut(1000);
    console.log('点击时间发生了')
})
$('.arrow-left').click(function(){
    count--;
    if(count<0){
        count=$('.jcenter li').length-1;
    }
    $('.jcenter li').eq(count).fadeIn(1000).siblings().fadeOut(1000);
})
var timeId=setInterval(function(){
    $('.arrow-right').click();
},1500)
$('.jcenter').mouseenter(function(){
    clearInterval(timeId)
})
$('.jcenter').mouseleave(function(){
    timeId=setInterval(function(){
        $('.arrow-right').click();
    },1500)
})
//新闻
$('.main_fir .jright .jrtitle li').mouseenter(function(){
    $(this).addClass('now').siblings().removeClass('now');
    var idx=$(this).index();
    var wdh=$('#bigc .c1').eq(idx).innerWidth()*idx;
    console.log(wdh);
    $('#bigc').stop().animate({
        left:-wdh+'px',
    },500 )
    // console.log(left)
})
//内容第一部分结束
//第二部分
// 旋转木马
$(function () {
    var data = [{
        width: 300,
        top: 20,
        left: 100,
        opacity: 0.3,
        zIndex: 2
    },
    {
        width: 500,
        top: 70,
        left: 0,
        opacity: 0.7,
        zIndex: 3
    }, {
        width: 800,
        top: 132,
        left: 100,
        opacity: 1,
        zIndex: 4
    }, {
        width: 500,
        top: 70,
        left: 500,
        opacity: 0.7,
        zIndex: 3
    }, {
        width: 300,
        top: 20,
        left: 600,
        opacity: .3,
        zIndex: 2
    }
    ];

    var $lis = $("#slide li");
    $lis.each(function (index, ele) {
        $(ele).css(data[index]);
    })
    var open = true;
    $("#arrRight").on("click", function () {
        if (open) {
            data.unshift(data.pop());
            $lis.each(function (index, ele) {
                $(ele).css(data[index]);
            })
            open = false;
        }
    })
    $("#arrLeft").on("click", function () {
        if (open) {
            data.push(data.shift());
            $lis.each(function (index, ele) {
                $(ele).css(data[index]);
            })

            open = false;
        }
    })
    $lis.eq(0).on("transitionend", function () {
        open = true;
    })
});

var a=new sHover("sHoverItem","sIntro");
 a.set({
 	slideSpeed:5,
 	opacityChange:true,
 	opacity:80
 });