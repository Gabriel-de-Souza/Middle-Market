var Wave = function(maxItem, maxPerson, level){
	
	this.callPerson = false;
	
	this.itensToSelect = item;
	
	this.call = function(){
		
		//Chamar os personagens
		callInMatriz(50, 150, 150, 100, 1, 5, Person, character, namesPerson, spritePerson, maxPerson);
		
		//Chamando os ladrões
		for(var i = 0; i < (4 - scene.subLevel); i++){
			ladrao[i] = new Ladrao("salteador", Math.random()*(canvas.width-50*(i+1)), 200, spriteLadrao[0].width, spriteLadrao[0].height, "ladrao", spriteLadrao[0], i)
		}
		
		//Chamar os iens na mesa
		callInMatriz(15, 390, 140, 100, 2, 5, object, item, namesItem, spriteItem, maxItem);
		
		shuffle(this.itensToSelect);
		
		for(var i = 0; i < character.length; i++){
			character[i].request = this.itensToSelect[i];
		}
		
		this.level = level*500+500;
		
		var xChar = this.level*maxPerson;
		
		for(var i = 0; i < character.length; i++){
			character[i].x = character[i].x-xChar-50;
			xChar -= this.level;
		}		
	};

	this.draw = function(){
		
	};
	this.update = function(){
		if(this.callPerson){
			//Chamando os personagens
			var xChar = this.level*maxPerson;
			
			//Chamar os personagens
			callInMatriz(50, 150, 150, 100, 1, 5, Person, character, namesPerson, spritePerson, maxPerson);
			
			for(var i = 0; i < character.length; i++){
				character[i].request = this.itensToSelect[i+5];
			}
			
			for(var i = 0; i < character.length; i++){
				character[i].x = character[i].x-xChar;
				xChar -= this.level;
			}
			this.callPerson = false;
			
			
			//Chamando os ladrões
			for(var i = 0; i < (4 - scene.subLevel); i++){
				ladrao[i] = new Ladrao("salteador", Math.random()*(canvas.width-50*(i+1)), 200, spriteLadrao[0].width, spriteLadrao[0].height, "ladrao", spriteLadrao[0], i)
			}
			
		}
	};
}


//function callInMatriz(xM, yM, sW, sH, row, column, input, output, names, sprite)