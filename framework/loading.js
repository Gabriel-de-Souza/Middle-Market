//spritesLoaders
				imageLoader = [];
				/*Ex.:
				var spriteItem = null;
				var namesItem = "images/item.png"
				imageLoader.push(new spriteLoader(spriteItem, namesItem));
				*/
				
				var spriteMouse = [];
				var nameMouse = ["hand"];
				imageLoader.push(new spriteLoader(spriteMouse, nameMouse));
				
				var namesOver = ["perdeu","win"];
				var spritesOver = [];

				
				imageLoader.push(new spriteLoader(spritesItem, namesItem));
				imageLoader.push(new spriteLoader(spritesPerson, namesPerson));
				imageLoader.push(new spriteLoader(spritesBalao, namesBalao));
				imageLoader.push(new spriteLoader(spriteLadrao, namesLadrao));
				imageLoader.push(new spriteLoader(spriteEspada, namesEspada));
				imageLoader.push(new spriteLoader(spritesOver, namesOver));
								
				/*var introVideo = [];
				var nameIntro = ["video.mp4"];
				imageLoader.push(new videoLoader(introVideo, namesButton));*/

//---------------------------------------------------------------------------------------------------------------------------------------------------------
 				//---------------------------------------------------
					function loader(lista){
						for (var i=0; i < lista.length; i++ ) {
							if (lista[i].isLoaded == false)
								return false;
						}
						return true;
					}
			//---------------------------------------------------
					function spriteLoader(array, list){
						for(var i = 0; i < list.length; i++){
							//Criando o sprite do itemPefab
							array[i] = new Image();
							
							array[i].src = "images/" + list[i] + ".png";
							array[i].isLoaded = false;
							
							array[i].onload = function(){
								this.isLoaded = true;
							}
						}
					}
			
		//-----------------------------------------------------------
			
			function Next(){
					if(loader(imageLoader)){
							scene = new Video(video);
						}
				}
			
		//-----------------------------------------------------------
			
				// função para escrever no canvas
				function drawText(x,y,text,color){
					ctx.fillStyle = color;
					ctx.font = "50px Arial";
					ctx.fillText(text, x, y);		
				}
			
		//-----------------------------------------------------------
		
		
				