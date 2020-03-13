// animate 函数的作用：让任意元素去做任意left动画效果
// element ==> 做动画的元素
// target  ==> 动画的目标值
// num     ==> 每次移动的距离
function animate(element, target, num) {
    // num的需求：
    //  如果num没传递，默认就会是100
    //  如果num传递了值， 就是你传递的那个值
    num = num || 100;

    clearInterval(element.timerId)
    element.timerId = setInterval(function() {
        // 1. 获取元素当前的位置
        var current = element.offsetLeft;

        // 2. 每次移动的距离
        var step = current < target ? num : -num;

        // 到达了终点，就需要清除定时器
        if (Math.abs(target - current) < Math.abs(step)) {
            // 到了终点
            clearInterval(element.timerId);

            // 在清除定时器的时候，可能元素没有到达终点，直接去终点
            element.style.left = target + "px";
        } else {
            // 没到终点，继续运动，修改位置
            // 修改current 数值
            current += step;
            // 设置元素的left值
            element.style.left = current + "px";
        }
    }, 30)
}
