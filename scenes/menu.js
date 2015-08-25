var spriteMenu = [];
var nameMenu = ["menu"];
imageLoader.push(new spriteLoader(spriteMenu, nameMenu));

var spriteInstrucoes = [];
var nameInstrucoes = ["instrucoes"];
imageLoader.push(new spriteLoader(spriteInstrucoes, nameInstrucoes));

var spriteCreditos = [];
var nameCreditos = ["creditos"];
imageLoader.push(new spriteLoader(spriteCreditos, nameCreditos));

var spriteSeta = [];
var nameSeta = ["seta"];
imageLoader.push(new spriteLoader(spriteSeta, nameSeta));
	
var jogoaudio = new Audio();
jogoaudio.src = "sons/Jogar.wav";
jogoaudio.load();

//-----------------------------------------------------------------------------

var menuaudio = new Audio();
	menuaudio.src = "sons/menusom.wav";
	menuaudio.load();
	
	var creditosaudio = new Audio();
	creditosaudio.src = "sons/Creditos.wav";
	creditosaudio.load();
	
	var instrucoesaudio = new Audio();
	instrucoesaudio.src = "sons/Instrucoes.wav";
	instrucoesaudio.load();

var Menu = function(){
	
	var menuControl;
	
	var playerCursor = new Cursor(mouse_x, mouse_y, spriteMouse[0].width, spriteMouse[0].height, spriteMouse[0]);
	
	var fadeScreen = false;
	var fade;
	var main = false;
	var instrucoes = false;
	var creditos = false;
	var play = false;
	
	this.update = function(){
		
		playerCursor = new Cursor(mouse_x, mouse_y, spriteMouse[0].width, spriteMouse[0].height, spriteMouse[0]);
		
		switch(menuControl){
			default:
				if(blackScreen.opacity != 0){
					fadeOut(blackScreen, 1);
				}else{
					menuControl = "main";
				}
				break;

			case "main":
					menuaudio.loop = true
					menuaudio.play();
					
					if(playerCursor.x+playerCursor.w/2 >= 325 && playerCursor.x+playerCursor.w/2 <= 666  && playerCursor.y+playerCursor.h/2 >= 265  && playerCursor.y+playerCursor.h/2 <= 378  && mouse_pressed == true){
						fadeScreen = true;
						play = true;
					
					}
					
					if(play){
						if(blackScreen.opacity == 1){
							menuaudio.pause();
							
							
							
							creditos = false;
							scene = new Game();
						}
					}
					
					if(playerCursor.x+playerCursor.w/2 >= 113  && playerCursor.x+playerCursor.w/2 <= 454  && playerCursor.y+playerCursor.h/2 >= 624  && playerCursor.y+playerCursor.h/2 <= 723  && mouse_pressed == true){
						fadeScreen = true;
						instrucoes = true;
						
					}
					
					if(instrucoes){
						if(blackScreen.opacity == 1){
							menuaudio.pause();
							menuControl = "instrucoes";
							instrucoes = false;
						}
					}
					
					if(playerCursor.x+playerCursor.w/2 >= 567  && playerCursor.x+playerCursor.w/2 <= 906  && playerCursor.y+playerCursor.h/2 >= 624  && playerCursor.y+playerCursor.h/2 <= 723  && mouse_pressed == true) {
						fadeScreen = true;
						creditos = true;
						
					}
					
					if(creditos){
						if(blackScreen.opacity == 1){
							menuaudio.pause();
							menuControl = "creditos";
							creditos = false;
						}
					}
				break;
			
			case "instrucoes":
				instrucoesaudio.loop = true
				instrucoesaudio.play();
				
				if(playerCursor.x+playerCursor.w/2 >= 50 && playerCursor.x+playerCursor.w/2 <= 150 && playerCursor.y+playerCursor.h/2 >= 0 && playerCursor.y+playerCursor.h/2 <= 100 && mouse_pressed == true) {
					fadeScreen = true;
					main = true;
						
				}
				
				if(main){
					if(blackScreen.opacity == 1){
						instrucoesaudio.pause();
						menuControl = "main";
						main = false;
					}
				}
				break;
				
			case "creditos":
				creditosaudio.loop = true
				creditosaudio.play();
				
				if(playerCursor.x+playerCursor.w/2 >= 100 && playerCursor.x+playerCursor.w/2 <= 200 && playerCursor.y+playerCursor.h/2 >= 80 && playerCursor.y+playerCursor.h/2 <= 180 && mouse_pressed == true) {
					fadeScreen = true;
					main = true;
						
				}
				
				if(main){
					if(blackScreen.opacity == 1){
						creditosaudio.pause();
						menuControl = "main";
						main = false;
					}
				}
				break;
			
		}
			
		if(fadeScreen){
			if(blackScreen.opacity == 0){
				if(fade == "out"){
					fadeScreen = false;
					fade = "undefined";
					return true;
				}
				fade = "in";
			}else if(blackScreen.opacity == 1){
				fade = "out";
			}
				
			if(fade == "in"){
				fadeIn(blackScreen, 0.3);
			}else if(fade == "out"){
				fadeOut(blackScreen, 0.3);
			}
		}
		
	};
	
	this.draw = function(){
		switch(menuControl){
			default:
				ctx.drawImage(spriteMenu[0], 0, 0, xResolution, yResolution);
				break;
			case "main":
				ctx.drawImage(spriteMenu[0], 0, 0, xResolution, yResolution);
				break;
			case "instrucoes":
				ctx.drawImage(spriteInstrucoes[0], 0, 0, xResolution, yResolution);
				ctx.drawImage(spriteSeta[0], 50, 0, 100, 100);
				break;
			case "creditos":
				ctx.drawImage(spriteCreditos[0], 0, 0, xResolution, yResolution);
				ctx.drawImage(spriteSeta[0], 100, 80, 100, 100);
				break;
		}
		
		if(menuControl != "main"){
		}
		
		playerCursor.draw();
	};
}