// 旋转木马轮波图特效
$(function () {
    var $wrap = $(".content .wrap");
    var $prve = $(".content .wrap .prve");
    var $next = $(".content .wrap .next")
    var $slide = $(".content .wrap .slide");
    var open = true;
    var arr = [{
            width: 200,
            top: 10,
            left: -150,
            opacity: 0.2,
            zIndex: 2
        },
        {
            width: 300,
            top: 60,
            left: -200,
            opacity: 0.8,
            zIndex: 3
        },
        {
            width: 400,
            top: 0,
            left: 0,
            opacity: 1,
            zIndex: 4
        },
        {
            width: 300,
            top: 60,
            left: 300,
            opacity: 0.8,
            zIndex: 3
        },
        {
            width: 200,
            top: 10,
            left: 350,
            opacity: 0.2,
            zIndex: 2
        }
    ];
    $slide.children("li").each(function (index) {
        $(this).css(arr[index]);
    })
    $prve.on("click", function () {
        if (open) {
            arr.unshift(arr.pop());
            $slide.children("li").each(function (index) {
                $(this).css(arr[index]);
            })
            open = false;
        }
    })
    $next.on("click", function () {
        if (open) {
            arr.push(arr.shift());
            $slide.children("li").each(function (index) {
                $(this).css(arr[index]);
            })
            open = false;
        }
    })
    $slide.children("li").on("transitionend", function () {
        // 过渡结束后，打开阀门
        open = true;
    })
    var timerId = setInterval(function () {
        $next.click();
    }, 3000)
    $wrap.mouseenter(function () {
        clearInterval(timerId);
    })
    $wrap.mouseleave(function () {
        timerId = setInterval(function () {
            $next.click();
        }, 3000)
    })

})

// nav栏动画 
$(function () {
    var animateButton = function (e) {

        e.preventDefault;
        //reset animation
        e.target.classList.remove('animate');

        e.target.classList.add('animate');
        setTimeout(function () {
            e.target.classList.remove('animate');
        }, 700);
    };

    var classname = document.getElementsByClassName("bubbly-button");

    for (var i = 0; i < classname.length; i++) {
        classname[i].addEventListener('click', animateButton, false);
    }
})

// 淡入淡出动画
$(function () {
    var count = 0;
    var $liArr = $(".block .left .banner li");
    var $btn = $(".block .left .arrow li");
    var $ol = $(".block .left ol");

    $btn.eq(0).click(function () {
        count--;
        if (count < 0) {
            count = $liArr.length - 1;
        }
        $liArr.eq(count).fadeIn(1000).siblings().fadeOut(1000);
        $ol.children().eq(count).css("backgroundColor", "red").siblings().css("backgroundColor", "black");
    })
    $btn.eq(1).click(function () {
        count++;
        if (count > $liArr.length - 1) {
            count = 0;
        }
        $liArr.eq(count).fadeIn(1000).siblings().fadeOut(1000);
        $ol.children().eq(count).css("backgroundColor", "red").siblings().css("backgroundColor", "black");
    })
    // 小圆点
    for (var i = 0; i < $liArr.length; i++) {
        $ol.append($("<li></li>"));
    }
    $ol.children("li").eq(0).css("backgroundColor", "red");
    $ol.children("li").click(function () {
        $(this).css("backgroundColor", "red").siblings().css("backgroundColor", "black");
        $liArr.eq($(this).index()).fadeIn(1000).siblings().fadeOut(1000);
        count = $(this).index();
    })
    var timerId = setInterval(function () {
        $btn.eq(0).click();
    }, 3000)
    $(".block .left").mouseenter(function () {
        clearInterval(timerId)
    })
    $(".block .left").mouseleave(function () {
        timerId = setInterval(function () {
            $btn.eq(0).click();
        }, 3000)
    })
})

// tap栏切换
$(function () {
    $top = $(".block .center .top");
    $bottom = $(".block .center .bottom div");
    $top.children("li").click(function () {
        var w = -$(this).index() * $bottom.parent().width() + "px";
        $bottom.stop().animate({
            left: w,
        })
        $(this).addClass("red").siblings().removeClass("red");
    })
})

// 下拉框动画
$(function () {
    $(".store .left li").mouseenter(function () {
        $(this).children("i").stop().slideDown(600);
    })
    $(".store .left li").mouseleave(function () {
        $(this).children("i").stop().slideUp(600);
    })
})

// 小鱼移动动画
$(function () {
    var $fash = $(".store .fash #bubble");
    var $div = $(".store .fash");
    var open = false;
    var _x = 0;
    var _y = 0;
    $fash.on("mousedown", function (e) {
        _x = e.pageX - $div.position().left - $(this).position().left;
        _y = e.pageY - $div.position().top - $(this).position().top;
        open = true;
    })
    $(document).on("mousemove", function (e) {
        if (open) {
            var x = e.pageX - _x - $div.position().left;
            var y = e.pageY - _y - $div.position().top;
            x = Math.max(0, x);
            y = Math.max(0, y);
            x = Math.min($div.width() - $fash.width(), x)
            y = Math.min($div.height() - $fash.height(), y)
            $fash.css("left", x);
            $fash.css("top", y);
            // console.log(x, y);
        }
    })
    $(document).on("mouseup", function (e) {
        open = false;
    })
})

// 横向滑动
$(function () {
    // 动态获取ul的长度
    var $ul = $(".store .right .bottom ul");
    var $div = $(".store .right .bottom");
    var x = $ul.children("li").eq(0).outerWidth(true) * $ul.children().length;
    new IScroll(".seckill_content", {
        scrollY: false,
        scrollX: true
    });;
})

// 小火箭动画
$(function () {
    // if ($(window).scrollTop() > 0)
    $(window).scroll(function () {
        if ($(window).scrollTop() > 800) {
            $(".airplane").show(700)
        } else {
            $(".airplane").hide(700)
        }
    })
    $(".airplane").on("click", function () {
        // $(window).scrollTop(0);
        $("html, body").animate({
            scrollTop: 0
        }, 500)
    })
    $(".airplane").on("mouseenter", function () {
        $(this).stop().animate({
            "bottom": 65
        }, 500, "linear")
    })
    $(".airplane").on("mouseleave", function () {
        $(this).stop().animate({
            "bottom": 50
        }, 500, "linear")
    })
})

// 雪花动画
document.writeln(
    "<div class=\"snow\" style=\"height:900px; position:fixed; left:0px; top:0px; right:0px; bottom:0px; pointer-events: none;z-index: 9999;\"><canvas width=\"1904\" height=\"913\" style=\"position: absolute;left: 0;top: 0;\"></canvas></div>"
)
$(function () {

    if (/MSIE 6|MSIE 7|MSIE 8/.test(navigator.userAgent)) {
        return
    }
    var container = document.querySelector(".snow");
    // IE9-10 pointer-events兼容
    if (/MSIE 9|MSIE 10/.test(navigator.userAgent)) {
        $(container).bind('click mousemove', function (evt) {
            this.style.display = 'none';
            var x = evt.pageX,
                y = evt.pageY
            if ($(document).scrollTop() > 0 || $(document).scrollTop() > 0) {
                x = x - $(document).scrollLeft() + 1
                y = y - $(document).scrollTop() + 1
            }
            evt.preventDefault();
            evt.stopPropagation();
            var under = document.elementFromPoint(x, y);
            var evtType = evt.type === 'click' ? 'click' : 'mouseenter'
            if (evt.type === 'click') {
                $(under)[0].click();
            } else {
                $(under).trigger('mouseenter');
            }
            $('body').css('cursor', 'default')
            this.style.display = '';
            return false;
        });
    }
    var containerWidth = $(container).width();
    var containerHeight = $(container).height();
    var particle;
    var camera;
    var scene;
    var renderer;
    var mouseX = 0;
    var mouseY = 0;
    var windowHalfX = window.innerWidth / 2;
    var windowHalfY = window.innerHeight / 2;
    var particles = [];
    var particleImages = [new Image(), new Image(), new Image(), new Image(), new Image()];
    // particleImages[0].src = "./images/snow1.png";
    // particleImages[1].src = "./images/snow2.png";
    // particleImages[2].src = "./images/snow3.png";
    // particleImages[3].src = "./images/snow4.png";
    // particleImages[4].src = "./images/snow5.png";
    particleImages[0].src = "images/151375665240370100.png";
    particleImages[1].src = "images/151375668550091372.png";
    particleImages[2].src = "images/151375669416355455.png";
    particleImages[3].src = "images/151375670204115466.png";
    particleImages[4].src = "images/151375671039447316.png";
    var snowNum = 300;

    function init() {
        camera = new THREE.PerspectiveCamera(75, containerWidth / containerHeight, 1, 10000);
        camera.position.z = 1000;
        scene = new THREE.Scene();
        scene.add(camera);
        renderer = new THREE.CanvasRenderer();
        renderer.setSize(containerWidth, containerHeight);
        for (var i = 0; i < snowNum; i++) {
            var material = new THREE.ParticleBasicMaterial({
                map: new THREE.Texture(particleImages[i % 5])
            });
            particle = new Particle3D(material);
            particle.position.x = Math.random() * 2000 - 1000;
            particle.position.y = Math.random() * 2000 - 1000;
            particle.position.z = Math.random() * 2000 - 1000;
            particle.scale.x = particle.scale.y = 1;
            scene.add(particle);
            particles.push(particle)
        }
        container.appendChild(renderer.domElement);
        document.addEventListener("mousemove", onDocumentMouseMove, false);
        document.addEventListener("touchstart", onDocumentTouchStart, false);
        document.addEventListener("touchmove", onDocumentTouchMove, false);
        setInterval(loop, 1000 / 50)
    }

    function onDocumentMouseMove(event) {
        mouseX = event.clientX - windowHalfX;
        mouseY = event.clientY - windowHalfY
    }

    function onDocumentTouchStart(event) {
        if (event.touches.length === 1) {
            event.preventDefault();
            mouseX = event.touches[0].pageX - windowHalfX;
            mouseY = event.touches[0].pageY - windowHalfY
        }
    }

    function onDocumentTouchMove(event) {
        if (event.touches.length === 1) {
            event.preventDefault();
            mouseX = event.touches[0].pageX - windowHalfX;
            mouseY = event.touches[0].pageY - windowHalfY
        }
    }

    function loop() {
        for (var i = 0; i < particles.length; i++) {
            var particle = particles[i];
            // 滚动到楼层模块，减少雪花 （自定义）
            if ($(window).scrollTop() < 1000) {
                particle.scale.x = particle.scale.y = 1;
            } else {
                if (i > particles.length / 5 * 3) {
                    particle.scale.x = particle.scale.y = 0;
                } else {
                    particle.scale.x = particle.scale.y = 0.8;
                }
            }
            particle.updatePhysics();
            with(particle.position) {
                if (y < -1000) {
                    y += 2000
                }
                if (x > 1000) {
                    x -= 2000
                } else {
                    if (x < -1000) {
                        x += 2000
                    }
                }
                if (z > 1000) {
                    z -= 2000
                } else {
                    if (z < -1000) {
                        z += 2000
                    }
                }
            }
        }
        camera.position.x += (mouseX - camera.position.x) * 0.005;
        camera.position.y += (-mouseY - camera.position.y) * 0.005;
        camera.lookAt(scene.position);
        renderer.render(scene, camera)
    }
    init()
});



















// // 物体匀速水平运动  ---- element-元素，target-目标位置，num-步数大小，second-计时器循环的时间
// function animateX(element, target, num, second) {
//     clearInterval(element.timerId);
//     num = num || 10;
//     second = second || 30;
//     var current = element.offsetLeft;
//     var step = target - current > 0 ? num : -num;
//     element.timerId = setInterval(function () {
//         if (Math.abs(target - element.offsetLeft) < Math.abs(step)) {
//             element.style.left = target + "px"
//             clearInterval(element.timerId);
//         } else {
//             element.style.left = element.offsetLeft + step + "px";
//         }
//     }, second)
// }

// // 物体垂直水平运动  ---- element-元素，target-目标位置，num-步数大小，second-计时器循环的时间
// function animateY(element, target, num, second) {
//     clearInterval(element.timerId);
//     num = num || 10;
//     second = second || 30;
//     var current = element.offsetTop;
//     var step = target - current > 0 ? num : -num;
//     element.timerId = setInterval(function () {
//         if (Math.abs(target - element.offsetTop) < Math.abs(step)) {
//             element.style.top = target + "px"
//             clearInterval(element.timerId);
//         } else {
//             element.style.top = element.offsetTop + step + "px";
//         }
//     }, second)
// }