//Object properties
//Ttransform
var Transform = {
	Class : function(){
		this.position = {
			x : undefined,
			y : undefined,
		},
		this.scale = { 
			x : undefined,
			y : undefined,
		},
		this.size = {
			w : undefined,
			h : undefined,
		}
	}
}

var Renderer = {
	Class : function(){
		
		this.visibility = true;
		
		this.opacity = 1;
		
		this.color = '0,0,0';
		
		this.layer = undefined;
		
		this.renderColor = function(){
			return 'rgba('+ this.color +','+ this.opacity +')';
		}
	}
}

//gameObject
var GameObject = {
	Class : function(){
		Transform.Class.apply(this);
		Renderer.Class.apply(this);
	}
}


/*			
	http://javiani.wordpress.com/2009/12/27/orientacao-a-objetos-em-javascript-criacao-de-classe-e-languages-patterns/
	http://javiani.wordpress.com/2010/01/24/oop-em-javascript-heranca-e-singleton-pattern/
*/