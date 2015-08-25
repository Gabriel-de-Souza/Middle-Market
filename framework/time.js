//Variáveis para controle do tempo:
//tempo inicial do jogo
var start = (new Date()).getTime();
//tempo decorrido até o momento em que a variável é chamada
var current;

function deltaTime(){
	current = (new Date()).getTime();
	elapsed = current - start;
	//definindo o delta == o tmp. decorrido em milissegundos
	//delta === tmp. decrrido / 1000(milissegundos)
	var delta = elapsed / 1000.;
	return delta;
}

function Timer(){
	this.start = deltaTime();
	this.current = function(){
		return deltaTime() - this.start;
	}
}