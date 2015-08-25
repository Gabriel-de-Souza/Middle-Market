var xRealResolution;
var yRealResolution;
var xResolution;
var yResolution;

function Layer(width, height, owner) {
	this.canvas = document.createElement("canvas");
	this.canvas.width = this.width = width;
	this.canvas.height = this.height = height;
	this.ctx = this.canvas.getContext("2d");
	owner.appendChild(this.canvas);
	this.canvas.style.position = "absolute";
	this.canvas.style.display  = "block";
	this.canvas.style.margin  = "auto";
	this.canvas.style.top = 0;
	this.canvas.style.bottom = 0;
	this.canvas.style.left = 0;
	this.canvas.style.right = 0;
	this.canvas.style.right = 0;
};


function Stage(t, b, l, r, w, h, bg, c){
	this.screen = document.createElement("game");
	this.screen.style.width = w + "px";
	this.screen.style.height = h + "px";
	//this.screen.style.background = bg;
	this.screen.style.color = c;
	this.screen.style.position = "absolute";
	this.screen.style.display  = "block";
	this.screen.style.margin  = "auto";
	this.screen.style.top = t;
	this.screen.style.bottom = b;
	this.screen.style.left = l;
	this.screen.style.right = r;

	document.body.appendChild(this.screen);
	
//--------------------------------------------------------------------------------------
	
	this.layer = [];
	
	this.addLayer =  function(){
		this.layer[this.layer.length] = new Layer(w, h, this.screen);
	}
}

function crateMaxStage(t, b, l, r, bg, c, xR, yR, border){
	var screenValue;
	var screenOther;
	
	if(window.innerWidth < window.innerHeight){
		screenValue = (window.innerWidth-border)/xR;
		screenOther = yR*screenValue;
		var stage = new Stage(t, b, l, r, window.innerWidth-border, screenOther, bg, c);
	}else{
		screenValue = (window.innerHeight-border)/yR;
		screenOther = xR*screenValue;
		var stage = new Stage(t, b, l, r, screenOther, window.innerHeight-border, bg, c);
	}
	
	return stage;
	
	//return screenValue;
	
	//return new Stage(t, b, l, r, 800, 600, "red", "white");
}

//---------------------------------------------------------------------------------------
function drawCircle(x, y, r, color, layer){
	layer.ctx.save();
	layer.ctx.fillStyle = color;
	layer.ctx.beginPath();
	layer.ctx.arc(x, y, r, 0, 2*Math.PI);
	layer.ctx.fill();
	layer.ctx.restore();
}

function drawRect(x, y, w, h, color, layer){
	layer.ctx.save();
	layer.ctx.fillStyle = color;
	layer.ctx.beginPath();
	layer.ctx.fillRect(x, y, w, h);
	layer.ctx.fill();
	layer.ctx.restore();
}

// função para escrever no canvas
function drawText(x,y,text,sz,color,font){
	ctx.fillStyle = color;
	ctx.font = sz + "px " + font;
	ctx.fillText(text, x, y);		
}
//-----------------------------------------------------------------------------------------

//My Functions
//---------------------------------------------------
			function hasKey(a, k){
				for(i = 0; i < a.length; i++){
					if(a[i] == k){
						return true;
					}
				}
				return false;
			}
			
			//---------------------------------------------------
			function shuffle(o){ //v1.0
				for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
				return o;
			};
			//---------------------------------------------------