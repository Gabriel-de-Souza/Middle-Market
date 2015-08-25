var item = [];

//var itensToSelect = [];

var item_x = [];
var item_y = [];

//Variáveis para o Sprite
var namesItem = ["canela","pimenta","colar1","colar2","colar3","colar4","tecido1","tecido2","tecido3","tecido4"];
var spritesItem = [];


//-----------------------------------------------------------
function object(name, x, y, w, h, type, sprite) {
	this.name = name;
	this.iX = x;
	this.iY = y;
	this.x = x;
	this.y = 800;
	this.w = w;
	this.h = h;
	this.type = type;
	this.sprite = sprite;
	
	var init = {type : undefined};
	
	this.owner = init;
	
	this.stolen = false;
	
	var click = false;
	
	this.update = function(){
		switch(this.owner.type){
			default:
				if(this.y > this.iY){
					this.y -=10;
				}else{
					this.owner = scene.mesa;
				}
				break;
		//--------------------------------------------------------------------------------------
			case "mesa":
				if(this.x < this.iX-5){
					this.x+=30;
				}
				if(this.x > this.iX+5){
					this.x-=30;
				}
				if(this.y < this.iY-5){
					this.y+=30;
				}
				if(this.y > this.iY+5){
					this.y-=30;
				}
				
				if(collAABB(this, playerCursor)){
					if(!mouse_pressed){
						click = true;
					}
					
					if(click && mouse_pressed && freeMouse){
						this.owner = playerCursor;
						freeMouse = false;
						click = false;
					}
				}else{
					click = false;
				}
				
				//--------------------------------------------------------
				
				
				break;
		//--------------------------------------------------------------------------------------
			case "player":
				if(mouse_pressed){
					this.x = (this.owner.x + this.owner.w/2) - (this.w/2);
					this.y = (this.owner.y + this.owner.h/2) - (this.h/2);
				}else{
					this.owner = scene.mesa;
					freeMouse = true;
				}
				
				//Colisões
				if(this.y < 450){
					//Com clientes
					for(i in clients){
						if(collAABB(this, clients[i]) && clients[i].request.name == this.name && clients[i].status == "wait"){
							this.owner = clients[i];
							score++;
							this.status = "client";
							clients[i].status = "exit";
						}
					}
				}
				break;
		//--------------------------------------------------------------------------------------
			case "client":
				this.x = ((this.owner.x + this.owner.w/2) - this.w/3);
				this.y = ((this.owner.y + this.owner.h/2) - this.h/2) + 60;
				break;
		//--------------------------------------------------------------------------------------//--------------------------------------------------------------------------------------
			case "ladraoHand":
				if(!this.stolen){
					this.x = ((this.owner.x + this.owner.w/2) - this.w/2);
					this.y = ((this.owner.y + this.owner.h/2) - this.h/2);
				}else{
					this.x = 5000;
				}
				break;
		//--------------------------------------------------------------------------------------
		}
		
	};
	
	this.draw = function(){
		ctx.drawImage(this.sprite, this.x, this.y, this.w, this.h);	
	};
}