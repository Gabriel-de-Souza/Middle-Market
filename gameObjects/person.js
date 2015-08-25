//Variáveis para o Sprite
var namesPerson = ["bispo","cavaleiroT","peao","rainha","rei"];
var spritesPerson = [];

var clients = [];

//--------------------------------------------------------------------------------------------------

var namesBalao = ["balao"];
var spritesBalao = [];

 function Person(name, x, y, w, h, type, sprite){
	
	this.name = name;
	this.y = y;
	this.type = "client";
	this.sprite = sprite;
	this.w = sprite.width;
	this.h = sprite.height;
	this.x = -(this.w/2+100);
	this.iX = x - 40 + Math.random()*80;
	
	this.request;
	
	this.status;
	
	var timeToLeave;
	
	this.update = function(){
		switch(this.status){
			default:
				//this.status = "start";
				break;
			
			case "start":
				if(this.x < this.iX){
					this.x += 5*2.5;
				}else{
					this.status = "wait";
					timeToLeave = new Timer();
				}
				break;
			
			case "wait":
				//Tempo para sair
				switch(scene.level){
					case 1:
						if(timeToLeave.current() >= 2.8){
							this.status = "leave";
						}
						break;
						
					case 2:
						if(timeToLeave.current() >= 2.3){
							this.status = "leave";
						}
						break;
						
					case 3:
						if(timeToLeave.current() >= 1.8){
							this.status = "leave";
						}
						break;
				}
				break;
			
			case "leave":
				if(this.x > xResolution){
					scene.clientVisits++;
					scene.life--;
					this.status = "finish";
				}else{
					this.x += 5*6;
				}
				break;
			
			case "exit":
				if(this.x > xResolution){
					scene.clientVisits++;
					this.status = "finish";
				}else{
					this.x += 5*2;
				}
				break;
			
			case "attacked":
				this.request.owner = scene.mesa;
				
				if(this.x > xResolution){
					scene.clientVisits++;
					scene.life--;
					this.status = "finish";
				}else{
					this.x += 5*6;
				}
				break;
			
			case "finish":
				
				break;
		}
	};
	
	this.draw = function(){
		ctx.drawImage(this.sprite, this.x, this.y, this.w, this.h);
		if(this.status == "wait"){
			ctx.drawImage(spritesBalao[0], (this.x+this.w/2)-spritesBalao[0].width/2, this.y-150, spritesBalao[0].width, spritesBalao[0].height);
			ctx.drawImage(this.request.sprite, (this.x+this.w/2)-this.request.w/2, this.y-86, this.request.w, this.request.h);
		}
	};
}