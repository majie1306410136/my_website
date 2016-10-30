var btn=document.getElementsByName('btn');
var btn_select=[true,false,false,false];
var dv=[document.getElementById('effect'),document.getElementById('game'),document.getElementById('other'),document.getElementById('comment')];

function clk(a,index){
	if(a.getAttribute("class")=="button"){
		a.setAttribute("class",a.getAttribute("class")+" select");
		for(var i=0;i<4;i++){
			if(btn_select[i]){
				btn_select[i]=false;
				btn[i].setAttribute("class",btn[i].getAttribute("class").substr(0,6));
				dv[i].style.display="none";
			}
		}
		btn_select[index]=true;
		dv[index].style.display="block";
	}
}

if (window.XMLHttpRequest){
	xmlhttp=new XMLHttpRequest();
}
else{
	xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
}
xmlhttp.open("GET","content.xml",false);
xmlhttp.send();
xmlDoc=xmlhttp.responseXML;


var x=xmlDoc.getElementsByTagName("example");
for (i=0;i<x.length;i++){
	var dm=document.createElement("div");
	dm.setAttribute("class","content");
	dm.innerHTML="<h3>"+x[i].getElementsByTagName("title")[0].childNodes[0].nodeValue+"</h3><time>"+x[i].getElementsByTagName("time")[0].childNodes[0].nodeValue+"</time><p>"+x[i].getElementsByTagName("content")[0].childNodes[0].nodeValue+"</p><br><a href='"+x[i].getElementsByTagName("href")[0].childNodes[0].nodeValue+"' target='_blank'><div class='btn'>"+x[i].getElementsByTagName("btntxt")[0].childNodes[0].nodeValue+"</div>";			
	switch(x[i].getAttribute("type")){
		case "effect":dv[0].appendChild(dm);break;
		case "game":dv[1].appendChild(dm);break;
		case "other":dv[2].appendChild(dm);break;
	}
}

function getReply(){
	xmlhttp.open("GET","reply.xml",false);
	xmlhttp.send();
	xmlDoc=xmlhttp.responseXML;
	console.log();
	sw.innerHTML="";
	var x=xmlDoc.getElementsByTagName("comment");
	for (i=0;i<x.length;i++){
		var dm=document.createElement("div");
		dm.setAttribute("class","message");
		var a=document.createElement("textarea");
		a.setAttribute("class","content");
		a.setAttribute("readonly","readonly");
		dm.appendChild(a);
		dm.setAttribute("name","msg");
		dm.style.position="absolute";
		dm.style.left=x[i].getElementsByTagName("left")[0].childNodes[0].nodeValue*document.getElementsByClassName('container')[0].offsetWidth/1079-50+"px";
		dm.style.top=x[i].getElementsByTagName("top")[0].childNodes[0].nodeValue+"px";
		a.style.backgroundImage="url('"+x[i].getElementsByTagName("bg")[0].childNodes[0].nodeValue+"')";
		a.style.color=x[i].getElementsByTagName("color")[0].childNodes[0].nodeValue;
		a.value=x[i].getElementsByTagName("content")[0].childNodes[0].nodeValue+"\r"+x[i].getElementsByTagName("date")[0].childNodes[0].nodeValue+"---"+x[i].getElementsByTagName("user")[0].childNodes[0].nodeValue;
		sw.appendChild(dm);
	}
}
getReply();

	function setyl(){
		var dt=new Date();
		var rpl=y_rpl.value==""?"这人很懒，并没留下一句话":y_rpl.value;
		var nc=y_nc.value==""?"不愿透漏姓名的人":y_nc.value;
		var txt=rpl+"\r"+dt.getFullYear()+"."+dt.getMonth()+"."+dt.getDay()+"---"+nc;
		yl.children[0].children[0].style.color=y_color.value;
		yl.children[0].children[0].style.backgroundImage="url('"+y_bg.value+"')";
		yl.children[0].children[0].innerText=txt;
	}

	String.prototype.gblen = function(){    
    var len = 0;    
    for (var i=0; i<this.length; i++) {    
        if (this.charCodeAt(i)>127 || this.charCodeAt(i)==94) {    
             len += 2;    
         } else {    
             len ++;    
         }    
     }    
    return len;    
	}    
	y_rpl.onkeyup=function(){
		while(y_rpl.value.gblen()>150){
			y_rpl.value=y_rpl.value.substr(0,y_rpl.value.length-1);
		}
	}

	function upload(){
		var rpl=y_rpl.value==""?"这人很懒，并没留下一句话":y_rpl.value;
		var nc=y_nc.value==""?"不愿透漏姓名的人":y_nc.value;
		var txt="user="+nc+"&content="+rpl+"&color="+y_color.value+"&bg="+y_bg.value+"&left="+(Math.random()*900-40)+"&top="+(Math.random()*370);
		xmlhttp.open("POST","save.php",false);
		xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		xmlhttp.send(txt);
		y_nc.value="";
		y_rpl.value="";
		alert("发布成功");
		setTimeout(getReply,500);
	}
	window.onresize=function(){
		getReply();
	}