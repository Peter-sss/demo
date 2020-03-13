// 简单的拖拽功能
// function move(obj, e, x, y) {
//     // console.log(obj);
//     // 调用运动的条件是obj鼠标按下的时候 所以这里的按下就不需要了，要不然鼠标需要再次按下才能执行运动函数
//     // obj.onmousedown = function (e) {
//     // console.log(x, y)
//     var disX = e.pageX - obj.offsetLeft;
//     var disY = e.pageY - obj.offsetTop;
//     document.onmousemove = function (e) {
//         console.log(x, y)
//         obj.style.left = e.pageX - disX + "px";
//         obj.style.top = e.pageY - disY + "px";
//     }
//     document.onmouseup = function () {
//         console.log(x, y)
//         document.onmousemove = null;

//         $(obj).animate({
//             left: x,
//             top: y
//         }, function () {
//             // console.log("回去了 ")

//             // obj.style.transitionDuration = "1s";
//         })

//         // return false;
//     }
//     // }
// }

function Drag(obj) {
    var beforeX = obj.offsetLeft;
    var beforeY = obj.offsetTop;
    // console.log(beforeX, beforeY);
    obj.onmousedown = function (e) {
        var disX = e.pageX - obj.offsetLeft;
        var disY = e.pageY - obj.offsetTop;
        document.onmousemove = function (e) {
            obj.style.left = e.pageX - disX + "px";
            obj.style.top = e.pageY - disY + "px";
        }
        document.onmouseup = function () {
            document.onmousemove = null;
            $(obj).animate({
                left: beforeX,
                top: beforeY
            })
        }
        return false;
    }
}

// 屏幕广告

function autoMove(obj, top, flag) {
    // 悬浮停止
    if (flag == false) {
        clearInterval(obj.timer);
        console.log("11111===" + obj.timer)
    } else {
        var iSpeedX = 3.2;
        var iSpeedY = 3.2;
        clearInterval(obj.timer);
        obj.timer = setInterval(function () {
            var l = obj.offsetLeft + iSpeedX;
            var t = obj.offsetTop + iSpeedY;
            // 限制右边
            var maxWidth = document.documentElement.clientWidth - obj.offsetWidth;
            if (l > maxWidth) {
                l = maxWidth;
                iSpeedX *= -1;
            }
            // 限制下边
            var maxHeight = document.documentElement.clientHeight - obj.offsetHeight;
            // 限制下面时  滚动条移动前的高度加上top(页面的卷曲距离)就是当前页面下面的限制范围了
            if (t > maxHeight + top) {
                t = maxHeight + top;
                iSpeedY *= -1;
            }
            // 限制左边
            if (l < 0) {
                l = 0;
                iSpeedX *= -1;
            }
            // 限制上边

            // 限制广告在可视区显示主要是限制上面和下面

            // 上面的当t<top时,就让t=top(即页面的卷曲距离)，这样广告就限制 在上面了
            if (t < top) {
                t = top;
                iSpeedY *= -1;
            }
            obj.style.left = l + "px";
            obj.style.top = t + "px";
            // console.log(l, t);
        }, 16)
    }
}