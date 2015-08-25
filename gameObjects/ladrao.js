//Variáveis para os itens
var ladrao = [];

//Variáveis para o Sprite
var namesLadrao = ["ladrao", "ladraoHand"];
var spriteLadrao = [];


function Ladrao(x, y, w, h, type, sprite, id){
	this.y = 500;
	this.yT = y;
	this.type = "ladrao";
	this.sprite = sprite;
	this.w = sprite.width/1.28;
	this.h = sprite.height/1.28;
	this.x = x+Math.random()*200;
	this.xI = x;
	this.id = id-(scene.level);
	this.idI = id;
	
	this.status;
	
	this.timeAttack;
	
	this.request = scene.itensToTheft[0];
	
	var r;
	
	var reqInTable = true;
	
	this.timeToAttack;
	this.attackTime;
	var canAttack = true;
	
	var hidden = false;
	var wait = false;
	
	this.hand = new Cursor(this.x + this.w/4, this.y + this.h/1.5, spriteLadrao[1].width, spriteLadrao[1].height, spriteLadrao[1], "ladrao");
	
	this.hand.owner = this;
	this.hand.type = "ladraoHand";
	
	this.hand.draw = function(){
		if(this.owner.status == "wait"){
			ctx.drawImage(this.sprite, this.x, this.y, this.w, this.h);
		}
	}
	
	this.rouboSucesso = false;
	
	this.update = function(){
		switch(this.status){
			default:
				switch(scene.subLevel){
					case 1:
						this.timeAttack = 3;
						break;
						
					case 2:
						this.timeAttack = 1.8;
						break;
				}
				
				r = this.id - Math.floor(Math.random()*3)
				this.request = scene.itensToTheft[this.id];
				break;
			
			case "start":
				switch(scene.subLevel){
					case 1:
						this.timeToAttack = 1.8;
						break;

					case 2:
						this.timeToAttack = 2.5;
						break;
				}
				this.status = "hidden";
				hidden = true;
				break;

			case "hidden":
				if(hidden){
					this.attackTime = new Timer();
					hidden = false;
					this.x = this.xI + Math.random()*400;
				}
				if(this.attackTime.current() > this.timeToAttack*1.5/scene.level){
					if(this.rouboSucesso){
						this.request.stolen = true;
					}
					if(this.y > 200){
						this.y -= 10;
						this.hand.x = this.x + this.w/2 - this.hand.w/2-18;
						this.hand.y = this.y+ this.h/2;
					}else{
						this.status = "wait";
						wait = true;
						this.rouboSucesso = false;
					}
				}
				break;

			case "wait":
				if(wait){
					this.attackTime = new Timer();
					wait = false;
				}
				
				if(typeof this.request !=="undefined"){
					if(this.request.owner != this.hand){
						if(this.request.owner.type == "client" || this.request.owner.type == "ladraoHand"){
							this.id++;
							this.request = scene.itensToTheft[this.id];
							console.log("troca!");
						}
					}
					if(typeof this.request !=="undefined"){
						if(this.request.stolen){
							this.id++;
							this.request = scene.itensToTheft[this.id];
							console.log("troca!");
						}
					}
				}else{
					this.id = 0;
					this.request = scene.itensToTheft[this.id];
				}
				
				if(this.attackTime.current() > this.timeToAttack*2){
					if(this.y < 800){
						this.y += 20;
						this.hand.x = this.x + this.w/2 - this.hand.w/2-18;
						this.hand.y = this.y+ this.h/2;
					}else{
						this.status = "hidden";
						hidden = true;
					}
				}
				if(reqInTable && typeof this.request != "undefined"){
					if(!this.rouboSucesso){
						if(this.hand.y > this.request.y + 5){
							this.hand.y -= 5;
						}
						if(this.hand.y < this.request.y - 5){
							this.hand.y += 5;
						}
						if(this.hand.x > this.request.x + 5){
							this.hand.x -= 5;
						}
						if(this.hand.x < this.request.x - 5){
							this.hand.x += 5;
						}
						
						if(collAABB(this.hand, this.request)){
							this.request.owner = this.hand;
							this.rouboSucesso = true;
						}
					}
				}
				break;

			case "attacked":
				hidden = false;
				wait = false;
				
				this.rouboSucesso = false;
				
				if(this.request.owner = this.hand){
					this.request.owner = scene.mesa;
				}
				if(this.y < 600){
					this.y += 20;
				}else{
					this.status = "hidden";
					hidden = true;
				}
				break;

			case "finish":
				if(this.y < 600){
					this.y += 25;
				}
				break;
		}
		
	};
	
	this.draw = function(){
		ctx.drawImage(this.sprite, this.x, this.y, this.w, this.h);
		
		if(this.status == "wait" && this.y == 200){
				
			if(typeof this.request !=="undefined" && !this.request.stolen){
				ctx.drawImage(spritesBalao[0], (this.x+this.w/2)-spritesBalao[0].width/2, this.y-150, spritesBalao[0].width, spritesBalao[0].height);
				ctx.drawImage(this.request.sprite, (this.x+this.w/2)-this.request.w/2, this.y-85, this.request.w, this.request.h);
			}
		}
	};
};