//点击登陆时.弹出登录框
var btn = document.querySelector('.tx_head input');
var login = document.querySelector('.tx_head .login_in');
var close = document.querySelector('#closed');
btn.onclick=function(){
	login.style.display = 'block';
}
close.onclick=function(){
	login.style.display = 'none';
}	

// 设置问题列表,实现点击跳转到对应问题栏
var quLis = document.querySelectorAll('#quLis li')
var As = document.querySelectorAll('#quLis li a')
var divs = document.querySelectorAll('#divs div')

for (var i = 0; i<quLis.length; i++){
	quLis[i].index=i;  //存一个下标,对应给divs
	quLis[i].onclick=function(){
		//点击之前所有的都隐藏
		for (var j = 0; j<quLis.length;j++){
			divs[j].style.display = 'none';
			quLis[j].style.background = '';
			quLis[j].firstElementChild.style.color = '#000';
		}
		var x = this.index;  
		this.style.background = '#00ace9';
		this.firstElementChild.style.color = '#fff';
		divs[x].style.display = 'block';
	}

}
