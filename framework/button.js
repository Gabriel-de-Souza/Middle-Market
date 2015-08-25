//Button Creator


//RectButton
function rectButton(x, y, w, h, sprite){
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.sprite = sprite;
	
	this.draw = function(){
		ctx.drawImage(this.sprite, this.x, this.y, this.w, this.h);
	}
}

