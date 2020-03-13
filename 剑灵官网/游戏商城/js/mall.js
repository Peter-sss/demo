window.onload = function () {
    // 顶部定位效果
    $(function () {
        if ($(window).scrollTop() > 100) {
            $(".top_bar").removeClass("relative");
            $(".top_bar").addClass("fixed");
            $(".top_bar").css({
                top: -100
            })
            $("body").css({
                paddingTop: 150
            })
        } else {
            $(".top_bar").removeClass("fixed");
            $(".top_bar").addClass("relative");
            $("body").css({
                paddingTop: 0
            })
            $(".top_bar").css({
                top: 0
            })
        }
        $(window).scroll(function () {
            if ($(window).scrollTop() > 100) {
                $(".top_bar").removeClass("relative");
                $(".top_bar").addClass("fixed");
                $(".top_bar").css({
                    top: -100
                })
                $("body").css({
                    paddingTop: 150
                })
            } else {
                $(".top_bar").removeClass("fixed");
                $(".top_bar").addClass("relative");
                $("body").css({
                    paddingTop: 0
                })
                $(".top_bar").css({
                    top: 0
                })
            }

        })

    })

    // 轮播图
    var mySwiper = new Swiper('.banner_wraper', {
        // 键值对的写法：
        // 如果需要分页器（小圆点）
        pagination: {
            el: '.swiper-pagination',
            clickable: true, // 点击小圆点可以切换swiper
        },

        // 如果需要前进后退按钮
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        // 无缝效果
        loop: true, // 循环模式选项
        effect: 'fade',
        autoplay: true, // 开启了自动切换
        autoplay: {
            delay: 1000,
            stopOnLastSlide: false,
            disableOnInteraction: false,
        }
        // direction: "vertical"
    })
    // console.log(document.querySelectorAll(".mall_body li")[1].children)
    //js无法直接获取伪元素
    // console.log(document.querySelectorAll("li::after"));

    // 动态添加一个div作为伪元素
    $(".good_goods li").append("<div class='light'></div>");
    // $(".good_goods li div").eq(0).css("backgroundImg", "linear-gradient(to right,rgba(255, 255, 255, 0), rgba(255, 255, 255, 1), rgba(255, 255, 255, 0))");

    // 鼠标悬浮显示不同颜色的扫光效果
    var aLi = document.querySelectorAll(".good_goods li");
    for (var i = 0; i < aLi.length; i++) {
        aLi[i].onmouseenter = function () {
            var aDiv = document.querySelectorAll(".good_goods li div");
            // 定义R、G、B
            var R = parseInt(Math.random() * 256);
            var G = parseInt(Math.random() * 256);
            var B = parseInt(Math.random() * 256);
            // console.log(R, G, B);
            for (var i = 0; i < aDiv.length; i++) {
                aDiv[i].style.backgroundImage = "linear-gradient(to right,rgba(" + R + ", " + G + ", " + B + ", 0), rgba(" + R + ", " + G + ", " + B + ", .6), rgba(" + R + ", " + G + ", " + B + ", 0))";

            }
        }
    }

    // 侧边栏
    $(function () {
        // 页面存在卷曲距离的时候刷新，侧边栏广告还是在可视区中间显示
        var disTop = $(window).scrollTop() + 200;
        // console.log(disTop);
        $(".aside").css("top", disTop);
        $(window).scroll(function () {
            var disScrollTop = $(window).scrollTop();
            $(".aside").animate({
                "top": disScrollTop + 200
            }, 30)
        })
    })

    // 限定好物  手风琴
    $(function () {
        var $divs = $(".accordion .wraper div");
        $divs.mouseenter(function () {
            $(this).stop().animate({
                width: 400
            }).siblings().stop().animate({
                width: 94
            });
        })

        $(".wraper").mouseleave(function () {
            $divs.stop().animate({
                width: 145
            })
        })
    })

    // 新品上架 拖拽
    $(function () {
        var $lis = $(".new_goods ul li");
        var count = 20;
        for (var i = 0; i < $lis.length; i++) {
            $lis.eq(i).mousedown(function () {
                count++;
                console.log(count);
                $(this).css("zIndex", count);
            })
            Drag($lis[i]);
        }
    })

    // 日常专区 点击显示大图
    $(function () {
        var $imgs = $(".daily_part ul li a img");
        var $showImg = $(".showImg");
        var $showImgBox = $(".showImgBox");

        // 双击显示大图
        $imgs.each(function (index, ele) {
            $(this).on("dblclick", function () {
                var imgSrc = $(this).attr("src");
                $showImg.attr("src", imgSrc);
                $showImgBox.css("display", "block");
                $showImg.css({
                    top: $(window).scrollTop() + 100
                })
                $("html").css({
                    overflowY: "hidden"
                })
            })
        })
        $(window).on("scroll", function () {
            $showImg.css({
                top: $(window).scrollTop() + 100
            })
        })

        // 单击大图 取消大图
        $(".glyphicon").on("click", function () {
            $showImg.attr("src", "");
            $showImgBox.css("display", "none");
            $("html").css({
                overflowY: "scroll"
            })
        })

    })


    // 点击有惊喜
    var oSurprise = document.querySelector(".surprise");
    var disScrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    autoMove(oSurprise, disScrollTop);
    window.onscroll = function () {
        disScrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        autoMove(oSurprise, disScrollTop, true);
    }

    // 点击有惊喜  悬浮停止
    oSurprise.onmouseenter = function () {
        autoMove(oSurprise, disScrollTop, false);
        $(this).stop().animate({
            opacity: 1
        })
    }

    // 点击有惊喜  鼠标离开继续运动
    oSurprise.onmouseleave = function () {
        autoMove(oSurprise, disScrollTop, true);
        $(this).animate({
            opacity: .2
        })
    }

    // 回到顶部
    $(".backTop").on("click", function () {
        $("html,body").animate({
            scrollTop: 0
        }, 1000)
    })








}