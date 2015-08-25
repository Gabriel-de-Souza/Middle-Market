var espada;

var namesEspada = ["espada"];
var spriteEspada = [];

function Espada(name, x, y, type, sprite){
	this.name = name;
	this.xI = x;
	this.yI = y;
	this.x = x;
	this.y = y;
	this.sprite = sprite;
	this.w = sprite.width/3;
	this.h = sprite.height/6;
	this.type = type;
	
	this.status = "mesa";
	
	this.owner = scene.mesa;
	
	this.target;
	
	this.ladraoTarget = false;
	
	var click = false;
	
	var getPlayer = false;
	
	//Funções do objeto
	
	this.update = function(){
		switch(this.status){
			case "mesa":
				freeMouse = true;
				
				getPlayer = false;
				
				if(this.x < this.xI-5){
					this.x+=20;
				}
				if(this.x > this.xI+5){
					this.x-=20;
				}
				if(this.y < this.yI-5){
					this.y+=20;
				}
				if(this.y > this.yI+5){
					this.y-=20;
				}
				
				if(collAABB(this, playerCursor)){
					if(!mouse_pressed){
						click = true;
					}
					
					if(click && mouse_pressed && freeMouse){
						this.owner = playerCursor;
						freeMouse = false;
						click = false;
						getPlayer = true;
						
						this.status = "player";
					}
				}else{
					click = false;
				}
				
				break;
				
			case "player":
				this.x = (playerCursor.x + playerCursor.w/2) - this.w/2 + 5;
				this.y = (playerCursor.y + playerCursor.h/2) - this.h/2 - this.h/4 - 25;
				playerCursor.select = this;
				
				if(!mouse_pressed){
					click = true;
				}	
				if(click){
					
					for(i in ladrao){
						if(collAABB(this, ladrao[i])){
							this.ladraoTarget = true;
							break;
						}
						this.ladraoTarget = false;
					}
					
					if(mouse_pressed){
						for(i in ladrao){
							if(collAABB(this, ladrao[i])){
								ladrao[i].status = "attacked";
								this.owner = scene.mesa;
								freeMouse = true;
								click = false;
								getPlayer = false;
								
								this.status = "mesa";
							}else{
								this.owner = scene.mesa;
								freeMouse = true;
								click = false;
								getPlayer = false;
								
								this.status = "mesa";
							}
						}
						
						for(i in clients){
							if(collAABB(this, clients[i]) && !this.ladraoTarget){
								clients[i].status = "attacked";
								this.owner = scene.mesa;
								freeMouse = true;
								click = false;
								getPlayer = false;
								
								this.status = "mesa";
							}else{
								this.owner = scene.mesa;
								freeMouse = true;
								click = false;
								getPlayer = false;
								
								this.status = "mesa";
							}
						}
					}
				}
				break;
		}
	}
	
	this.draw = function(){
		ctx.drawImage(this.sprite, this.x, this.y, this.w, this.h);
	}
}