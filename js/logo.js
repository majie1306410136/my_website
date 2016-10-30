var canvas=document.getElementById("logo");
	var ctx=canvas.getContext("2d");
	function Cube(x,y){
		this.x=x;
		this.y=Math.random()*30;
		this.curx=x;
		this.cury=y;
		this.speed=Math.random()+1;
		this.move=true;
	}
	Cube.prototype.show=function(){
		ctx.fillRect(this.x,this.y,7,7);
		if(this.move){
			this.y+=this.speed;
			if(Math.abs(this.cury-this.y)<=2){
				this.y=this.cury;
				this.move=false;
			}
		}
	}

	var arr_a;

	var show="                                                                      000000   00000  0             0     0    0 0     0 0             0     0    0 0     0 0      000    0000  0    0 0     0 0     0   0   0   0 0    0 0   0 0 0     0   0   0   0000000   00000  00000  000 0  0000               0                                                       ";
	var shownum;
	var count;
	var showcount;
	function logoreset(){
		var r,g,b;
		do{
			r=parseInt(Math.random()*255);
			g=parseInt(Math.random()*255);
			b=parseInt(Math.random()*255);
		}while(r+g+b>500);
		ctx.fillStyle="rgb("+r+","+g+","+b+")";
		arr_a=new Array();
		shownum=new Array();
		ctx.clearRect(0,0,350,150);
		for(var i=0;i<10;i++){
			for(var j=0;j<35;j++){
				arr_a.push(new Cube(12+j*8,40+i*8));
				if(show.charAt(i*35+j)=="0"){
					shownum.push(i*35+j);
				}
			}
		}
		var length=shownum.length;
		for(var i=0;i<1000;i++){
			var rd=parseInt(Math.random()*length);
			var cg=shownum[rd];
			shownum[rd]=shownum[length-1-rd];
			shownum[length-1-rd]=cg;
		}
		count=0;
		showcount=0;
		showlogo();
	};
	function showlogo(){
		ctx.clearRect(0,0,350,150);
		for(var i=0;i<count;i++){
			arr_a[shownum[i]].show();
		}
		count++;
		if(count>75){
			count=75;
			showcount++;
			if(showcount>400){
				logoreset();
				return;
			}
		}
		setTimeout(showlogo,1000/60);
	}

	logoreset();