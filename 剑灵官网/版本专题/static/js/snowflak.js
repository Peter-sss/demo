(function(){

    //雪花数量
    var snow_flakecount = 150;
    //雪花大小
    var snow_size = 2;
    //雪花距离
    var snow_mindist = 100;
    //雪花速度
    var snow_speed = 0.5;
    //雪花横移度
    var snow_stepsize = 1;
    //雪花颜色
    var snow_snowcolor = '255,255,255';
    //雪花不透明度
    var snow_opacity = 0.3;

    //重绘新雪花 兼容各种主流浏览器
    window.requestAnimationFrame =
    window.requestAnimationFrame||
    window.mozRequestAnimationFrame||
    window.webkitRequestAnimationFrame||
    window.msRequestAnimationFrame||
    function(callback){window.setTimeout(callback,1000/60);}

    var flakes=[],
        //获取画板
        canvas=show,
        ctx=canvas.getContext("2d"),
        //雪花数量
        flakeCount=snow_flakecount,

        mX=-100,
        mY=-100;

    canvas.width=window.innerWidth;
    canvas.height=window.innerHeight;

    function snow(){
        
        ctx.clearRect(0,0,canvas.width,canvas.height);
        for(var i=0;i<flakeCount;i++){

            var flake=flakes[i],
                x=mX,
                y=mY,
                minDist=snow_mindist,
                x2=flake.x,
                y2=flake.y;

            var dist=Math.sqrt((x2-x)*(x2-x)+(y2-y)*(y2-y)),
                dx=x2-x,
                dy=y2-y;

            if(dist<minDist){
                var force=minDist/(dist*dist),
                    xcomp=(x-x2)/dist,
                    ycomp=(y-y2)/dist,
                    deltaV=force/2;

                flake.velX-=deltaV*xcomp;
                flake.velY-=deltaV*ycomp;

            }else{

                flake.velX*=0.98;

                if(flake.velY<=flake.speed){flake.velY = flake.speed;}

                flake.velX+=Math.cos(flake.step+=.05)*flake.stepSize;

            }

            ctx.fillStyle="rgba("+snow_snowcolor+","+flake.opacity+")";
            flake.y+=flake.velY;
            flake.x+=flake.velX;
            if(flake.y>=canvas.height||flake.y<=0){reset(flake);}
            if(flake.x>=canvas.width||flake.x<=0){reset(flake);}
            ctx.beginPath();
            ctx.arc(flake.x,flake.y,flake.size,0,Math.PI*2);
            ctx.fill();
			
        }
		
        requestAnimationFrame(snow);
		
    }
	
    function reset(flake){
        flake.x=Math.floor(Math.random()*canvas.width);
        flake.y=0;
        flake.size=(Math.random()*3)+2;
        flake.speed=(Math.random()*1)+0.5;
        flake.velY=flake.speed;
        flake.velX=0;
        flake.opacity=(Math.random()*0.5)+0.3;
    }

    function init(){
        for(var i=0;i<flakeCount;i++){
            var x=Math.floor(Math.random()*canvas.width),
                y=Math.floor(Math.random()*canvas.height),
                size=(Math.random()*3)+snow_size,
                speed=(Math.random()*1)+snow_speed,
                opacity=(Math.random()*0.5)+snow_opacity;
            flakes.push(
                {
                    speed:speed,
                    velY:speed,
                    velX:0,
                    x:x,
                    y:y,
                    size:size,
                    stepSize:(Math.random())/30*snow_stepsize,
                    step:0,
                    angle:180,
                    opacity:opacity
                }
            );
        }
        snow();
    }

    //鼠标事件
    document.addEventListener("mousemove",
        function(e){
            mX=e.clientX,
            mY=e.clientY
        }
    )

    //当窗口尺寸发生变化时 重新调整画板尺寸
    window.addEventListener("resize",
        function(){
            canvas.width=window.innerWidth;
            canvas.height=window.innerHeight;
        }
    )

    init();

})();