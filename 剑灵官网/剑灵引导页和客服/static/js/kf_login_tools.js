/**
 * 关闭统一登录框，不能绑定在KF对象下
 */
 function ptlogin2_onClose()
 {
 	login_wnd = document.getElementById("login_div");	
 	login_wnd.style.display="none";
 	document.getElementById("mybg").style.display = "none";
 	document.body.style.overflow = '';
 }
/**
 * 调整统一登陆框尺寸
 */
 function ptlogin2_onResize(width, height)
 {	
 	login_wnd = document.getElementById("login_div");
 	if (login_wnd)
 	{
 		login_wnd.style.width = width + "px";
 		login_wnd.style.height = height + "px";
 		login_wnd.style.visibility = "hidden"
 		login_wnd.style.visibility = "visible"
 	}
 }
var KF = {};
 KF.com=(function(){
	var _user={"uin":"","nick_name":""};
	var addCookie=function(objName, objValue, objHours){
		    var str = objName + "=" + escape(objValue);
		    str += ";domain=kf.qq.com";
		    if (objHours > 0) {
		        var date = new Date();
		        var ms = objHours * 3600 * 1000;
		        date.setTime(date.getTime() + ms);
		        str += ";expires=" + date.toGMTString();
		    }
		    document.cookie = str;
		};

	var getCookie=	function(b){
        var filterXSS = function(e) {
            if (!e) return e;
            for (; e != unescape(e);) e = unescape(e);
            for (var r = ["<", ">", "'", '"', "%3c", "%3e", "%27", "%22", "%253c", "%253e", "%2527", "%2522"], n = ["&#x3c;", "&#x3e;", "&#x27;", "&#x22;", "%26%23x3c%3B", "%26%23x3e%3B", "%26%23x27%3B", "%26%23x22%3B", "%2526%2523x3c%253B", "%2526%2523x3e%253B", "%2526%2523x27%253B", "%2526%2523x22%253B"], a = 0; a < r.length; a++) e = e.replace(new RegExp(r[a], "gi"), n[a]);
            return e
        };
        var a;
        return filterXSS((a=document.cookie.match(RegExp("(^|;\\s*)"+b+"=([^;]*)(;|$)")))?unescape(a[2]):null)
		};
		 var HtmlAttributeEncode = function(sStr){
			    sStr = sStr.replace(/&/g, "&amp;");
			    sStr = sStr.replace(/>/g, "&gt;");
			    sStr = sStr.replace(/</g, "&lt;");
			    sStr = sStr.replace(/"/g, "&quot;");
			    sStr = sStr.replace(/'/g, "&#39;");
			    sStr = sStr.replace(/=/g, "&#61;");
			    sStr = sStr.replace(/`/g, "&#96;");
			    return sStr;
			};
			
	 /**
	  * 页面初始化,判断是否有登录
	  */
	 var _init=function(){
		 $.ajax({
			 url: "/cgi-bin/loginTitle?rand=" + Math.random(),
			 async:false,
             timeout: 5000,
			 success:function(xml){
                 if ($(xml).find("login").text() == '0' ) {

                     $(".loginBtn").show();
                     if(window.sessionStorage && window.sessionStorage.notlogin == 'yes'){
                         $("#loginTitle").hide();
                     }else{
                         $("#loginTitle").show();
                     }
                     $('.loginBtn').click(function(){
                         login(encodeURIComponent(document.location.href.replace(/'/g, "%27")));
                     });
                     $('#notLogin').click(function(){
                         window.sessionStorage.notlogin = 'yes';
                         $("#loginTitle").hide();
                     });
                     // $(".loginBtn").attr("onclick","login('"+encodeURIComponent(document.location.href.replace(/'/g, "%27"))+"')");
                 } else {// 登录回调函数
                     var uin=$(xml).find("uin").text();
                     _user.uin=uin;
                     var nick_name=$(xml).find("nick").text();
                     nick_name=HtmlAttributeEncode(nick_name);
                     _user.nick_name=nick_name;
                     if($("#usr_info").length<=0){/* 避免和头部的相冲突 */
                         $(".photo" ).mouseover( function(){
                             var logoutname = $( "#uinPhoto img").attr("name");
                             if(logoutname == 'success'){
                                 $("#loginOut").show();
                                 //$("#uinPhoto").focus();
                             }
                         }).mouseout( function(){
                             //setTimeout(function(){
                             $("#loginOut").hide();
                             //},3000);
                         });
                         $("#innerortertools").html('<input type="hidden" name="login_uin" id="login_uin" value="'+uin+'" />');
                         var innerstr = '  <p>欢迎您的来访！</p>';
                         innerstr +='<p>'+nick_name+'('+uin+')</p>';
                         innerstr +='<input type="hidden" name="login_uin" id="login_uin" value="'+uin+'" />';
                         innerstr +='<button class="logoutBtn" id="logOut">退出</button>';
                         $("#loginOut").html(innerstr);
                         $('#logOut').click(function(){
                             logout();
                         });
                         if(uin==0){//uin为空，不拉取头像
                             return false;
                         }
                         var img="<img src='"+getHeadUrl(uin)+"'name='success' ></img>";
                         $("#uinPhoto").html(img);
                         $("#uinPhoto").show();
                     }
                     //addCookie("is_click_diagnoisis",1);//添加已经点击了'一键诊断'的cookies
                 }
			 }
		 });
	 };	 
	 /**
	  * 登录
	  */
     var login=function(backUrl,jump){
         if(backUrl.indexOf("kf.qq.com") < 0)
         {
             if(window.location.protocol == 'https:')
             {
                 backUrl="https://kf.qq.com/"+backUrl;

             }
             else
             {
                 backUrl="http://kf.qq.com/"+backUrl;

             }
         }
         if(window.location.protocol == 'https:'){
             var url="https://xui.ptlogin2.qq.com/cgi-bin/xlogin?link_target=blank&appid=12000101&s_url="+backUrl;
         }else{
             var url="http://xui.ptlogin2.qq.com/cgi-bin/xlogin?link_target=blank&appid=12000101&s_url="+backUrl;
         }
         //https://xui.ptlogin2.xx.com/cgi-bin/xlogin
         //var url="//ui.ptlogin2.qq.com/cgi-bin/login?link_target=blank&appid=12000101&s_url="+backUrl;
         login_wnd = document.getElementById("login_div");
         if (login_wnd != null){
             login_wnd.style.visible = "hidden"	//先隐藏，这样用户就看不到页面的尺寸变化的效果
             login_wnd.style.display = "block"	//设为block， 否则页面不会真正载入
             var login_frame = document.getElementById('login_frame');
             login_frame.src = url;
         }
         login_wnd.style.display = "block";
         login_wnd.style.position = "absolute";
         login_wnd.style.top = "30%";
         login_wnd.style.left = "50%";
         login_wnd.style.marginTop = "-75px";
         login_wnd.style.marginLeft = "-150px";
     };
	 /**
	  * 退出
	  */
	 var logout=function(){
		 addCookie('is_click_diagnoisis', "0");//清空已经点击了'一键诊断'的cookies
		 var sURL = window.location.href.replace(/'/g, "%27");
		 window.location.href = "/cgi-bin/Logout?url=" + encodeURIComponent(sURL) ;
	 };	 
	 function getHeadUrl(uin){
			var _uinHead=getCookie('uinHead');
			var _headDetail="";
			if(_uinHead==""){//没有cookies，读取接口数据
				_headDetail=setHeadByRemote(uin);
			}else{
				var _headFromRemote=decodeURIComponent(_uinHead);
				var _temp=_headFromRemote.split(',');
				if(_temp[0]!==uin){//有数据，但不是当前的UIN
					_headDetail=setHeadByRemote(uin);
				}else{//有数据，并且是当前的UIN
					_headDetail=_headFromRemote;
				}
			}
			var _headInfo= _headDetail.split(',');
			return HtmlAttributeEncode(_headInfo[1]);
		};
		function setHeadByRemote(uin){
			var _uinHeadUrl="";
			$.ajax({
				type : "get",
				url : "/cgi-bin/commonNew?rand=" + Math.random(),
				data : "command="
						+ encodeURIComponent('command=C00030&uin='+uin+"&skey=\r\n"),
				dataType : "json",
				async : false,
				timeout : 3000,
				success : function(data) {
					_uinHeadUrl= decodeURIComponent(data.resultinfo.list[0].url);		
					_uinHeadUrl=uin+","+_uinHeadUrl;
					addHeadCookie('uinHead',_uinHeadUrl,24);
				},
				error : function(xml) {
					return sys_errors();
				}
			});
			return _uinHeadUrl;
		};
		function addHeadCookie(objName, objValue, objHours){
		    var str = objName + "=" + escape(objValue);
		    str += ";domain=kf.qq.com";
		    if (objHours > 0) {
		        var date = new Date();
		        var ms = objHours * 3600 * 1000;
		        date.setTime(date.getTime() + ms);
		        str += ";expires=" + date.toGMTString();
		    }
		    document.cookie = str;
		};

		function getHeadCookie(name){
		    var search = name + "=",cookies = document.cookie.split(" ");
		     for (var i = 0,l = cookies.length; i < l; i++) {
		     	var pair = cookies[i].split(";")[0];
		     	if (pair.indexOf(search) == 0) {
		        	var offset = search.length;
		            	var end = pair.length;
		            	return pair.substring(offset, end);
		        	}
			}
		    return "";
		};
		function toServerList(){
			if(KF.com.user.uin===""){
				KF.com.login("/service_list/index.html?tab=ing");
			}else{
				location.href="/service_list/index.html?tab=ing";
			}
		};
		function toDiagnoise(){
			if(KF.com.user.uin===""){
				KF.com.login("/more_diagnosis.html");
			}else{
				location.href="/more_diagnosis.html";
			}
		}
	 return {
		 user : _user,
		 init : _init,//初始化登录 
		 login : login,
		 logout : logout,
		 getHeadUrl:getHeadUrl,
		 toServerList:toServerList,
		 getCookie: getCookie,
		 toDiagnoise :toDiagnoise
	 };
	 
 })();
 