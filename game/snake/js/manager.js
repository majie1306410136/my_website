var mycanvas=document.getElementById("mycanvas");
var ctx=mycanvas.getContext("2d");
ctx.fillStyle="#66ccff";
ctx.lineWidth=1;
ctx.strokeStyle="#6c6c6c";
var dir="right";
var control=true;
speed=1000;
var bodyx,bodyy;
var posx,posy;
var foodx,foody;
var ismousedown=false;
var nowpos=0;
reset();
update();
var count=0;
var cube;
var t;

function reset(){
	cube=document.getElementById("cube");
	cube.style.left=(1000-speed)/5+"px";
	bodyx=new Array();
	bodyy=new Array();
	bodyx.push(1);
	bodyy.push(3);
	bodyx.push(2);
	bodyy.push(3);
	bodyx.push(3);
	bodyy.push(3);
	foodx=parseInt(Math.random()*40);
	foody=parseInt(Math.random()*40);
	posx=3;
	posy=3;
	count=0;
	nowpos=0;
	speed=1000;
	dir="right";
}

var nowa;

function mousedown(){
	clearTimeout(t);
	ismousedown=true;
	nowpos=getMousePosX();
	nowa=parseInt(cube.style.left.substring(0,cube.style.left.length-2));
}

function mouseup(){
	ismousedown=false;
	clearTimeout(t);
	update();
}

function mousemv(){
	if(ismousedown){
		var kkk=getMousePosX()-nowpos;
		if((kkk+nowa)<0){
			kkk=-nowa;
		}
		if((kkk+nowa)>200){
			kkk=200-nowa;
		}
		cube.style.left=nowa+kkk+"px";
		speed=parseInt(Math.abs(2300-Math.sqrt((kkk+nowa)*10)*50)/2);
		console.log(kkk+nowa);
	}
}

function getMousePosX(event){
	var e=event||window.event;
	return e.clientX;
}

function checkfood(){
	for(var i=0;i<bodyx.length;i++){
		if(bodyx[i]==foodx&&bodyy[i]==foody){
			add();
			foodx=parseInt(Math.random()*40);
			foody=parseInt(Math.random()*40);
		}
	}
}

function checkdeath(){
	for(var i=0;i<(bodyx.length-2);i++){
		if(bodyx[bodyx.length-1]==bodyx[i]&&bodyy[bodyy.length-1]==bodyy[i]){
			alert("You dead\rbest score:"+bodyx.length);
			reset();
		}
	}
	if(bodyx[bodyx.length-1]>39){
		bodyx[bodyx.length-1]=0;
		posx=0;
		draw();
	}
	if(bodyy[bodyy.length-1]>39){
		bodyy[bodyy.length-1]=0;
		posy=0;
		draw();
	}
	if(bodyx[bodyx.length-1]<0){
		bodyx[bodyx.length-1]=39;
		posx=39;
		draw();
	}
	if(bodyy[bodyy.length-1]<0){
		bodyy[bodyy.length-1]=39;
		posy=39;
		draw();
	}
}

function add(){
	bodyx.push(posx);
	bodyy.push(posy);
}

function update(){
	move();
	checkfood();
	draw();
	checkdeath();
	t=setTimeout(update,speed);
}


function draw(){
	ctx.clearRect(0,0,400,400);
	ctx.fillStyle="#66CCFF";
	for(var i=0;i<bodyx.length;i++){
		ctx.fillRect(bodyx[i]*10,bodyy[i]*10,10,10);
		ctx.strokeRect(bodyx[i]*10,bodyy[i]*10,10,10);
	}
	ctx.fillStyle="#FF6666";
	ctx.fillRect(foodx*10,foody*10,10,10);
}

function move(){
	switch(dir){
		case "right":
			posx++;
			bodyx.push(posx);
			bodyy.push(posy);
			break;
		case "left":
			posx--;
			bodyx.push(posx);
			bodyy.push(posy);
			break;
		case "up":
			posy--;
			bodyx.push(posx);
			bodyy.push(posy);
			break;
		case "down":
			posy++;
			bodyx.push(posx);
			bodyy.push(posy);
			break;
	}
	control=true;
	bodyx.shift();
	bodyy.shift();
}


document.onkeyup=function(event){
	var e=event || window.event || arguments.caller.arguments[0];
	if(control){
		if(e&&e.keyCode==40){
			if(dir!="down"&&dir!="up"){
				dir="down";
				control=false;
			}
		}if(e&&e.keyCode==37){
			if(dir!="left"&&dir!="right"){
				dir="left";
				control=false;
			}
		}if(e&&e.keyCode==38){
			if(dir!="down"&&dir!="up"){
				dir="up";
				control=false;
			}
		}if(e&&e.keyCode==39){
			if(dir!="left"&&dir!="right"){
				dir="right";
				control=false;
			}
		}
	}


}