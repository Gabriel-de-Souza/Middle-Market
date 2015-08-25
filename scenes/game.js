//Scene
var Game = function(){
	var buttons = [];
	
	var gameMachine;
	
	var wave = true;
	
	score = 0;
	this.life = 3;
	this.clientVisits = 0;
	
	var itensToChoose = [];
	this.itensToTheft = [];
	
	this.timeStartLadrao;
	this.startLadrao = [];
	
	this.level = 1;
	this.subLevel = 1;
	var timeToClient = 3;
	var changeLevel = false;
	
	var clientTime;
	var clientStart = 0;
	
	
	var fundo = {sprite : spriteFundo[0], draw : function(){ctx.drawImage(this.sprite, 0, 0, 1024, 768)} };
	
	this.mesa = {type : "mesa", sprite : spriteMesa[0], draw : function(){ctx.drawImage(this.sprite, 0, 0, 1024, 768)} };
	
	playerCursor = new Cursor(mouse_x, mouse_y, spriteMouse[0].width, spriteMouse[0].height, spriteMouse[0]);
	
	playerCursor.update = function(){
		this.x = (mouse_x)-this.w/2;
		this.y = (mouse_y)-this.h/2;
	}
	
	playerCursor.type = "player";
	
	var play = true;
	
	espada = new Espada("espada", 900, 600, "espada", spriteEspada[0]);
	
	this.update = function(){
		
		switch(gameMachine){
			default:
				if(blackScreen.opacity != 0){
					fadeOut(blackScreen, 1);
				}else{
					jogoaudio.loop = true;
					jogoaudio.play();
					gameMachine = "start";
				}
				break;

			case "start":
				
				this.timeStartLadrao;
				this.startLadrao = [];
				
				//Chamando os Itens
				callInMatriz(30, 500, 180, 128, 2, 5, object, item, namesItem, spritesItem, 10);
				
				ladrao = [];
				
				for(var i = 1; i < this.subLevel+1; i++){	
					ladrao[i] = new Ladrao(300*i-200, 200, spriteLadrao[0].width, spriteLadrao[0].height, "ladrao", spriteLadrao[0], i*3);
					this.startLadrao[i] = true;
				}
		//-------------------------------------------------------------------------------
				
				for(i in item){
					itensToChoose[i] = item[i];
				}
				shuffle(itensToChoose);
				
				for(i in item){
					this.itensToTheft[i] = item[i];
				}
				shuffle(this.itensToTheft);
				
				this.timeStartLadrao = new Timer();
				
				gameMachine = "wave";
				break;

			case "wave":
				if(wave){
					
					//Chamando os Clientes
					callInMatriz(50, 200, 200, 100, 1, 5, Person, clients, namesPerson, spritesPerson, 5);
					
					clientStart = 0
					
					clientTime = new Timer();
					//-------------------------------------------------------------------------------
					
					wave = false;
					
					for(i in clients){
						clients[i].request = itensToChoose[i];
					}
				}else{	
					for(i in item){
						item[i].update();
						if(item[i].y <= item[i].iY && item[i].y < 600){
							gameMachine = "play";
						}
					}
				}
				
				break;

			case "play":
				
				playerCursor.update();
				
				espada.update();
				
				if(this.life <=0){
					gameMachine = "gameOver";
					console.log("PERDEU!!!");
				}
				
				for(i in ladrao){
					if(this.timeStartLadrao.current() >= 5*i && this.startLadrao[i]){
						ladrao[i].status = "start";
						console.log("Ladrão Nº" + i + " saindo!");
						this.startLadrao[i] = false;
					}
				}
				
				//Pause
				if(input.GetKeyDown(32)){
					play = false;
					gameMachine = "pause";
				}
				
				for(i in item){
					item[i].update();
				}
				
				for(i in clients){
					clients[i].update();
				}
		
				for(i in ladrao){
					ladrao[i].update();
				}
				
				
				if(this.clientVisits >= 5){
					if(!changeLevel){
							callInMatriz(50, 200, 200, 100, 1, 5, Person, clients, namesPerson, spritesPerson, 5);
					
							clientTime = new Timer();
							//-------------------------------------------------------------------------------
							
							for(var i in clients){
								var a = parseInt(i)+5;
								clients[i].request = itensToChoose[a];
							}
								
							clientStart = 0
							this.clientVisits = 0;
							changeLevel = true;
						}else{
							if(this.level <= 3){
								if(this.subLevel >= 2){
									this.subLevel = 0;
									this.level++;
									this.life = 3;
									wave = true;
									this.clientVisits = 0;
									changeLevel = false;
									gameMachine = "start";
								}
							this.subLevel++;
							wave = true;
							this.clientVisits = 0;
							changeLevel = false;
							gameMachine = "start";
						}else{
							gameMachine = "win";
						}
					}
				}
				
				//
				switch(this.level){	
					case 1:
						if(clientStart < clients.length){
							if(clientTime.current() >=6){
								clients[clientStart].status = "start";
								clientTime = new Timer();
								clientStart++;
							}
						}
						break;
					
					case 2:
						if(clientStart < clients.length){
							if(clientTime.current() >=4.5){
								clients[clientStart].status = "start";
								clientTime = new Timer();
								clientStart++;
							}
						}
						break;
					
					case 3:
						if(clientStart < clients.length){
							if(clientTime.current() >=3){
								clients[clientStart].status = "start";
								clientTime = new Timer();
								clientStart++;
							}
						}
						break;;
				}
				
				if(this.level > 3){
					gameMachine = "win";
				}
				
				break;
			

			case "win":
				if(score > highScore){
					highScore = score;
					localStorage.setItem("highScore", highScore);
				}
				scene = new Win();
				break;

			case "gameOver":
				if(score > highScore){
					highScore = score;
					localStorage.setItem("highScore", highScore);
				}
				
				scene = new GameOver();
				break;

			case "pause":
					jogoaudio.pause();
				if(!play){
					if(blackScreen.opacity < 0.5){
						fadeIn(blackScreen,1);
					}
				}else{
					if(blackScreen.opacity != 0){
						fadeOut(blackScreen, 2);
					}else{
						gameMachine = "play";
						jogoaudio.play();
						play = false;
					}
				}	
					if(input.GetKeyDown(32)){
						play = true;
						blackScreen.opacity = 1;
					}
				break;
		}
		
		console.log(this.level);
		
	};
	
	this.draw = function(){
		fundo.draw();
		
		for(i in clients){
			clients[i].draw();
		}

		for(i in ladrao){
			ladrao[i].draw();
		}

		this.mesa.draw();
		ctx.save();
		ctx.globalAlpha=0.6;
		drawText(xResolution/2-240,58,"" + score,"50","Black","Arial");
		drawText(xResolution/2+240,58,"" + this.life,"50","Black","Arial");
		ctx.restore();

		for(i in item){
			item[i].draw();
		}

		for(i in ladrao){
			ladrao[i].hand.draw();
		}

		espada.draw();

		playerCursor.draw();
	};
};




/*
	http://flatuicolors.com/
*/