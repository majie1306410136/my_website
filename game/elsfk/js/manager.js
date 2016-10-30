var con=new Array(210);
var mv=new Array(210);
var save=new Array(210);
var posx,posy;
var score=0;
var level=0;
var dlt=0;
var ns=1000;
var speed=ns;
var fal=false;
var down=false;
var pause=false;
var canvas=document.getElementById("mycanvas");
var ctx=canvas.getContext("2d");
ctx.shadowBlur=10;
ctx.shadowOffsetX=20;
ctx.shadowOffsetY=10;
var t;
var nowType;
var nowNum;
var nextType="L";
var nextNum=3;
ctx.strokeStyle="black";
ctx.fillStyle="rgba(102,204,255,0.6)";
ctx.strokeStyle="#6c6c6c";
var L=new Array(4);
var J=new Array(4);
var S=new Array(4);
var Z=new Array(4);
var O=new Array(4);
var T=new Array(4);
var I=new Array(4);
Left.ontouchstart=function(){
	if(!pause){
		for(var i=0;i<20;i++){
			if(mv[i*10]==1){
				return;
			}
		}
		for(var i=0;i<200;i++)
			if(mv[i]==1){
				con[i]=0;
			}
		left();
		check();
		for(var i=0;i<200;i++)
			if(mv[i]==1){
				con[i]=1;
			}
		draw();
	}
}
Right.ontouchstart=function(){
	if(!pause){
		for(var i=0;i<20;i++){
			if(mv[i*10+9]==1){
				return;
			}
		}
		for(var i=0;i<200;i++)
			if(mv[i]==1){
				con[i]=0;
			}
		right();
		check();
		for(var i=0;i<200;i++)
			if(mv[i]==1)
				con[i]=mv[i];
		draw();
	}
}
Down.ontouchstart=function(){
	if(!pause){
		if(!down){
			clearTimeout(t);
			speed=50;
			update();
			down=true;
		}
	}
}
Change.ontouchstart=function(){
	if(!pause){
		change(nowType,nowNum);
	}
}
Fall.ontouchstart=function(){
	if(!pause){
		if(!fal){
			clearTimeout(t);
			for(var i=0;i<200;i++)
				if(mv[i]==1){
					con[i]=0;
				}
			while(check()){
				fall();
			}
			speed=ns;
			draw();
			update();
			fal=true;
		}
	}
}
Down.ontouchend=function(){
	down=false;
	clearTimeout(t);
	speed=ns;
	update();
}
Fall.ontouchend=function(){
	fal=false;
}
reset();
update();


function Pause(){
	if(!pause){
		clearTimeout(t);
		ctx.shadowColor="white";
		ctx.font="50px Microsoft YaHei";
		ctx.fillStyle="#6c6c6c";
		ctx.fillText("Pause",30,220);
		ctx.fillStyle="rgba(102,204,255,0.6)";
		ctx.shadowColor="black";
		pause=true;
	}else{
		pause=false;
		update();
	}
}

function update(){
	if(!pause){
		for(var i=0;i<200;i++)
			if(mv[i]==1){
				con[i]=0;
			}
		fall();
		if(!check()){
			for(var i=0;i<200;i++){
				if(mv[i]==1)
					con[i]=mv[i];
				mv[i]=0;
			}
			score+=10;
			del();
			posx=3;
			posy=0;
			createNew();
		}
		for(var i=0;i<200;i++)
			if(mv[i]==1){
				con[i]=mv[i];
			}
		if(dlt<20){
			ns=1000;
			level=0;
		}else if(dlt<20){
			ns=500;
			level=1;
		}else if(dlt<50){
			ns=350;
			level=2;
		}else if(dlt<100){
			ns=200;
			level=3;
		}else if(dlt<200){
			ns=150;
			level=4;
		}else if(dlt<500){
			ns=70;
			level=5;
		}
		draw();
		t=setTimeout(update,speed);
	}
}

function drawRect(x,y){
	ctx.fillRect(x,y,20,20);
	ctx.strokeRect(x,y,20,20);
}

function draw(){
	ctx.clearRect(0,0,401,401);
	ctx.shadowColor="white";
	ctx.font="20px Microsoft YaHei";
	ctx.strokeText("消行:",220,140);
	ctx.strokeText(dlt,270,141);
	ctx.strokeText("分数:",220,170);
	ctx.strokeText(score,270,171);
	ctx.strokeText("等级:",220,200);
	ctx.strokeText(level,270,201);
	ctx.strokeRect(0,0,202,402);
	ctx.strokeRect(220,20,81,81);
	ctx.shadowColor="#262626";
	for(var i=0;i<20;i++){
		for(var j=0;j<10;j++){
			if(con[i*10+j]==1){
				drawRect(1+j*20,1+i*20);
			}
		}
	}
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			switch(nextType){
				case "L":
						if(L[nextNum].a[i*4+j]==1)
							drawRect(220+j*20,20+i*20,20,20);
						break;
				case "J":
						if(J[nextNum].a[i*4+j]==1)
							drawRect(220+j*20,20+i*20,20,20);
						break;
				case "S":
						if(S[nextNum].a[i*4+j]==1)
							drawRect(220+j*20,20+i*20,20,20);
						break;
				case "Z":
						if(Z[nextNum].a[i*4+j]==1)
							drawRect(220+j*20,20+i*20,20,20);
						break;
				case "O":
						if(O[nextNum].a[i*4+j]==1)
							drawRect(220+j*20,20+i*20,20,20);
						break;
				case "T":
						if(T[nextNum].a[i*4+j]==1)
							drawRect(220+j*20,20+i*20,20,20);
						break;
				case "I":
						if(I[nextNum].a[i*4+j]==1)
							drawRect(220+j*20,20+i*20,20,20);
						break;
			}
		}
	}
}

function fall(){
	posy++;
	for(var k=0;k<21;k++){
		for(var l=0;l<10;l++){
			save[k*10+l]=mv[k*10+l];
		}
	}
	for(var i=20;i>=1;i--){
		for(var j=9;j>=0;j--){
			mv[i*10+j]=mv[(i-1)*10+j];
			mv[(i-1)*10+j]=0;
		}
	}
	for(var h=0;h<10;h++){
		mv[h]=0;
	}
}

function back(){
	for(var i=0;i<21;i++){
		for(var j=0;j<10;j++){
			mv[i*10+j]=save[i*10+j];
			save[i*10+j]=0;
		}
	}
}

function left(){
	posx--;
	for(var k=0;k<20;k++){
		for(var l=0;l<10;l++){
			save[k*10+l]=mv[k*10+l];
		}
	}
	for(var j=0;j<9;j++){
		for(var i=0;i<20;i++){
			mv[i*10+j]=mv[i*10+j+1];
			mv[i*10+j+1]=0;
		}
	}
	for(var h=0;h<19;h++){
		mv[h*10+9]=0;
	}
}

function right(){
	posx++;
	for(var k=0;k<20;k++){
		for(var l=0;l<10;l++){
			save[k*10+l]=mv[k*10+l];
		}
	}
	for(var j=9;j>0;j--){
		for(var i=19;i>=0;i--){
			mv[i*10+j]=mv[i*10+j-1];
			mv[i*10+j-1]=0;
		}
	}
	for(var h=0;h<19;h++){
		mv[h*10]=0;
	}
}

function createNew(){
	var ran=parseInt(Math.random()*7);
	nowNum=nextNum;
	nowType=nextType;
	switch(nowType){
		case "L":
			addcube(L[nowNum]);break;
		case "J":
			addcube(J[nowNum]);break;
		case "I":
			addcube(I[nowNum]);break;
		case "S":
			addcube(S[nowNum]);break;
		case "Z":
			addcube(Z[nowNum]);break;
		case "O":
			addcube(O[nowNum]);break;
		case "T":
			addcube(T[nowNum]);break;
	}
	nextNum=parseInt(Math.random()*4);
	switch(ran){
		case 0:
			nextType="L";
			break;
		case 1:
			nextType="J";
			break;
		case 2:
			nextType="I";
			break;
		case 3:
			nextType="S";
			break;
		case 4:
			nextType="Z";
			break;
		case 5:
			nextType="O";
			break;
		case 6:
			nextType="T";
			break;
	}
	if(check()){
		for(var i=0;i<200;i++)
		if(mv[i]==1){
			con[i]=0;
		}
	}else{
		alert("Game over");
		reset();
	}
}

function reset(){
	con=new Array(210);
	mv=new Array(210);
	save=new Array(210);
	posx=undefined;
	posy=undefined;
	score=0;
	level=0;
	dlt=0;
	ns=1000;
	speed=ns;
	fal=false;
	down=false;
	pause=false;
	canvas=document.getElementById("mycanvas");
	ctx=canvas.getContext("2d");
	ctx.shadowBlur=10;
	ctx.shadowOffsetX=20;
	ctx.shadowOffsetY=10;
	t=undefined;
	nowType=undefined;
	nowNum=undefined;
	nextType="L";
	nextNum=3;
	ctx.strokeStyle="black";
	ctx.fillStyle="rgba(102,204,255,0.6)";
	ctx.strokeStyle="#6c6c6c";
	L=new Array(4);
	J=new Array(4);
	S=new Array(4);
	Z=new Array(4);
	O=new Array(4);
	T=new Array(4);
 	I=new Array(4);
	posx=3;
	posy=0;
	for(var i=0;i<210;i++){
		con[i]=0;
		mv[i]=0
	}
	for(var j=0;j<10;j++){
		con[j+200]=1;
	}
	L[0]=new Cube(new Array(1,0,0,0,1,0,0,0,1,1,0,0,0,0,0,0));
	L[1]=new Cube(new Array(1,1,1,0,1,0,0,0,0,0,0,0,0,0,0,0));
	L[2]=new Cube(new Array(1,1,0,0,0,1,0,0,0,1,0,0,0,0,0,0));
	L[3]=new Cube(new Array(0,0,1,0,1,1,1,0,0,0,0,0,0,0,0,0));
	J[0]=new Cube(new Array(0,1,0,0,0,1,0,0,1,1,0,0,0,0,0,0));
	J[1]=new Cube(new Array(1,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0));
	J[2]=new Cube(new Array(1,1,0,0,1,0,0,0,1,0,0,0,0,0,0,0));
	J[3]=new Cube(new Array(1,1,1,0,0,0,1,0,0,0,0,0,0,0,0,0));
	I[0]=new Cube(new Array(0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0));
	I[1]=new Cube(new Array(0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0));
	I[2]=new Cube(new Array(0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0));
	I[3]=new Cube(new Array(0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0));
	S[0]=new Cube(new Array(0,1,1,0,1,1,0,0,0,0,0,0,0,0,0,0));
	S[1]=new Cube(new Array(1,0,0,0,1,1,0,0,0,1,0,0,0,0,0,0));
	S[2]=new Cube(new Array(0,1,1,0,1,1,0,0,0,0,0,0,0,0,0,0));
	S[3]=new Cube(new Array(1,0,0,0,1,1,0,0,0,1,0,0,0,0,0,0));
	Z[0]=new Cube(new Array(1,1,0,0,0,1,1,0,0,0,0,0,0,0,0,0));
	Z[1]=new Cube(new Array(0,1,0,0,1,1,0,0,1,0,0,0,0,0,0,0));
	Z[2]=new Cube(new Array(1,1,0,0,0,1,1,0,0,0,0,0,0,0,0,0));
	Z[3]=new Cube(new Array(0,1,0,0,1,1,0,0,1,0,0,0,0,0,0,0));
	O[0]=new Cube(new Array(1,1,0,0,1,1,0,0,0,0,0,0,0,0,0,0));
	O[1]=new Cube(new Array(1,1,0,0,1,1,0,0,0,0,0,0,0,0,0,0));
	O[2]=new Cube(new Array(1,1,0,0,1,1,0,0,0,0,0,0,0,0,0,0));
	O[3]=new Cube(new Array(1,1,0,0,1,1,0,0,0,0,0,0,0,0,0,0));
	T[0]=new Cube(new Array(0,1,0,0,1,1,1,0,0,0,0,0,0,0,0,0));
	T[1]=new Cube(new Array(0,1,0,0,0,1,1,0,0,1,0,0,0,0,0,0));
	T[2]=new Cube(new Array(1,1,1,0,0,1,0,0,0,0,0,0,0,0,0,0));
	T[3]=new Cube(new Array(0,1,0,0,1,1,0,0,0,1,0,0,0,0,0,0));
	createNew();
	draw();
}

function check(){
	for(var i=0;i<210;i++){
		if(con[i]==mv[i] && con[i]==1){
			back();
			return false;
		}
	}
	return true;
}

function del(){
	for(var i=0;i<20;i++){
		var count=0;
		for(var j=0;j<10;j++){
			if(con[i*10+j]==1){
				count++;
			}
			if(count>=10){
				for(var a=0;a<10;a++){
					con[i*10+a]=0;
				}
				for(var b=i;b>0;b--){
					for(var c=0;c<10;c++){
						con[b*10+c]=con[(b-1)*10+c];
						con[(b-1)*10+c]=0;
					}
				}
				for(var d=0;d<10;d++){
					con[d]=0;
				}
			score+=1000;
			dlt++;
			}
		}
	}
}

function change(ntp,nnm){
	for(var i=0;i<210;i++){
		if(mv[i]==1){
			con[i]=0;
			mv[i]=0;
		}
	}
	nnm++;
	if(nnm>3)
		nnm=0;
	switch(ntp){
		case "L":
				if(posx>7)
					posx=7;
				addcube(L[nnm]);
				break;
		case "J":
				if(posx>7)
					posx=7;
				addcube(J[nnm]);
				break;
		case "I":
				if(posx>6)
					posx=6;
				if(posx<0){
					posx=0;
				}
				addcube(I[nnm]);
				break;
		case "S":
				if(posx>7)
					posx=7;
				addcube(S[nnm]);
				break;
		case "Z":
				if(posx>7)
					posx=7;
				addcube(Z[nnm]);
				break;
		case "O":
				if(posx<0)
					posx=0;
				addcube(O[nnm]);
				break;
		case "T":
				if(posx>7)
					posx=7;
				addcube(T[nnm]);
				break;
	}
	check();
	for(var i=0;i<200;i++)
		if(mv[i]==1){
			con[i]=1;
		}
		draw();
	nowNum=nnm;
}

document.onkeydown=function(event){
	var e=event || window.event || arguments.caller.arguments[0];
	if(!pause){
		if(e&&e.keyCode==37){
			for(var i=0;i<20;i++){
				if(mv[i*10]==1){
					return;
				}
			}
			for(var i=0;i<200;i++)
				if(mv[i]==1){
					con[i]=0;
				}
			left();
			check();
			for(var i=0;i<200;i++)
				if(mv[i]==1){
					con[i]=1;
				}
			draw();
		}
		if(e&&e.keyCode==39){
			for(var i=0;i<20;i++){
				if(mv[i*10+9]==1){
					return;
				}
			}
			for(var i=0;i<200;i++)
				if(mv[i]==1){
					con[i]=0;
				}
			right();
			check();
			for(var i=0;i<200;i++)
				if(mv[i]==1)
					con[i]=mv[i];
			draw();
		}
		if(e&&e.keyCode==40){
			if(!down){
				clearTimeout(t);
				speed=50;
				update();
				down=true;
			}
		}
		if(e&&e.keyCode==38){
			change(nowType,nowNum);
		}
		if(e&&e.keyCode==32){
			if(!fal){
				clearTimeout(t);
				for(var i=0;i<200;i++)
					if(mv[i]==1){
						con[i]=0;
					}
				while(check()){
					fall();
				}
				speed=ns;
				draw();
				update();
				fal=true;
			}
		}
	}
}
document.onkeyup=function(event){
	var e=event || window.event || arguments.caller.arguments[0];
	if(e&&e.keyCode==40){
		down=false;
		clearTimeout(t);
		speed=ns;
		update();
	}
	if(e&&e.keyCode==32){
		fal=false;
	}
}


function Cube(abc){
	this.a=abc;
}


function addcube(asd){
	for(var i=0;i<4;i++)
		for(var j=0;j<4;j++){
			mv[posx+j+(posy+i)*10]=asd.a[i*4+j];
		}
}

