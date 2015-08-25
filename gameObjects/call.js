function callInMatriz(xM, yM, sW, sH, row, column, input, output, names, sprite, MAX){
	
	var slots = [];
	
	var rowB = [];
	var columnB = [];
	
	var m_x = [];
	var m_y = [];
	
	var rowSelect;
	var columnSelect;
	
	for (var i = 0; i < row; i++){
		m_x[i] = [];
		m_y[i] = [];
	}

	for (var i = 0; i < row; i++){
		for (var j = 0; j < column; j++){
			m_x[i][j] = xM + j * sW + j;
			m_y[i][j] = yM + i * sH + i;
		}
	}

	for(var i = 0; i < (row*column); i++){
		slots.push(i);
	}
	
	var slotsRand = shuffle(slots);

	for(i = 0; i < MAX ; i++){
		var id = Math.floor((Math.random() * names.length));
		var rowRandom;
		var columnRandom;

		rowSelect = slotsRand[i] % row;
		columnSelect = slotsRand[i] % column;
		
		rowB[i] = rowSelect;
		columnB[i] = columnSelect;
				
		output[i] = new input(names[id], m_x[rowSelect][columnSelect], m_y[rowSelect][columnSelect], sprite[id].width,sprite[id].height, "item", sprite[id]);
		
		output[i].w = (sprite[id].width)/1.28;
		output[i].h = (sprite[id].height)/1.28;
		output[i].sprite = sprite[id]; 
		output[i].xI = output[i].x;
		output[i].yI = output[i].y;
		console.log("Criei " + names[id] + "!");
	}
}