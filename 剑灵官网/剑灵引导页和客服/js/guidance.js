$(function(){
	//当页面滚动到一定位置的时候,导航会定位
	$(window).on('scroll',function(){
		if($(window).scrollTop()>600){
			$('#nav').addClass('navFixed')
		}else{
			$('#nav').removeClass('navFixed')
		}
	})
})


  
// //当点击超级觉醒下面的小圆点时,会播放视频
// $('.video').on('click',function(){
// 	console.log(1)
// 	$("#video").css('display','block');
// 	$('#bg').css({
// 		"width": "100%",
// 		"height": "100%",
// 		"background": "rgba(0,0,0,.5)"
// 	})
// })
