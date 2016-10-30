Array.prototype.remove=function(a){
		var k=false;
		for(var i=0;i<this.length;i++){
			if(!k){
				if(this[i]==a){
					this[i]=this[i+1];
					k=true;
				}
			}else{
				this[i]=this[i+1];
			}
		}
		if(k)
			this.pop();
	}
	var cvs_c=document.createElement("canvas");
	cvs_c.setAttribute("width",window.outerWidth);
	cvs_c.setAttribute("height",window.outerHeight);
	window.onresize=function(){
		cvs_c.setAttribute("width",window.outerWidth);
		cvs_c.setAttribute("height",window.outerHeight);
		init();

	}
	cvs_c.style.position="fixed";
	cvs_c.style.left="0px";
	cvs_c.style.top="0px";
	cvs_c.style.zIndex="-1";
	var width,height,ctx_c=cvs_c.getContext("2d");
	var arr=[],linedis=70;

	function Pos(x,y){
		this.x=x;
		this.y=y;
	}

	function Point(pos){
		this.pos=pos;
		this.speed=Math.random()*0.05+0.05;
		this.radius=Math.random()*1+1.5;
		this.angle=Math.random()*360*Math.PI/360;
	}

	Point.prototype.update=function(){
		this.pos.x+=this.speed*Math.cos(this.angle);
		this.pos.y+=this.speed*Math.sin(this.angle);
		if(this.pos.x<0||this.pos.x>width||this.pos.y<0||this.pos.y>height){
			arr.remove(this);
			arr.push(new Point(new Pos(Math.random()*600,Math.random()*400)));
		}
	}

	Point.prototype.draw=function(){
		ctx_c.beginPath();
		ctx_c.arc(this.pos.x,this.pos.y,this.radius,0,2*Math.PI);
		ctx_c.closePath();
		ctx_c.fill();
	}

	function init(){
		arr=[];
		width=cvs_c.width;
		height=cvs_c.height;
		ctx_c.fillStyle="rgb(0,0,0)";
		ctx_c.strokeStyle="rgb(0,0,0)";
		for(var i=0;i<width*height/1800;i++){
			arr.push(new Point(new Pos(Math.random()*width,Math.random()*height)));
		}
	}

	function update(){
		ctx_c.clearRect(0,0,width,height);
		arr.forEach(function(e){
			e.update();
			e.draw();
		});
		for(var i=0;i<arr.length;i++){
			for(var j=i+1;j<arr.length;j++){
				var dis=Math.abs(Math.sqrt(Math.pow(arr[i].pos.x-arr[j].pos.x,2)+Math.pow(arr[i].pos.y-arr[j].pos.y,2)));
				if(dis<linedis){
					ctx_c.lineWidth=(linedis-dis)/(linedis*2)+0.1;
					ctx_c.beginPath();
					ctx_c.moveTo(arr[i].pos.x,arr[i].pos.y);
					ctx_c.lineTo(arr[j].pos.x,arr[j].pos.y);
					ctx_c.closePath();
					ctx_c.stroke();
				}
			}
		}
		setTimeout(update,1000/60);
	}
	document.body.appendChild(cvs_c);
	init();
	update();