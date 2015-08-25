Win = function(){
	
	this.update = function(){
		
		playerCursor = new Cursor(mouse_x, mouse_y, spriteMouse[0].width, spriteMouse[0].height, spriteMouse[0]);
		
		if(playerCursor.x+playerCursor.w/2 >= 113 && playerCursor.x+playerCursor.w/2 <= 367  && playerCursor.y+playerCursor.h/2 >= 313  && playerCursor.y+playerCursor.h/2 <= 413  && mouse_pressed == true){
			scene = new Menu();
		}
		
		if(playerCursor.x+playerCursor.w/2 >= 661 && playerCursor.x+playerCursor.w/2 <= 909  && playerCursor.y+playerCursor.h/2 >= 313  && playerCursor.y+playerCursor.h/2 <= 413  && mouse_pressed == true){
			scene = new Game();
		}
		
	};

	this.draw = function(){
		ctx.drawImage(spritesOver[1], 0, 0, 1024, 768);
		
		drawText(xResolution/2-450,530,"Score: " + score,"50","White","Arial");
		
		if(highScore){
			drawText(xResolution/2+190,530,"HScore: " + highScore,"50","White","Arial");
		}else{
			drawText(xResolution/2+190,530,"HScore: " + "0","50","White","Arial");
		}
	};
}