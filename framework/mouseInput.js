// [MOUSE]
	var mouse_x = undefined;
	var mouse_y = undefined;
	var mouse_pressed = false;
	
	var boundX = 0;
	var boundY = 0;
	
	var freeMouse = true;
	
	// criando funções para uso do [MOUSE] 
	var _mouseMove = function(e){
		mouse_x = (e.clientX-boundX)/(xRealResolution/xResolution);
		mouse_y = (e.clientY-boundY)/(yRealResolution/yResolution);
	}

	var _mouseUp = function(e)
	{
	
		// botão esquerdo	
		if (e.button == 0)
		{
			mouse_pressed = false;
		}
	}	

	var _mouseDown = function(e)
	{
		// botão esquerdo
		if (e.button == 0)
		{
			mouse_pressed = true;
		}
	}
	
	// registrando as funções
	document.addEventListener("mousemove", _mouseMove, false);
	document.addEventListener("mouseup",   _mouseUp,   false);
	document.addEventListener("mousedown", _mouseDown, false);
	
	
function Cursor(x, y, w, h, sprite){
	this.x = x-w/2;
	this.y = y-h/2;
	this.w = w;
	this.h = h;
	this.sprite = sprite;
	
	this.draw = function(){
		ctx.drawImage(this.sprite, this.x, this.y, this.w, this.h);
	}
	
}

playerCursor = new Cursor(mouse_x, mouse_y, undefined, undefined, undefined);