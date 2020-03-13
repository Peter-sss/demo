(function(o){if(window.attachEvent){window.attachEvent("onload",o);}else{window.addEventListener("load",o,false);};})(function(){
	var d=document,
	m=d.createElement("div"),
	r=String(new Date()).split(":")[1],
	l=function(u,y){
		var s=d.createElement(y);
		if(y=="script"){s.src=u;s.type="text/javascript";s.setAttribute("charset","gb2312");}
		else{s.href=u;s.rel="stylesheet";s.type="text/css";};
		d.getElementsByTagName("head")[0].appendChild(s);
	};
	//以下修改ost.css为各自产品的css地址
	l("//bns.qq.com/web201506/ossweb-img/title/bns.css?v="+r,"link");
        
	m.className="ost ost_bg";
	m.style.cssText="position:absolute;top:-500px;";
	m.innerHTML=['<ul class="ost_b">',
	//以下修改各自链接，及指定按钮统计代码（广告修改gg.js）
		'<li class="ost_tg ost_bg"><a href="//game.qq.com/index.shtml" target="_blank" class="ost_blnk" onclick="pgvSendClick({hottag:\'act.title.logo\'});">腾讯游戏</a></li>',
		'<li class="ost_gg ost_bg"><a id="ost_gg" href="#" target="_blank" class="ost_blnk" onclick="pgvSendClick({hottag:\'act.title.gg\'});">精彩活动</a></li>',
		'<li class="ost_i">',
			'<p class="ost_t ost_bg"><a href="//bns.qq.com/main.shtml?ADTAG=ied.gameclient.top.guanwang" target="_blank" class="ost_lnk" onclick="pgvSendClick({hottag:\'act.title.back\'});">返回官网首页</a></p>',
			'<p class="ost_gl">',
				'<a href="//bns.qq.com/web201307/download.shtml?ADTAG=ied.gameclient.top.download#d_anchor" target="_blank" class="ost_lnk ost_ldc" onclick="pgvSendClick({hottag:\'act.title.down\'});">游戏下载</a>',
				'<a href="//bns.qq.com/comm-htdocs/pay/new_index.htm?t=bns?ADTAG=ied.gameclient.top.chongzhi" target="_blank" class="ost_lnk ost_ldc" onclick="pgvSendClick({hottag:\'act.title.pay\'});"> 点券充值</a>',
			'</p>',
		'</li>',
	'</ul>'].join("");
	d.body.appendChild(m);
	d.body.style.paddingTop="42px";
	l("//bns.qq.com/web201506/ossweb-img/title/gg.js?v="+r,"script");
});

/*  |xGv00|5c052c17b9799f6b96a5f2ed52a3761d */