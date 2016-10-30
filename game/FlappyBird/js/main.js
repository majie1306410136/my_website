var ctx=mycanvas.getContext("2d");
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
HTMLAudioElement.prototype.stop = function() 
{ 
this.pause(); 
this.currentTime = 0.0; 
} 

function Engine(){
	var self=this;
	function Img(url){
		var img=new Image();
		img.src=url;
		img.onload=function(){
			self.loadcmp++;
			ctx.fillRect(self.width/2-100,self.height/2-10,self.loadcmp/self.load_length*200,20);
			if(self.loadcmp==self.load_length){
				init();
			}
		}
		return img;
	}
	function pos(x,y){
		this.x=x;
		this.y=y;
	}
	function rotate_draw(pos,obj,deg){
		ctx.translate(pos.x+obj.width/2,pos.y+obj.height/2);
		ctx.rotate(deg*Math.PI/180);
		ctx.translate(-pos.x-obj.width/2,-pos.y-obj.height/2);
		ctx.drawImage(obj,pos.x,pos.y);
		ctx.setTransform(1,0,0,1,0,0);
	}
	function pipe(dis){
		this.dis=dis;
		this.flow=false;
		this.pos=new pos(288,Math.random()*300+this.dis/2);  //385~85
	}
	pipe.prototype.move=function(){
		this.pos.x-=1.2;
		if(this.pos.x<-50)
			self.pipearr.remove(this);
		if(this.pos.x+52<self.birdpos.x&&!this.flow){
			this.flow=true;
			self.score++;
			point.play();
		}
	}
	pipe.prototype.draw = function() {
		ctx.drawImage(self.pipe[0],this.pos.x,this.pos.y-this.dis/2-320);
		ctx.drawImage(self.pipe[1],this.pos.x,this.pos.y+this.dis/2);
	};

	(function(){
		self.width=mycanvas.offsetWidth;
		self.height=mycanvas.offsetHeight;
		self.loadcmp=0;
		self.load_length=20;
		self.startAnimecount=0;
		self.birdpos=new pos(0,0);
		self.birdspd=new pos(0,0);
		self.birddeg=0;
		self.pipeinit=240;
		self.g=0.5;
		self.score=0;
		self.gamestart=false;
		self.inStartwin=true;
		self.pipearr=[];
		ctx.fillStyle="#66ccff";
		ctx.fillRect(0,0,self.width,self.height);
		ctx.fillStyle="#ccc";
		ctx.strokeRect(self.width/2-100,self.height/2-10,200,20);
		self.bird=[];
		self.num=[];
		self.bird.push(new Img("resource/b0.png"));
		self.bird.push(new Img("resource/b1.png"));
		self.bird.push(new Img("resource/b2.png"));
		self.bg=new Img("resource/bg_day.png");
		self.play_btn=new Img("resource/button_play.png");
		self.num.push(new Img("resource/font_048.png"));
		self.num.push(new Img("resource/font_049.png"));
		self.num.push(new Img("resource/font_050.png"));
		self.num.push(new Img("resource/font_051.png"));
		self.num.push(new Img("resource/font_052.png"));
		self.num.push(new Img("resource/font_053.png"));
		self.num.push(new Img("resource/font_054.png"));
		self.num.push(new Img("resource/font_055.png"));
		self.num.push(new Img("resource/font_056.png"));
		self.num.push(new Img("resource/font_057.png"));
		self.land=new Img("resource/land.png");
		self.pipe=[];
		self.pipe.push(new Img("resource/pipe_down.png"));
		self.pipe.push(new Img("resource/pipe_up.png"));
		self.title=new Img("resource/title.png");
		self.tutorial=new Img("resource/tutorial.png");
		hit.addEventListener("loadeddata",function(){
			self.loadcmp++;
			ctx.fillRect(self.width/2-100,self.height/2-10,self.loadcmp/self.load_length*200,20);
			if(self.loadcmp==self.load_length){
				init();
			}
		})
		point.addEventListener("loadeddata",function(){
			self.loadcmp++;
			ctx.fillRect(self.width/2-100,self.height/2-10,self.loadcmp/self.load_length*200,20);
			if(self.loadcmp==self.load_length){
				init();
			}
		})
		wing.addEventListener("loadeddata",function(){
			self.loadcmp++;
			ctx.fillRect(self.width/2-100,self.height/2-10,self.loadcmp/self.load_length*200,20);
			if(self.loadcmp==self.load_length){
				init();
			}
		})
	})();

	function init(){
		self.startAnimecount=0;
		self.score=0;
		self.inStartwin=true;
		self.gamestart=false;
		self.pipearr=[];
		self.birdpos=new pos(0,0);
		self.birdspd=new pos(0,0);
		self.birdpos=new pos(self.width/2-15,200);
		self.birdspd.y=-1;
		self.birddeg=0;
		self.pipeinit=240;
		startAnime();
		mycanvas.onmousemove=function(e){
			if(e.layerX<self.width/2+self.play_btn.width/2-5&&e.layerX>self.width/2-self.play_btn.width/2+5&&e.layerY>300&&e.layerY<300+self.play_btn.height-8){
				mycanvas.style.cursor="pointer";
			}else{
				mycanvas.style.cursor="default";
			}
		}
		mycanvas.onclick=function(e){
			if(e.layerX<self.width/2+self.play_btn.width/2-5&&e.layerX>self.width/2-self.play_btn.width/2+5&&e.layerY>300&&e.layerY<300+self.play_btn.height-8){
				self.inStartwin=false;
			}
		}
		document.body.ontouchstart=null;
		mycanvas.ontouchstart=function(e){
			var e=e.touches[0];
			var lx=e.pageX-mycanvas.offsetLeft;
			var ly=e.pageY;
			if(lx<self.width/2+self.play_btn.width/2-5&&lx>self.width/2-self.play_btn.width/2+5&&ly>300&&ly<300+self.play_btn.height-8){
				self.inStartwin=false;
			}
		}
	}

	function startAnime(){
		ctx.clearRect(0,0,self.width,self.height);
		ctx.drawImage(self.bg,0,0);
		ctx.drawImage(self.title,self.width/2-self.title.width/2,100);
		ctx.drawImage(self.play_btn,self.width/2-self.play_btn.width/2,300);
		ctx.drawImage(self.bird[parseInt(self.startAnimecount/10)%3],self.birdpos.x,self.birdpos.y);
		ctx.drawImage(self.land,self.width/2-self.land.width/2-self.startAnimecount/10%2*12,self.height-40);
		self.birdpos.y+=self.birdspd.y;
		if(self.birdpos.y<200)
			self.birdspd.y+=0.02;
		else
			self.birdspd.y-=0.02;
		self.startAnimecount++;
		if(self.inStartwin)
			setTimeout(startAnime,1000/60);
		else{
			start();
		}
	}

	function start(){
		mycanvas.style.cursor="default";
		mycanvas.onmousemove=null;
		mycanvas.onclick=null;
		self.inStartwin=false;
		mycanvas.style.cursor="pointer";
		ctx.clearRect(0,0,self.width,self.height);
		ctx.drawImage(self.bg,0,0);
		ctx.drawImage(self.land,self.width/2-self.land.width/2,self.height-40);
		ctx.drawImage(self.tutorial,self.width/2-self.tutorial.width/2+40,200);
		self.birdpos=new pos(70,260);
		ctx.drawImage(self.bird[0],self.birdpos.x,self.birdpos.y);
		mycanvas.onclick=function(){
			self.startAnimecount=0;
			self.gamestart=true;
			update();
			mycanvas.onclick=function(){
				self.birdspd.y=-8;
				self.birddeg=-60;
				wing.stop();
				wing.play();
			};
			document.body.ontouchstart=function(e){
				self.birdspd.y=-8;
				self.birddeg=-60;
			}
		}
		mycanvas.ontouchstart=null;
	}

	function update(){
		move();
		render();
		if(self.gamestart)
			setTimeout(update,1000/60);
	}

	function move(){
		self.birdpos.y+=self.birdspd.y;
		self.birdspd.y+=self.g;
		self.birddeg+=3;
		self.pipearr.forEach(function(e){
			e.move();
		})
		if(self.startAnimecount%parseInt(self.pipeinit)==0){
			var d=120+50-parseInt(self.startAnimecount/360);
			if(d<120)
				d=120+Math.random()*20;
			self.pipearr.push(new pipe(d));
			self.pipeinit-=1;
			if(self.pipeinit<150)
				self.pipeinit=150+Math*random()*30;
		}
		if(self.birddeg>80)
			self.birddeg=80;
		self.startAnimecount++;
	}

	function render(){
		ctx.clearRect(0,0,self.width,self.height);
		ctx.drawImage(self.bg,0,0);
		for(var i=0,length=self.pipearr.length;i<length;i++){
			self.pipearr[i].draw();
		}
		for(var i=0,length=self.score.toString().length;i<length;i++){
			var str=self.score.toString();
			if(self.score<10)
				str="00"+str;
			else if(self.score<100)
				str="0"+str;
			ctx.drawImage(self.num[str[0]],self.width/2-26,100);
			ctx.drawImage(self.num[str[1]],self.width/2,100);
			ctx.drawImage(self.num[str[2]],self.width/2+26,100);
		}
		ctx.drawImage(self.land,self.width/2-self.land.width/2-self.startAnimecount/10%2*12,self.height-40);
		rotate_draw(self.birdpos,self.bird[parseInt(self.startAnimecount/10)%3],self.birddeg);
		check();
	}

	function check(){
		if(self.birdpos.y>450){
			dead();
		}
		if(self.birdpos.y+25<0){
			dead();
		}
		for(var i=0,length=self.pipearr.length;i<length;i++){
			if(self.birdpos.x+35>self.pipearr[i].pos.x&&self.birdpos.x<self.pipearr[i].pos.x+52){
				if(self.birdpos.y<self.pipearr[i].pos.y-self.pipearr[i].dis/2||self.birdpos.y+25>self.pipearr[i].pos.y+self.pipearr[i].dis/2){
					dead();
				}
			}
		}
	}

	function dead(){
		hit.play();
		self.gamestart=false;
		setTimeout(function(){alert("game over");init();},50);
	}

}

Engine();